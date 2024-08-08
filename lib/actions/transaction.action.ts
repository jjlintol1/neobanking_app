"use server";

import { InternalServerError, NotFoundError } from "../errors";
import { plaid } from "../plaid";
import {
  getBankAccountById,
  getBankAccountByPlaidId,
  getUserDefaultReceivingAccount,
} from "../repositories/bankAccount.repository";
import { getTransactionCategoryId } from "../repositories/transactionCategory.repository";
import {
  countTransactions,
  createDbTransfer,
  getExpenseCategoryTotals,
  getUserTransactions,
  insertTransactions,
} from "../repositories/transaction.repository";
import { convertDateToDateTime, parseStringify } from "../utils";
import { TransactionsSyncRequest } from "plaid";
import { createTransfer } from "./dwolla.action";
import {
  getAllUserAccessTokens,
  updateAccessTokenCursor,
} from "../repositories/accessToken.repository";
import { incomeTransactionTypes } from "@/constants";

interface TransferParams {
  amount: number;
  description: string;
  recipientUserId: string;
  senderAccountId: string;
}

export async function transfer({
  amount,
  description,
  recipientUserId,
  senderAccountId,
}: TransferParams) {
  try {
    const userAccount = await getBankAccountById({
      accountId: senderAccountId,
    });
    if (!userAccount) throw new NotFoundError("No bank account found");
    const recipientAccount = await getUserDefaultReceivingAccount({
      userId: recipientUserId,
    });
    if (!recipientAccount)
      throw new NotFoundError("No default recipient receiving account found");

    const dwollaTransferUrl = await createTransfer({
      sourceFundingSourceUrl: userAccount.dwollaFundingSourceUrl,
      destinationFundingSourceUrl: recipientAccount.dwollaFundingSourceUrl,
      amount,
    });

    if (!dwollaTransferUrl)
      throw new InternalServerError("Unable to create Dwolla transfer");

    const newTransaction = await createDbTransfer({
      senderId: userAccount.userId,
      recipientId: recipientAccount.userId,
      senderBankAccountId: userAccount.id,
      recipientBankAccountId: recipientAccount.id,
      amount,
      dwollaTransferUrl,
      description,
    });

    if (!newTransaction)
      throw new InternalServerError("Unable to create transaction in database");

    return {
      dwollaTransferUrl,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface UpdateTransactionsSyncParams {
  userId: string;
  // bankAccounts?: any[];
}

export async function updateTransactionsSync({
  userId,
}: UpdateTransactionsSyncParams) {
  let transactions: any = [];
  try {
    // get bank accounts by user id
    const accessTokens = await getAllUserAccessTokens({ userId });

    if (!accessTokens) throw new NotFoundError("No user access tokens found");

    for (const accessToken of accessTokens) {
      let cursor = accessToken.cursor || null;
      let hasMore = true;

      while (hasMore) {
        const transactionsSyncRequest: TransactionsSyncRequest = cursor
          ? {
              access_token: accessToken.token,
              cursor,
            }
          : { access_token: accessToken.token };

        const res = await plaid.transactionsSync(transactionsSyncRequest);
        transactions = transactions.concat(res.data.added);
        hasMore = res.data.has_more;
        cursor = res.data.next_cursor;
      }

      if (cursor) {
        await updateAccessTokenCursor({
          accessToken: accessToken.token,
          cursor,
        });
      }

      const transactionsToInsert = await Promise.all(
        transactions.map(async (transaction: any) => {
          const transactionCategoryId = await getTransactionCategoryId({
            categoryName: transaction.personal_finance_category.primary,
          });

          if (!transactionCategoryId)
            throw new NotFoundError("No transaction category found");

          const bankAccount = await getBankAccountByPlaidId({
            plaidAccountId: transaction.account_id,
          });

          if (!bankAccount)
            throw new NotFoundError(
              "This bank account is not connected to the application"
            );

          const baseTransaction: any = {
            plaidTransactionId: transaction.transaction_id,
            amount: transaction.amount,
            type: transaction.transaction_type,
            status: transaction.pending ? "Pending" : "Success",
            counterpartyName: transaction.merchant_name,
            counterpartyLogoUrl: transaction.logo_url,
            // transactionCategoryId,
            date: convertDateToDateTime(transaction.date),
            currency: transaction.iso_currency_code,
          };

          if (incomeTransactionTypes.includes(transactionCategoryId)) {
            baseTransaction.recipientId = bankAccount.userId;
            baseTransaction.recipientBankAccountId = bankAccount.id;
            baseTransaction.recipientTransactionCategoryId =
              transactionCategoryId;
          } else {
            baseTransaction.senderId = bankAccount.userId;
            baseTransaction.senderBankAccountId = bankAccount.id;
            baseTransaction.senderTransactionCategoryId = transactionCategoryId;
          }

          return baseTransaction;
        })
      );

      const uniqueTransactions = transactionsToInsert.reduce(
        (unique, current) => {
          const exists = unique.find(
            (u: any) => u.plaidTransactionId === current.plaidTransactionId
          );
          if (!exists) {
            unique.push(current);
          }
          return unique;
        },
        []
      );

      await insertTransactions({ transactions: uniqueTransactions });
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface RetrieveUserTransactionsParams {
  userId: string;
  page: number;
  pageSize: number;
  query: string;
  accountId?: string;
}

export async function retrieveUserTransactions({
  userId,
  page = 1,
  pageSize = 10,
  query,
  accountId,
}: RetrieveUserTransactionsParams) {
  try {
    await updateTransactionsSync({ userId });

    const skipped = (page - 1) * pageSize;
    const transactions = await getUserTransactions({
      userId,
      page,
      pageSize,
      query,
      accountId,
    });
    const transactionsCount = await countTransactions({
      userId,
      query,
      accountId,
    });

    const isNext = transactionsCount > skipped + pageSize;
    return parseStringify({
      transactions,
      isNext,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

interface GetMonthlyExpenseCategoryValuesParams {
  userId: string;
  startDate: Date;
  endDate: Date;
}

export async function getMonthlyExpenseCategoryValues({
  userId,
  startDate,
  endDate,
}: GetMonthlyExpenseCategoryValuesParams) {
  try {
    const transactions = await getExpenseCategoryTotals({
      userId,
      startDate,
      endDate,
    });

    if (transactions === null)
      throw new InternalServerError("Error getting transactions");

    return parseStringify(transactions);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
