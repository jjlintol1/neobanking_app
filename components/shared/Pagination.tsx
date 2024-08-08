"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  isNext: boolean;
}

type HandlePaginate = "prev" | "next";

const Pagination = ({ currentPage, isNext }: PaginationProps) => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const selected = searchParams.get("selected");
  const account = searchParams.get("account");

  useEffect(() => {
    if (selected || account) {
      const url = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["page"],
      });
      router.push(url, { scroll: false });
    }
  }, [selected, account, router]);

  const handlePaginate = (type: HandlePaginate) => {
    let nextPage;
    if (type === "prev") {
      nextPage = currentPage - 1;
    } else {
      nextPage = currentPage + 1;
    }
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: nextPage.toString(),
    });
    router.push(newUrl, { scroll: false });
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        disabled={currentPage <= 1}
        className="h-[36px] border-2 border-none bg-card-light text-cardForeground-light shadow-md hover:bg-accent-light hover:text-accentForeground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-light  disabled:pointer-events-none disabled:opacity-50 dark:border-none dark:bg-card-dark dark:text-cardForeground-dark dark:hover:bg-accent-dark"
        onClick={() => handlePaginate("prev")}
      >
        Prev
      </Button>
      <div className="rounded-xl bg-primary-gradient px-3.5 py-2 shadow-lg">
        <p className="font-semibold text-foreground-light">{currentPage}</p>
      </div>
      <Button
        disabled={!isNext}
        className="h-[36px] border-none bg-card-light text-cardForeground-light shadow-md hover:bg-accent-light hover:text-accentForeground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-light  disabled:pointer-events-none disabled:opacity-50 dark:border-none dark:bg-card-dark dark:text-cardForeground-dark dark:hover:bg-accent-dark"
        onClick={() => handlePaginate("next")}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
