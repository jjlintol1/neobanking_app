"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const TransferUserSearch = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const searchContainerRef = useRef(null);

  const query = searchParams.get("q");

  const [term, setTerm] = useState<string>("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (term) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: term,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [term, searchParams, router, query]);

  return (
    <div className="relative w-full" ref={searchContainerRef}>
      <div className="relative flex min-h-[56px] grow items-center gap-1 rounded-md bg-card-light px-4 text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="dark:invert"
        />
        <Input
          type="text"
          placeholder="Search by transaction type, description or involved parties"
          value={term}
          className="no-focus bg-inherit border-none shadow-none outline-none"
          onChange={(e) => setTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TransferUserSearch;
