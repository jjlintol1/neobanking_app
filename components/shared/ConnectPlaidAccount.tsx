import Image from "next/image";
import React from "react";
import PlaidLink from "./PlaidLink";

interface ConnectPlaidAccountProps {
  user: any;
  header?: string;
  body?: string;
}

const ConnectPlaidAccount = ({
  user,
  header,
  body,
}: ConnectPlaidAccountProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex w-3/5 flex-col items-center justify-center gap-5">
        <Image
          src="/assets/icons/wallet-plus.svg"
          width={200}
          height={200}
          alt="connect account"
          className="dark:invert"
        />
        <div className="flex flex-col items-center gap-5 text-center">
          <h1 className="foreground-text text-3xl font-semibold">
            {header || "Connect your bank account"}
          </h1>
          <p className="text-gray-500 dark:text-gray-300">
            {body ||
              "Welcome to ClearPay! To track expenses, make payments, and more, connect your bank account."}
          </p>
          <PlaidLink user={user} mode="create" />
        </div>
      </div>
    </div>
  );
};

export default ConnectPlaidAccount;
