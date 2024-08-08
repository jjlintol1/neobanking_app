import { options } from "@/app/api/auth/[...nextauth]/options";
import BankSelect from "@/components/shared/BankSelect";
import Pagination from "@/components/shared/Pagination";
import TransactionTable from "@/components/shared/TransactionTable";
import TransactionSearchBar from "@/components/shared/search/TransactionSearchBar";
import ConnectPlaidAccount from "@/components/shared/ConnectPlaidAccount";
import { retrieveUserBankAccounts } from "@/lib/actions/bankAccounts.action";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

import { SearchParamsProps } from "@/types";
import PlaidLink from "@/components/shared/PlaidLink";
import { retrieveUserTransactions } from "@/lib/actions/transaction.action";
import LoggedInUser from "@/components/shared/LoggedInUser";

const TransactionsPage = async ({ searchParams }: SearchParamsProps) => {
  const session = await getServerSession(options);

  if (!session) redirect("/sign-in");

  const {
    user: { id },
  } = session;

  const page = searchParams?.page || 1;

  const q = searchParams?.q || "";

  const account = searchParams?.account || null;

  const accountsResponse = await retrieveUserBankAccounts({
    userId: session.user.id,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  });

  if (
    accountsResponse.error &&
    accountsResponse.error === "ITEM_LOGIN_REQUIRED"
  ) {
    return (
      <PlaidLink
        user={session.user}
        accessToken={accountsResponse.accessToken}
        mode="update"
      />
    );
  }

  const accounts = accountsResponse?.accounts ?? [];

  const transactionsResponse = await retrieveUserTransactions({
    userId: session.user.id,
    accountId: account || undefined,
    page: +page,
    pageSize: 8,
    query: q,
  });

  const { transactions, isNext } = transactionsResponse;


  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="foreground-text text-2xl font-semibold md:text-3xl">
          Transactions
        </h1>
        <LoggedInUser user={session?.user} />
      </div>
      {accounts.length > 0 ? (
        <>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <TransactionSearchBar />
            <BankSelect accounts={accounts} />
          </div>
          <div>
            <TransactionTable userId={id} transactions={transactions} />
          </div>
          <div className="mt-5 flex w-full items-center justify-center">
            <Pagination currentPage={+page} isNext={isNext} />
          </div>
        </>
      ) : (
        <div className="mt-10">
          <ConnectPlaidAccount
            user={session.user}
            header="No transactions yet"
            body="To view your latest transactions in real-time, sync your bank account with ClearPay."
          />
        </div>
      )}
    </>
  );
};

export default TransactionsPage;
