"use server";

import { InternalServerError } from "../errors";
import { getUserBudgets } from "../repositories/budget.repository";
import { getTransactionCategories } from "../repositories/transactionCategory.repository";
import { parseStringify } from "../utils";

export async function fetchTransactionCategories() {
    try {
        const categories = await getTransactionCategories();
        return parseStringify(categories);
    } catch (error) {
        console.log(error);
    }
}

interface FetchTransactionCategoriesWithNoBudgetParams {
    userId: string;
}

export async function fetchTransactionCategoriesWithNoBudget({
    userId
}: FetchTransactionCategoriesWithNoBudgetParams) {
    try {
        const categories = await getTransactionCategories();
        if (categories === null) throw new InternalServerError("Error getting categories");

        const budgets = await getUserBudgets({ userId });
        if (budgets === null) throw new InternalServerError("Error getting budgets");
        
        const categoriesWithNoBudget = categories.filter((category) => {
            return !budgets.find((budget) => budget.transactionCategoryId === category.id);
        });
        return parseStringify(categoriesWithNoBudget);
    } catch (error) {
        console.error(error);
        throw error;
    }
}