"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

interface LogoutButtonProps {
  mobile?: boolean;
}

const LogoutButton = ({ mobile }: LogoutButtonProps) => {
  const router = useRouter();
  return (
    <div
      className="flex cursor-pointer items-center gap-5 p-2"
      onClick={() => {
        signOut();
        router.push("/sign-in");
      }}
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="logout"
        width={24}
        height={24}
        className="dark:invert"
      />
      <p className={`foreground-text text-lg ${mobile ? "block" : "hidden lg:block"}`}>Logout</p>
    </div>
  );
};

export default LogoutButton;
