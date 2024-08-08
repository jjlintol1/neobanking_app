import { formatDate, formatUSD } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import UserAvatar from "./UserAvatar";

interface MobileTransactionObjectProps {
  transaction: any;
  userId: string;
}

const MobileTransactionObject = ({
  transaction,
  userId,
}: MobileTransactionObjectProps) => {
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
    <div className="card flex w-full items-center justify-between rounded-md bg-card-light px-6 py-2 dark:bg-card-dark">
      <div className="flex items-center gap-4">
        <div className="flex size-[50px] items-center justify-center rounded-md">
          {imgSrc === "avatar" ? (
            <UserAvatar
              firstInitial={firstInitial}
              lastInitial={lastInitial}
              size={50}
              avatarTextColor="#000000"
              textSize="24px"
            />
          ) : (
            <Image
              src={imgSrc}
              alt="transaction party"
              width={50}
              height={50}
              className="rounded-full"
            />
          )}
        </div>
        <div>
          <p className="text-lg font-medium">
            {transaction.counterpartyName ||
              (userIsSender
                ? transaction.senderTransactionCategoryId === 3
                  ? `${transaction?.recipient?.firstName} ${transaction?.recipient?.lastName}`
                  : transaction.senderTransactionCategory.categoryDisplayName
                : transaction.recipientTransactionCategoryId === 2
                  ? `${transaction?.sender?.firstName} ${transaction?.sender?.lastName}`
                  : transaction.recipientTransactionCategory
                      .categoryDisplayName)}
          </p>
          <p className="text-sm">{formatDate(transaction.date)}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className={`text-lg`}>
          {userIsSender ? `(${formatUSD(absAmount)})` : formatUSD(absAmount)}
        </p>
      </div>
    </div>
  );
};

// interface MobileTransactionsProps {
//     transactions: any[]
// }

// const MobileTransactions = ({
//     transactions
// }: MobileTransactionsProps) => {
//   return (
//     <div className='flex w-full flex-col gap-4 md:hidden'>
//         {transactions.map((transaction, index) => (
//             <MobileTransactionObject key={index} transaction={transaction} />
//         ))}
//     </div>
//   )
// }

export default MobileTransactionObject;
