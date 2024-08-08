/*
  Warnings:

  - A unique constraint covering the columns `[plaidTransactionId]` on the table `Transaction` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "plaidTransactionId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_plaidTransactionId_key" ON "Transaction"("plaidTransactionId");
