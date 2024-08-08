"use server";

import { CountryCode } from "plaid";
import { plaid } from "../plaid";
import { parseStringify } from "../utils";
import {
  addBankAccount,
  getBankAccountId,
} from "../repositories/bankAccount.repository";
import { InternalServerError } from "../errors";
import { getAllUserAccessTokens } from "../repositories/accessToken.repository";

interface RetrieveUserBankAccountsParams {
  userId: string;
  firstName: string;
  lastName: string;
}

export async function retrieveUserBankAccounts({
  userId,
  firstName,
  lastName,
}: RetrieveUserBankAccountsParams) {
  try {
    // return parseStringify({ accounts: [] });
    const tokens = await getAllUserAccessTokens({ userId });

    if (tokens === null)
      throw new InternalServerError("Error fetching access tokens.");

    if (tokens.length === 0) {
      return parseStringify({
        accounts: [],
      });
    }

    const accountsPromises = tokens.map(async (token) => {
      const response = await plaid.accountsGet({
        access_token: token.token,
      });

      const accountsData = response.data.accounts;
      const institutionId = response.data.item.institution_id || "";

      const institutionDetailsPromises = accountsData.map(async (account) => {
        let institution;
        if (institutionId !== "") {
          institution = await getInstitution({
            institutionId,
          });
        }

        const id = await getBankAccountId({
          plaidAccountId: account.account_id,
        });

        return {
          id,
          plaidAccountId: account.account_id,
          currentBalance: account.balances.current,
          availableBalance: account.balances.available,
          name: account.name,
          officialName: account.official_name,
          type: account.type,
          subtype: account.subtype,
          institutionId,
          institutionName: institution.name || "",
          institutionLogo: institution.logo || "",
          mask: account.mask,
        };
      });

      return Promise.all(institutionDetailsPromises);
    });

    const accountsNested = await Promise.all(accountsPromises);
    // Flatten the nested array of accounts
    const accounts = accountsNested.flat();

    return parseStringify({
      accounts: accounts.sort(
        (a, b) => (a?.currentBalance || 0) - (b?.currentBalance || 0)
      ),
    });
  } catch (error: any) {
    if (error.response.data.error_code === "ITEM_LOGIN_REQUIRED") {
      const token = JSON.parse(error?.config?.data).access_token;
      return parseStringify({
        accounts: [],
        error: "ITEM_LOGIN_REQUIRED",
        accessToken: token,
      });
    }
    console.error(error);
    throw error;
  }
}

interface CreateBankAccountParams {
  userId: string;
  bankId: string;
  plaidAccountId: string;
  accessTokenId: string;
  dwollaFundingSourceUrl: string;
  processorToken: string;
}

export async function createBankAccount({
  userId,
  bankId,
  plaidAccountId,
  accessTokenId,
  dwollaFundingSourceUrl,
  processorToken,
}: CreateBankAccountParams) {
  try {
    const newBankAccount = await addBankAccount({
      userId,
      bankId,
      plaidAccountId,
      accessTokenId,
      dwollaFundingSourceUrl,
      processorToken,
    });
    return parseStringify(newBankAccount);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface GetAccountInstitutionParams {
  institutionId: string;
}

export async function getInstitution({
  institutionId,
}: GetAccountInstitutionParams) {
  try {
    const res = await plaid.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
      options: {
        include_optional_metadata: true,
      },
    });

    return parseStringify({
      name: res.data.institution.name,
      logo: res.data.institution.logo,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
}
