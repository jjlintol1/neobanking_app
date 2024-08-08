"use server";

import prisma from "../prisma";

interface GetTransactionCategoryIdParams {
  categoryName: string;
}

export async function getTransactionCategoryId({
  categoryName,
}: GetTransactionCategoryIdParams) {
  try {
    const transactionCategory = await prisma.transactionCategory.findFirst({
      where: {
        categoryName,
      },
    });
    return transactionCategory?.id || null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTransactionCategories() {
  try {
    const transactionCategories = await prisma.transactionCategory.findMany();
    return transactionCategories;
  } catch (error) {
    console.error(error);
    return null;
  }
}
