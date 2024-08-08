"use client";

import React, { useCallback, useEffect, useState } from "react";

import {
  PlaidLinkOnSuccess,
  PlaidLinkOptions,
  usePlaidLink,
} from "react-plaid-link";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  createLinkToken,
  exchangePublicToken,
  updateLinkToken,
} from "@/lib/actions/user.action";

interface PlaidLinkProps {
  user: any;
  sidebar?: boolean;
  mode: "create" | "update";
  accessToken?: string;
  menu?: boolean;
}

const PlaidLink = ({
  user,
  sidebar,
  mode = "create",
  accessToken,
  menu,
}: PlaidLinkProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState("");

  const onSuccess = useCallback<PlaidLinkOnSuccess>(
    async (public_token) => {
      if (mode === "create") {
        await exchangePublicToken({ publicToken: public_token, user });
      }
      if (pathname === "/") {
        router.refresh();
      } else {
        router.push("/");
      }
    },
    [user, router, mode, pathname]
  );

  useEffect(() => {
    const generateToken = async () => {
      let res;
      if (mode === "create") {
        res = await createLinkToken({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
        });
      } else {
        if (!accessToken) return;
        res = await updateLinkToken({
          userId: user.id,
          accessToken,
        });
      }
      setToken(res?.linkToken);
    };
    generateToken();
  }, [user, accessToken, mode]);

  const config: PlaidLinkOptions = {
    token,
    onSuccess,
  };

  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    if (mode === "update" && ready) {
      open();
    }
  }, [mode, ready, open]);

  return sidebar ? (
    <Button
      disabled={!ready}
      onClick={() => open()}
      className="flex cursor-pointer items-center justify-start gap-5 rounded-md bg-transparent p-2 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
    >
      <Image
        src="/assets/icons/secure.svg"
        alt="connect account"
        width={24}
        height={24}
        className="dark:invert"
      />
      <p
        className={`${menu ? "" : "hidden"} text-lg font-normal text-foreground-light dark:text-foreground-dark lg:block`}
      >
        Add Account
      </p>
    </Button>
  ) : mode === "update" ? (
    <></>
  ) : (
    <Button
      disabled={!ready}
      onClick={() => open()}
      className="bg-primary-gradient text-foreground-light shadow-md"
    >
      Connect Account
    </Button>
  );
};

export default PlaidLink;
