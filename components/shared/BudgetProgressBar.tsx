"use client";

import { ProgressBar } from "@tremor/react";
import Image from "next/image";
import React from "react";

const BudgetProgressBar = () => {
  return (
    <div className="flex items-center rounded-md bg-background-light px-4 py-3 shadow-md dark:bg-background-dark">
      <div className="flex w-1/2 items-center gap-5 md:w-1/3 lg:w-1/4">
        <Image
          src="https://plaid-category-icons.plaid.com/PFC_BANK_FEES.png"
          alt="logo"
          width={30}
          height={30}
          className="rounded-full"
        />
        <p className="text-xl">
            Bank Fees
        </p>
      </div>
      <div className="w-1/2 md:w-2/3 lg:w-3/4">
        <p className="flex items-center justify-between text-lg text-tremor-content dark:text-dark-tremor-content">
          <span>$9,012 &bull; 45%</span>
          <span>$20,000</span>
        </p>
        <ProgressBar value={45} className="mt-2" color="teal" />
      </div>
    </div>
  );
};

export default BudgetProgressBar;
