"use server";

import { dwolla } from "../dwolla";

interface CreateCustomerProps {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
}

export async function createDwollaCustomer({
  firstName,
  lastName,
  email,
  address1,
  city,
  state,
  postalCode,
  dateOfBirth,
  ssn,
}: CreateCustomerProps) {
  try {
    const res = await dwolla.post("customers", {
      firstName,
      lastName,
      email,
      address1,
      city,
      state,
      postalCode,
      dateOfBirth,
      ssn,
      type: "personal",
    });
    return res.headers.get("location");
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

interface CreateFundingSourceParams {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
}

export async function createFundingSource({
  customerId,
  fundingSourceName,
  plaidToken,
}: CreateFundingSourceParams) {
  try {
    const res = await dwolla.post(`customers/${customerId}/funding-sources`, {
      plaidToken,
      name: fundingSourceName,
    });
    return res.headers.get("location");
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}

interface CreateTransferParams {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: number;
}

export async function createTransfer({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: CreateTransferParams) {
  try {
    const res = await dwolla.post("transfers", {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount.toString(),
      },
    });
    return res.headers.get("location");
  } catch (error: any) {
    console.log(error);
    throw error;
  }
}
