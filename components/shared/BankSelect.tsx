"use client";

import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import Image from "next/image";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface BankSelectProps {
  accounts: any[];
  fullWidth?: boolean;
  form?: any;
}

const BankSelect = ({ accounts, fullWidth, form }: BankSelectProps) => {
  const [selectedBank, setSelectedBank] = useState("all");

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (value: string) => {
    setSelectedBank(value);
    if (form) {
      form.setValue("account", value);
    } else {
      if (value !== "all") {
        const newUrl = formUrlQuery({
          key: "account",
          value,
          params: searchParams.toString(),
        });
        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromQuery({
          keysToRemove: ["account"],
          params: searchParams.toString(),
        });
        router.push(newUrl, { scroll: false });
      }
    }
  };

  const selectedBankName =
    selectedBank !== "all"
      ? accounts.find((account) => account.id === selectedBank)?.name
      : form
        ? "Select Source Account"
        : "All Accounts";

  return (
    <Select onValueChange={handleChange} defaultValue="all">
      <SelectTrigger
        className={`no-focus min-h-[56px] w-full rounded-md bg-card-light text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark ${!fullWidth ? "sm:w-[220px]  lg:w-[300px]" : ""}`}
      >
        <div className="flex items-center gap-5">
          <Image
            src={
              selectedBank === "all"
                ? "/assets/icons/bank.svg"
                : `data:image/jpeg;base64,${accounts.find((account) => account.id === selectedBank)?.institutionLogo}`
            }
            alt="Bank"
            width={24}
            height={24}
            className={selectedBank === "all" ? "dark:invert" : ""}
          />
          <p>{selectedBankName}</p>
        </div>
      </SelectTrigger>
      <SelectContent className="rounded-md bg-card-light text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark">
        {!form && (
          <SelectItem value="all">
            <div className="flex items-center gap-2">
              <Image
                src="/assets/icons/bank.svg"
                alt="Bank Accounts"
                width={30}
                height={30}
                className="dark:invert"
              />
              <p className="line-clamp-1">All Accounts</p>
            </div>
          </SelectItem>
        )}
        {accounts.map((account) => (
          <SelectItem key={account.id} value={account.id}>
            <div className="flex items-center gap-2">
              <Image
                src={
                  account.institutionLogo
                    ? `data:image/jpeg;base64,${account.institutionLogo}`
                    : "/assets/icons/bank.svg"
                }
                alt="Bank Accounts"
                width={30}
                height={30}
              />
              <p className="line-clamp-1">
                {account.institutionName} {account.name}
              </p>
            </div>
          </SelectItem>
        ))}
        {/* <SelectContent></SelectContent> */}
      </SelectContent>
    </Select>
  );
};

export default BankSelect;
