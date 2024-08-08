/*
  Warnings:

  - You are about to drop the column `stripeAccountId` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `stripeProcessorToken` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `dwollaFundingSourceUrl` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `processorToken` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "stripeAccountId",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripeProcessorToken",
ADD COLUMN     "dwollaFundingSourceUrl" TEXT NOT NULL,
ADD COLUMN     "processorToken" TEXT NOT NULL;
