"use server";

import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";
import { BadRequestError, ConflictError, InternalServerError } from "../errors";
import { plaid } from "../plaid";
import bcrypt from "bcrypt";
import { getRandomAvatarColor, parseStringify } from "../utils";
import { createDwollaCustomer, createFundingSource } from "./dwolla.action";
import { revalidatePath } from "next/cache";
import { createBankAccount } from "./bankAccounts.action";
import {
  createUserAccount,
  getUserByEmail,
  getUserById,
  getUserByUsername,
  getUsers,
} from "../repositories/user.repository";
import { createAccessToken } from "../repositories/accessToken.repository";

interface RegisterProps {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  password: string;
}

export async function register({
  firstName,
  lastName,
  email,
  username,
  address,
  city,
  state,
  postalCode,
  dateOfBirth,
  ssn,
  password,
}: RegisterProps) {
  try {
    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      !username ||
      !address ||
      !city ||
      !state ||
      !postalCode ||
      !dateOfBirth ||
      !ssn ||
      !password
    )
      throw new BadRequestError("Missing one or more required fields");

    const existingUserEmail = await getUserByEmail({ email });
    if (existingUserEmail) throw new ConflictError("Email is already in use");

    const existingUsername = await getUserByUsername({ username });
    if (existingUsername) throw new ConflictError("Username is already in use");

    const hashedPassword = await bcrypt.hash(password, 10);

    const dwollaCustomerUrl = await createDwollaCustomer({
      firstName,
      lastName,
      email,
      address1: address,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
    });

    if (!dwollaCustomerUrl)
      throw new InternalServerError("Failed to create Dwolla customer");

    const dwollaCustomerId = dwollaCustomerUrl.split("/").pop();

    if (!dwollaCustomerId)
      throw new InternalServerError("Failed to parse Dwolla customer ID");

    const avatarData = getRandomAvatarColor();

    const newUser = await createUserAccount({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      username,
      dwollaCustomerId,
      dwollaCustomerUrl,
      avatarColor: avatarData.color,
      avatarTextColor: avatarData.textColor,
    });

    if (!newUser)
      throw new InternalServerError("Failed to create user account");

    return parseStringify({
      id: newUser.id,
      created: true,
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

interface LoginProps {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginProps) {
  try {
    if (!email || !password)
      throw new BadRequestError("Missing one or more required fields");
    const user = await getUserByEmail({ email });
    if (!user) throw new BadRequestError("Invalid email or password");
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new BadRequestError("Invalid email or password");
    return parseStringify({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      dwollaCustomerId: user.dwollaCustomerId,
      dwollaCustomerUrl: user.dwollaCustomerUrl,
      avatarColor: user.avatarColor,
      avatarTextColor: user.avatarTextColor,
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

interface CreateLinkTokenProps {
  userId: string;
  firstName: string;
  lastName: string;
}

export async function createLinkToken({
  userId,
  firstName,
  lastName,
}: CreateLinkTokenProps) {
  try {
    console.log(userId, firstName, lastName);
    const res = await plaid.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "ClearPay",
      products: ["auth"] as Products[],
      country_codes: ["US"] as CountryCode[],
      language: "en",
    });
    return parseStringify({
      linkToken: res.data.link_token,
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

interface UpdateLinkTokenParams {
  userId: string;
  accessToken: string;
}

export async function updateLinkToken({
  userId,
  accessToken,
}: UpdateLinkTokenParams) {
  try {
    const res = await plaid.linkTokenCreate({
      user: {
        client_user_id: userId,
      },
      client_name: "ClearPay",
      products: ["auth"] as Products[],
      country_codes: ["US"] as CountryCode[],
      language: "en",
      access_token: accessToken,
    });
    return parseStringify({
      linkToken: res.data.link_token,
    });
  } catch (error: any) {
    console.log(error);
  }
}

interface ExchangePublicTokenParams {
  publicToken: string;
  user: any;
}

export async function exchangePublicToken({
  publicToken,
  user,
}: ExchangePublicTokenParams) {
  console.log("publicToken", publicToken);
  console.log("user", user);
  try {
    const res = await plaid.itemPublicTokenExchange({
      public_token: publicToken,
    });
    // console.log(res.data);

    const accessToken = res.data.access_token;
    const itemId = res.data.item_id;

    const accountsResponse = await plaid.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts;

    let newAccessToken;

    for (const account of accountData) {
      const request: ProcessorTokenCreateRequest = {
        access_token: accessToken,
        account_id: account.account_id,
        processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
      };

      const processorTokenResponse = await plaid.processorTokenCreate(request);
      const processorToken = processorTokenResponse.data.processor_token;

      const dwollaFundingSourceUrl = await createFundingSource({
        customerId: user.dwollaCustomerId,
        fundingSourceName: account.name,
        plaidToken: processorToken,
      });

      if (!dwollaFundingSourceUrl)
        throw new InternalServerError("Failed to create Dwolla funding source");

      if (!newAccessToken) {
        console.log("Creating new access token with user ID", user.id);
        newAccessToken = await createAccessToken({
          userId: user.id,
          accessToken,
        });

        if (!newAccessToken)
          throw new InternalServerError(
            "Failed to add access token to database"
          );
      }

      console.log("Creating bank account with access token id", newAccessToken.id);

      await createBankAccount({
        userId: user.id,
        bankId: itemId,
        plaidAccountId: account.account_id,
        accessTokenId: newAccessToken!.id,
        dwollaFundingSourceUrl,
        processorToken,
      });
    }

    revalidatePath("/");

    return parseStringify({
      success: true,
    });
  } catch (error: any) {
    console.log(error);
  }
}

interface RetrieveUsersParams {
  query: string;
  page?: number;
  pageSize?: number;
}

export async function retrieveUsers({
  query,
  page = 1,
  pageSize = 8,
}: RetrieveUsersParams) {
  try {
    const users = await getUsers({ query, page, pageSize });
    if (users === null)
      throw new InternalServerError("Failed to retrieve users");
    return parseStringify({
      users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface FetchUserByIdParams {
  userId: string;
}

export async function fetchUserById({ userId }: FetchUserByIdParams) {
  try {
    const user = await getUserById({ userId });
    return parseStringify({
      username: user?.username,
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
    });
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
