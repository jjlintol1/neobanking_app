import { options } from "@/app/api/auth/[...nextauth]/options";
import TransferForm from "@/components/forms/TransferForm";
import ConnectPlaidAccount from "@/components/shared/ConnectPlaidAccount";
import { retrieveUserBankAccounts } from "@/lib/actions/bankAccounts.action";
import { getServerSession } from "next-auth";
import PlaidLink from "@/components/shared/PlaidLink";
import React from "react";
import LoggedInUser from "@/components/shared/LoggedInUser";

const PaymentPage = async () => {
  const session = await getServerSession(options);

  const accountsResponse = await retrieveUserBankAccounts({
    userId: session.user.id,
    firstName: session.user.firstName,
    lastName: session.user.lastName,
  });

  if (accountsResponse.error && accountsResponse.error === "ITEM_LOGIN_REQUIRED") {
    return <PlaidLink user={session.user} accessToken={accountsResponse.accessToken} mode="update" />;
  }

  const accounts = accountsResponse?.accounts ?? [];

  return (
    <>
      <div className="flex w-full items-center justify-between">
        <h1 className="foreground-text text-2xl font-semibold md:text-3xl">
          Transfer
        </h1>
        <LoggedInUser user={session?.user} />
      </div>
      {accounts.length > 0 ? (
        <TransferForm accounts={accounts} />
      ) : (
        <div className="mt-10">
          <ConnectPlaidAccount
            user={session?.user}
            body="To make transfers between accounts and to other users on the platform, sync your banking data below."
          />
        </div>
      )}
    </>
  );
};

export default PaymentPage;
