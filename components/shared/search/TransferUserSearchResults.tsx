"use client";

import { retrieveUsers } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import UserAvatar from "../UserAvatar";

interface SearchResultProps {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarColor: string;
  avatarTextColor: string;
  setIsOpen: (isOpen: boolean) => void;
  setTerm: (term: string) => void;
  form: any;
}

const SearchResult = ({
  id,
  firstName,
  lastName,
  username,
  avatarColor,
  avatarTextColor,
  setIsOpen,
  setTerm,
  form,
}: SearchResultProps) => {
  const handleSelectUser = () => {
    form.setValue("recipient", {
      id,
      firstName,
      lastName,
      username,
    });
    setIsOpen(false);
    setTerm("");
  };

  return (
    <div
      onClick={handleSelectUser}
      className="flex w-full cursor-pointer items-center gap-3 px-6"
    >
      <UserAvatar
        firstInitial={firstName[0]}
        lastInitial={lastName[0]}
        avatarTextColor={avatarTextColor}
      />
      <div className="flex flex-col">
        <p className="line-clamp-1 text-lg font-medium capitalize">
          {firstName} {lastName}
        </p>
        <p className="text-sm">@{username}</p>
      </div>
    </div>
  );
};

interface TransferUserSearchResultsProps {
  form: any;
  setIsOpen: (isOpen: boolean) => void;
  setTerm: (term: string) => void;
}

const TransferUserSearchResults = ({
  form,
  setIsOpen,
  setTerm,
}: TransferUserSearchResultsProps) => {
  const [result, setResult] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchParams = useSearchParams();

  const query = searchParams.get("recipient");

  useEffect(() => {
    const fetchResults = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        const searchResults = await retrieveUsers({ query: query || "" });
        setResult(searchResults?.users || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="absolute top-full z-50 mt-3 w-full rounded-md bg-card-light text-cardForeground-light dark:bg-card-dark dark:text-cardForeground-dark">
      <div className="py-6">
        <h4 className="px-6 text-lg">Users</h4>
        <div className="mt-8 flex w-full flex-col gap-5">
          {result.length ? (
            result.map((user, i) => (
              <SearchResult
                key={i}
                {...user}
                setIsOpen={setIsOpen}
                setTerm={setTerm}
                form={form}
              />
            ))
          ) : isLoading ? (
            <p>Loading...</p>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransferUserSearchResults;
