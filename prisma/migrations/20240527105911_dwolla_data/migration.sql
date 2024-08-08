/*
  Warnings:

  - You are about to drop the column `account` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `routing` on the `BankAccount` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `BankAccount` table. All the data in the column will be lost.
  - Added the required column `accessToken` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accountId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fundingSourceUrl` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shareableId` to the `BankAccount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dwollaCustomerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dwollaCustomerUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "account",
DROP COLUMN "createdAt",
DROP COLUMN "routing",
DROP COLUMN "updatedAt",
ADD COLUMN     "accessToken" TEXT NOT NULL,
ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "bankId" TEXT NOT NULL,
ADD COLUMN     "fundingSourceUrl" TEXT NOT NULL,
ADD COLUMN     "shareableId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dwollaCustomerId" TEXT NOT NULL,
ADD COLUMN     "dwollaCustomerUrl" TEXT NOT NULL;
