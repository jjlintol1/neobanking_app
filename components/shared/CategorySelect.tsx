"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import Image from "next/image";


interface CategorySelectProps {
  categories: any[];
  form: any;
}

const CategorySelect = ({ categories, form }: CategorySelectProps) => {

  const handleChange = (value: any) => {
    form.setValue("category", value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger
        className={`no-focus min-h-[56px] w-full rounded-md bg-card-light text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark`}
      >
        <div className="flex items-center gap-5">
          <Image
            src={form.getValues("category").logoUrl || "/assets/icons/transaction_normal.svg"}
            alt="category select"
            width={24}
            height={24}
            className="dark:invert"
          />
          <p>{form.getValues("category").categoryDisplayName || "Select Category"}</p>
        </div>
      </SelectTrigger>
      <SelectContent className="overflow-auto rounded-md bg-card-light text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark">
        {categories.map((category) => (
          <SelectItem key={category.id} value={category}>
            <div className="flex items-center gap-2">
              <Image
                src={
                  category.logoUrl
                }
                alt="Bank Accounts"
                width={30}
                height={30}
              />
              <p className="line-clamp-1">
                {category.categoryDisplayName}
              </p>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
