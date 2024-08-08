/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.
  - Added the required column `dwollaCustomerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dwollaCustomerUrl` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId",
ADD COLUMN     "dwollaCustomerId" TEXT NOT NULL,
ADD COLUMN     "dwollaCustomerUrl" TEXT NOT NULL;
