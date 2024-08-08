/*
  Warnings:

  - You are about to drop the column `transactionCategoryId` on the `Transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_transactionCategoryId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "transactionCategoryId",
ADD COLUMN     "recipientTransactionCategoryId" INTEGER,
ADD COLUMN     "senderTransactionCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderTransactionCategoryId_fkey" FOREIGN KEY ("senderTransactionCategoryId") REFERENCES "TransactionCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_recipientTransactionCategoryId_fkey" FOREIGN KEY ("recipientTransactionCategoryId") REFERENCES "TransactionCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
