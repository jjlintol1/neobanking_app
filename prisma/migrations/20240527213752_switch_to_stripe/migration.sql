/*
  Warnings:

  - You are about to drop the column `dwollaCustomerId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dwollaCustomerUrl` on the `User` table. All the data in the column will be lost.
  - Added the required column `stripeCustomerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dwollaCustomerId",
DROP COLUMN "dwollaCustomerUrl",
ADD COLUMN     "stripeCustomerId" TEXT NOT NULL;
