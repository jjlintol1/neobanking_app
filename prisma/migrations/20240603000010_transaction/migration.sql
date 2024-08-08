-- AlterTable
ALTER TABLE "BankAccount" ADD COLUMN     "isDefaultPayment" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDefaultReceiving" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "recipientId" TEXT,
    "counterpartyName" TEXT,
    "counterpartyLogoUrl" TEXT,
    "category" TEXT NOT NULL,
    "categoryLogoUrl" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "BankAccount"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
