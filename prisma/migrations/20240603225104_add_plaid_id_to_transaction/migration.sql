/*
  Warnings:

  - Added the required column `plaidTransactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "cursor" TEXT;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "plaidTransactionId" TEXT NOT NULL;
