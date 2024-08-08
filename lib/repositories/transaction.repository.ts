import prisma from "../prisma";

interface InsertTransactionsProps {
  transactions: any[];
}

export async function insertTransactions({
  transactions,
}: InsertTransactionsProps) {
  return await prisma.transaction.createMany({
    data: transactions,
    skipDuplicates: true,
  });
}

interface CountTransactionsParams {
  userId: string;
  query: string;
  accountId?: string;
}

export async function countTransactions({
  userId,
  query,
  accountId,
}: CountTransactionsParams) {
  const conditions: any = [
    {
      OR: [
        {
          senderId: {
            equals: userId,
          },
        },
        {
          recipientId: {
            equals: userId,
          },
        },
      ],
    },
    {
      OR: [
        {
          counterpartyName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          senderTransactionCategory: {
            categoryName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          recipientTransactionCategory: {
            categoryName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          sender: {
            username: {
              contains: query,
              mode: "insensitive",
            },
            firstName: {
              contains: query,
              mode: "insensitive",
            },
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },

        {
          recipient: {
            username: {
              contains: query,
              mode: "insensitive",
            },
            firstName: {
              contains: query,
              mode: "insensitive",
            },
            lastName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  ];

  if (accountId) {
    conditions.push({
      OR: [
        {
          senderBankAccountId: {
            equals: accountId,
          },
        },
        {
          recipientBankAccountId: {
            equals: accountId,
          },
        },
      ],
    });
  }

  return await prisma.transaction.count({
    where: {
      AND: conditions,
    },
  });
}

interface GetUserTransactionsParams {
  userId: string;
  page: number;
  pageSize: number;
  query: string; // Include query as an optional parameter
  accountId?: string;
}

export async function getUserTransactions({
  userId,
  page,
  pageSize,
  query,
  accountId,
}: GetUserTransactionsParams) {
  const conditions: any = [
    {
      OR: [
        {
          senderId: {
            equals: userId,
          },
        },
        {
          recipientId: {
            equals: userId,
          },
        },
      ],
    },
    {
      OR: [
        {
          counterpartyName: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          senderTransactionCategory: {
            categoryName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          recipientTransactionCategory: {
            categoryName: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
        {
          sender: {
            OR: [
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
        {
          recipient: {
            OR: [
              {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            ],
          },
        },
      ],
    },
  ];

  if (accountId) {
    conditions.push({
      OR: [
        {
          senderBankAccountId: {
            equals: accountId,
          },
        },
        {
          recipientBankAccountId: {
            equals: accountId,
          },
        },
      ],
    });
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        AND: conditions,
      },
      include: {
        senderTransactionCategory: true,
        recipientTransactionCategory: true,
        sender: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
        recipient: {
          select: {
            firstName: true,
            lastName: true,
            username: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    return transactions;
  } catch (error) {
    console.error(error);
    return null;
  }
}


interface CreateTransferParams {
  senderId: string;
  recipientId: string;
  senderBankAccountId: string;
  recipientBankAccountId: string;
  amount: number;
  dwollaTransferUrl: string;
  description: string;
}

export async function createDbTransfer({
  senderId,
  recipientId,
  senderBankAccountId,
  recipientBankAccountId,
  amount,
  dwollaTransferUrl,
  description,
}: CreateTransferParams) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        senderId,
        recipientId,
        senderBankAccountId,
        recipientBankAccountId,
        amount,
        dwollaTransferUrl,
        senderTransactionCategoryId: 3,
        recipientTransactionCategoryId: 2,
        currency: "USD",
        description,
        status: "Pending",
        type: "Transfer",
      },
    });
    return newTransaction;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface GetExpenseCategoryTotalsParams {
  userId: string;
  startDate: Date;
  endDate: Date;
}

export async function getExpenseCategoryTotals({
  userId,
  startDate,
  endDate,
}: GetExpenseCategoryTotalsParams) {
  try {
    const transactions = await prisma.$queryRaw`
      SELECT 
        "tc"."categoryDisplayName" as category,
        SUM(ABS(t.amount)) as total
      FROM
        "Transaction" as "t"
      INNER JOIN 
        "TransactionCategory" as tc ON "t"."senderTransactionCategoryId" = "tc"."id"
      WHERE 
        "t"."senderId" = ${userId} and "t"."date" > ${startDate} and "t"."date" < ${endDate}
      GROUP BY 
        "t"."senderTransactionCategoryId", "tc"."categoryDisplayName"
    `;
    return transactions;
  } catch (error) {
    console.error(error);
    return null;
  }
}
