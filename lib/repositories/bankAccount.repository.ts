"use server";

import prisma from "../prisma";

interface AddBankAccountParams {
  userId: string;
  bankId: string;
  plaidAccountId: string;
  accessTokenId: string;
  dwollaFundingSourceUrl: string;
  processorToken: string;
}

export async function addBankAccount({
  userId,
  bankId,
  plaidAccountId,
  accessTokenId,
  dwollaFundingSourceUrl,
  processorToken,
}: AddBankAccountParams) {
  try {
    const account = await prisma.$transaction(async (tx) => {
      const userBankAccountsCount = await tx.bankAccount.count({
        where: {
          userId,
        },
      });

      const isFirstAccount = userBankAccountsCount === 0;

      const account = await tx.bankAccount.create({
        data: {
          userId,
          bankId,
          plaidAccountId,
          accessTokenId,
          dwollaFundingSourceUrl,
          processorToken,
          isDefaultPayment: isFirstAccount,
          isDefaultReceiving: isFirstAccount,
        },
      });

      return account;
    });
    return account;
  } catch (error) {
    console.log(error);
    return null;
  }
}

interface GetUserBankAccountsParams {
  userId: string;
}

export async function getUserBankAccounts({
  userId,
}: GetUserBankAccountsParams) {
  try {
    const accounts = await prisma.bankAccount.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });
    return accounts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetBankAccountByIdParams {
  accountId: string;
}

export async function getBankAccountById({
  accountId,
}: GetBankAccountByIdParams) {
  try {
    const account = await prisma.bankAccount.findUnique({
      where: {
        id: accountId,
      },
    });
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetBankAccountByPlaidIdParams {
  plaidAccountId: string;
}

export async function getBankAccountByPlaidId({
  plaidAccountId,
}: GetBankAccountByPlaidIdParams) {
  try {
    const account = await prisma.bankAccount.findFirst({
      where: {
        plaidAccountId,
      },
    });
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUserDefaultReceivingAccountParams {
  userId: string;
}

export async function getUserDefaultReceivingAccount({
  userId,
}: GetUserDefaultReceivingAccountParams) {
  try {
    const account = await prisma.bankAccount.findFirst({
      where: {
        userId,
        isDefaultReceiving: true,
      },
    });
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetUserDefaultPaymentAccountParams {
  userId: string;
}

export async function getUserDefaultPaymentAccount({
  userId,
}: GetUserDefaultPaymentAccountParams) {
  try {
    const account = await prisma.bankAccount.findFirst({
      where: {
        userId,
        isDefaultPayment: true,
      },
    });
    return account;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface SetUserDefaultReceivingAccountParams {
  userId: string;
  accountId: string;
}

export async function setUserDefaultReceivingAccount({
  userId,
  accountId,
}: SetUserDefaultReceivingAccountParams) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.bankAccount.updateMany({
        where: {
          userId,
          id: {
            not: accountId,
          },
        },
        data: {
          isDefaultReceiving: false,
        },
      });

      await tx.bankAccount.update({
        where: {
          id: accountId,
        },
        data: {
          isDefaultReceiving: true,
        },
      });
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

interface SetDefaultPaymentAccountParams {
  userId: string;
  accountId: string;
}

export async function setDefaultPaymentAccount({
  userId,
  accountId,
}: SetDefaultPaymentAccountParams) {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.bankAccount.updateMany({
        where: {
          userId,
          id: {
            not: accountId,
          },
        },
        data: {
          isDefaultPayment: false,
        },
      });

      await tx.bankAccount.update({
        where: {
          id: accountId,
        },
        data: {
          isDefaultPayment: true,
        },
      });
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

interface CountUserBankAccountsParams {
  userId: string;
}

export async function countUserBankAccounts({
  userId,
}: CountUserBankAccountsParams) {
  try {
    const count = await prisma.bankAccount.count({
      where: {
        userId,
      },
    });
    return count;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetBanksByAccessTokenParams {
  accessTokenId: string;
}

export async function getBanksByAccessToken({
  accessTokenId,
}: GetBanksByAccessTokenParams) {
  try {
    const banks = await prisma.bankAccount.findMany({
      where: {
        accessTokenId,
      },
    });
    return banks;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetBankAccountIdParams {
  plaidAccountId: string;
}

export async function getBankAccountId({
  plaidAccountId,
}: GetBankAccountIdParams) {
  try {
    const account = await prisma.bankAccount.findFirst({
      where: {
        plaidAccountId,
      },
    });
    return account?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
