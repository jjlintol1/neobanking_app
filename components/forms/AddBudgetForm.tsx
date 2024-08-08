"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import MoneyInput from "../custom/MoneyInput";
import CategorySelect from "../shared/CategorySelect";
import { Button } from "../ui/button";

const addBudgetSchema = z.object({
  category: z.object({
    id: z.number(),
    logoUrl: z.string(),
    categoryName: z.string(),
    categoryDisplayName: z.string(),
  }),
  amount: z.number().positive(),
});

interface AddBudgetFormProps {
  categories: any[];
}

const AddBudgetForm = ({ categories }: AddBudgetFormProps) => {
  const form = useForm<z.infer<typeof addBudgetSchema>>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      category: {
        id: 0,
        logoUrl: "",
        categoryName: "",
        categoryDisplayName: "",
      },
      amount: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof addBudgetSchema>) => {
    console.log(values);
  };


  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <CategorySelect form={form} categories={categories} />
              </FormControl>
            </FormItem>
          )}
        />
        <p>{form.watch("category.categoryDisplayName") || "nothing yet"}</p>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <MoneyInput
                  form={form}
                  label="Amount"
                  name="amount"
                  placeholder="$0.00"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex min-w-[175px] items-center justify-center rounded-md bg-primary-gradient px-4 font-semibold text-foreground-light"
        >
          Add Budget
        </Button>
      </form>
    </Form>
  );
};

export default AddBudgetForm;
