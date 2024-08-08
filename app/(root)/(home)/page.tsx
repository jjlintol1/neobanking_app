import { options } from "@/app/api/auth/[...nextauth]/options";
import AccountSlider from "@/components/slider/AccountSlider";

import { getServerSession } from "next-auth";

import { retrieveUserBankAccounts } from "@/lib/actions/bankAccounts.action";

import TransactionTable from "@/components/shared/TransactionTable";
import { SearchParamsProps } from "@/types";
import Pagination from "@/components/shared/Pagination";
import ConnectPlaidAccount from "@/components/shared/ConnectPlaidAccount";
import BalanceDisplay from "@/components/shared/BalanceDisplay";
import IconTextButton from "@/components/shared/IconTextButton";
import Link from "next/link";
import LoggedInUser from "@/components/shared/LoggedInUser";
import PlaidLink from "@/components/shared/PlaidLink";
import { retrieveUserTransactions } from "@/lib/actions/transaction.action";
import { greetingBasedOnTime } from "@/lib/utils";

export default async function Home({ searchParams }: SearchParamsProps) {
  const session = await getServerSession(options);

  const page = searchParams?.page || 1;
  const selected = searchParams?.selected || null;

  const accountsResponse = await retrieveUserBankAccounts({
    userId: session.user.id,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  });

  if (accountsResponse.error && accountsResponse.error === "ITEM_LOGIN_REQUIRED") {
    return <PlaidLink user={session.user} accessToken={accountsResponse.accessToken} mode="update" />;
  }

  const accounts = accountsResponse?.accounts ?? [];

  const selectedAccount = selected ? accounts.find((a: any) => a.id === selected) : accounts[0];

  const transactionsResponse = await retrieveUserTransactions({
    userId: session.user.id,
    accountId: selectedAccount?.id,
    page: +page,
    pageSize: 4,
    query: ""
  });

  const { transactions, isNext } = transactionsResponse;

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="foreground-text text-2xl font-semibold md:text-3xl">
          Good {greetingBasedOnTime()}, {session.user.firstName} {session.user.lastName}
        </h1>
        <LoggedInUser user={session?.user} />
      </div>
      {accounts.length ? (
        <>
          <div className="mt-10 grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:gap-10">
            <div>
              <p className="foreground-text">Total Balance</p>
              <BalanceDisplay account={selectedAccount} />
              <div className="mt-5 flex w-full items-center gap-5">
                <Link href="/payment">
                  <IconTextButton
                    variant="primary"
                    text="Transfer"
                  />
                </Link>
              </div>
            </div>
            <div className="overflow-hidden md:pl-0">
              <AccountSlider accounts={accounts} />
            </div>
          </div>
          <div className="mt-10 w-full">
            <div className="md:flex w-full items-center justify-between hidden">
              <p className="foreground-text">Recent Transactions</p>
              <Link href="/transactions">
                <IconTextButton
                  variant="secondary"
                  text="View All"
                />
              </Link>
            </div>
            <TransactionTable userId={session.user.id} transactions={transactions} />
            <div className="mt-5 flex w-full items-center justify-center">
              <Pagination currentPage={+page} isNext={isNext} />
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 flex items-center justify-center">
          <ConnectPlaidAccount user={session.user} />
        </div>
      )}
    </>
  );
}
