"use client";

import React from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";

import Link from "next/link";
import Image from "next/image";

import { usePathname } from "next/navigation";
import { sidebarLinks } from "@/constants";
import PlaidLink from "./PlaidLink";
import LogoutButton from "./sidebar/LogoutButton";

interface MobileLinkProps {
  icon: string;
  title: string;
  route: string;
}

const MobileLink = ({ icon, title, route }: MobileLinkProps) => {
  const pathname = usePathname();

  const isSelected = pathname === route;

  return (
    <SheetClose asChild>
      <Link
        href={route}
        key={title}
        className={`flex items-center gap-5 rounded-[10px] p-2 ${isSelected ? "bg-primary-gradient" : ""}`}
      >
        <Image
          src={icon}
          alt={title}
          width={24}
          height={24}
          className={`${isSelected ? "" : "dark:invert"}`}
        />
        <p
          className={`text-lg ${isSelected ? "text-cardForeground-light" : "text-cardForeground-light dark:text-cardForeground-dark"}`}
        >
          {title}
        </p>
      </Link>
    </SheetClose>
  );
};

interface MobileHamburgerMenuProps {
  user: any;
}

const MobileHamburgerMenu = ({ user }: MobileHamburgerMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="menu"
          width={24}
          height={24}
          className="cursor-pointer dark:invert"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex h-screen flex-col justify-between border-none bg-card-light dark:bg-card-dark"
      >
        <div className="w-full">
          <SheetClose asChild>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/assets/images/logo.png"
                alt="logo"
                width={30}
                height={30}
              />
              <h2 className="text-xl font-bold text-primary-light">
                Clear<span className="foreground-text">Pay</span>
              </h2>
            </Link>
          </SheetClose>
          <section className="mt-10 flex flex-col gap-5">
            {sidebarLinks.map((link) => (
              <MobileLink
                key={link.title}
                icon={link.icon}
                title={link.title}
                route={link.route}
              />
            ))}
            <PlaidLink sidebar mode="create" user={user} menu />
          </section>
        </div>
        <SheetClose asChild>
          <LogoutButton mobile />
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};

export default MobileHamburgerMenu;
