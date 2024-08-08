-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderBankAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_senderId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "senderBankAccountId" DROP NOT NULL,
ALTER COLUMN "senderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderBankAccountId_fkey" FOREIGN KEY ("senderBankAccountId") REFERENCES "BankAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
