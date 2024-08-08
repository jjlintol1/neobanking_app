/*
  Warnings:

  - You are about to drop the column `fundingSourceUrl` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `shareableId` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `stripeCustomerId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripeProcessorToken` to the `BankAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "fundingSourceUrl",
DROP COLUMN "shareableId",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL,
ADD COLUMN     "stripeProcessorToken" TEXT NOT NULL;
