/*
  Warnings:

  - You are about to drop the column `accountId` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `plaidAccountId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "accountId",
ADD COLUMN     "plaidAccountId" TEXT NOT NULL;
