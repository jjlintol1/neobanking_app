"use client";

import { formatUSD } from "@/lib/utils";
import React from "react";
import CountUp from "react-countup";

interface BalanceDisplayProps {
  account: any;
}

const BalanceDisplay = ({
  account
}: BalanceDisplayProps) => {
  const currentBalance = formatUSD(account?.currentBalance || 0);

  const [dollars, cents] = currentBalance.replace("$", "").split(".");

  return (
    <p className="foreground-text mt-5 text-8xl lg:text-9xl">
      <CountUp
        end={+dollars.replace("$", "")}
        duration={1}
        separator=","
        prefix="$"
      />
      <span className="text-lg">
        .
        <CountUp end={+cents} duration={1} prefix={+cents >= 10 ? "" : "0"} />
      </span>
    </p>
  );
};

export default BalanceDisplay;
