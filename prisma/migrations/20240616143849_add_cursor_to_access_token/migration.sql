/*
  Warnings:

  - You are about to drop the column `cursor` on the `BankAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AccessToken" ADD COLUMN     "cursor" TEXT;

-- AlterTable
ALTER TABLE "BankAccount" DROP COLUMN "cursor";
