"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Image from "next/image";
import { formatDate, formatUSD } from "@/lib/utils";
import MobileTransactionObject from "./MobileTransactionObject";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { Badge } from "@tremor/react";
import { RiTimeLine, RiShieldCheckLine } from "@remixicon/react";
 
interface TransactionTableProps {
  userId: string;
  transactions: any[];
}

const TransactionTable = ({ userId, transactions }: TransactionTableProps) => {
  const pathname = usePathname();

  return (
    <div className="card mt-5 w-full rounded-md pb-4 shadow-md md:p-0">
      <div className="flex w-full items-center justify-between p-6 md:hidden">
        <p className="text-xl font-semibold">Recent Transactions</p>
        {pathname === "/" && (
          <div>
            <Link
              href="/transactions"
              className="text-lg font-medium dark:text-primary-light"
            >
              View All
            </Link>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col md:hidden">
        {transactions.map((tx) => (
          <MobileTransactionObject
            key={tx.id}
            transaction={tx}
            userId={userId}
          />
        ))}
      </div>
      <Table className="w-full border-collapse rounded-md border-none max-md:hidden">
        <TableHeader className="border-none">
          <TableRow className="">
            <TableHead className="text-foreground-light dark:text-foreground-dark">
              <p>Transaction</p>
            </TableHead>
            <TableHead className="text-foreground-light dark:text-foreground-dark">
              <p>Category</p>
            </TableHead>
            <TableHead className="text-foreground-light dark:text-foreground-dark">
              <p>Status</p>
            </TableHead>
            <TableHead className="text-foreground-light dark:text-foreground-dark">
              <p>Date</p>
            </TableHead>
            <TableHead className="text-foreground-light dark:text-foreground-dark">
              <p>Amount</p>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="space-y-5">
          {transactions.map((transaction: any) => {
            const userIsSender = transaction.senderId === userId;

            const absAmount = Math.abs(transaction.amount);

            let imgSrc;
            let firstInitial;
            let lastInitial;

            if (transaction.counterpartyLogoUrl) {
              imgSrc = transaction.counterpartyLogoUrl;
            } else if (transaction.sender && transaction.recipient) {
              imgSrc = "avatar";
              if (userIsSender) {
                firstInitial = transaction.recipient.firstName[0];
                lastInitial = transaction.recipient.lastName[0];
              } else {
                firstInitial = transaction.sender.firstName[0];
                lastInitial = transaction.sender.lastName[0];
              }
            } else {
              imgSrc = userIsSender
                ? transaction.senderTransactionCategory.logoUrl
                : transaction.recipientTransactionCategory.logoUrl;
            }

            return (
              <TableRow key={transaction.id}>
                <TableCell className="flex items-center gap-4">
                  {imgSrc === "avatar" ? (
                    <UserAvatar
                      firstInitial={firstInitial}
                      lastInitial={lastInitial}
                      size={40}
                      avatarTextColor="#000000"
                      textSize="20px"
                    />
                  ) : (
                    <Image
                      src={imgSrc}
                      alt="transaction party"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                  <p className="text-[16px] font-semibold">
                    {transaction.counterpartyName ||
                      (userIsSender
                        ? transaction.senderTransactionCategoryId === 3
                          ? `${transaction?.recipient?.firstName} ${transaction?.recipient?.lastName}`
                          : transaction.senderTransactionCategory
                              .categoryDisplayName
                        : transaction.recipientTransactionCategoryId === 2
                          ? `${transaction?.sender?.firstName} ${transaction?.sender?.lastName}`
                          : transaction.recipientTransactionCategory
                              .categoryDisplayName)}
                  </p>
                </TableCell>
                <TableCell>
                  <p className="text-[16px]">
                    {userIsSender
                      ? transaction.senderTransactionCategory
                          .categoryDisplayName
                      : transaction?.recipientTransactionCategory
                          ?.categoryDisplayName}
                  </p>
                </TableCell>
                <TableCell>
                  <Badge icon={transaction.status === "Pending" ? RiTimeLine : RiShieldCheckLine} color={transaction.status === "Pending" ? "yellow" : "green"}>
                    {transaction.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <p className="text-[16px]">{formatDate(transaction.date)}</p>
                </TableCell>
                <TableCell>
                  <p className="text-[16px] font-semibold">
                    {userIsSender
                      ? `(${formatUSD(absAmount)})`
                      : formatUSD(absAmount)}
                  </p>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
