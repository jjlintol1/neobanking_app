import prisma from "../prisma";

interface GetUserBudgetsParams {
  userId: string;
}

export async function getUserBudgets({ userId }: GetUserBudgetsParams) {
  try {
    const budgets = await prisma.budget.findMany({
      where: {
        userId,
      },
    });
    return budgets;
  } catch (error) {
    console.error(error);
    return null;
  }
}

interface CreateBudgetParams {
  userId: string;
  transactionCategoryId: number;
  amount: number;
}

export async function createBudget({
  userId,
  transactionCategoryId,
  amount,
}: CreateBudgetParams) {
  try {
    const newBudget = await prisma.budget.create({
      data: {
        userId,
        transactionCategoryId,
        amount,
      },
    });
    return newBudget;
  } catch (error) {
    console.error(error);
    return null;
  }
}