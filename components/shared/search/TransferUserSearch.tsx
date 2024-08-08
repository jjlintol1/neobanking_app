"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import TransferUserSearchResults from "./TransferUserSearchResults";

interface TransferUserSearchProps {
  form: any;
}

const TransferUserSearch = ({ form }: TransferUserSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const searchParams = useSearchParams();

  const searchContainerRef = useRef(null);

  const query = searchParams.get("recipient");

  const [term, setTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    const handleOutsideClick = (e: any) => {
      if (
        searchContainerRef.current &&
        // @ts-ignore
        !searchContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
        setTerm("");
      }

      setIsOpen(false);
      setTerm("");

      document.addEventListener("click", handleOutsideClick);

      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    };
  }, [pathname]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (term) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "recipient",
          value: term,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (query) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ["recipient"],
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
          placeholder="Who do you want to send money to?"
          value={term}
          className="no-focus border-none bg-inherit shadow-none outline-none"
          onChange={(e: any) => {
            setTerm(e.target.value);
            if (!isOpen) {
              setIsOpen(true);
            }
            if (e.target.value === "" && isOpen) {
              setIsOpen(false);
            }
          }}
        />
      </div>
      {isOpen && (
        <TransferUserSearchResults
          form={form}
          setIsOpen={setIsOpen}
          setTerm={setTerm}
        />
      )}
    </div>
  );
};

export default TransferUserSearch;
