"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React from "react";

interface SidebarLinkProps {
  icon: string;
  title: string;
  route: string;
}

const SidebarLink = ({ icon, title, route }: SidebarLinkProps) => {
  const pathname = usePathname();

  const isSelected = pathname === route;

  return (
    <Link
      href={route}
      key={title}
      className={`flex items-center gap-5 rounded-md p-2 ${isSelected ? "bg-primary-gradient" : ""}`}
    >
      <Image
        src={icon}
        alt={title}
        width={24}
        height={24}
        className={`${isSelected ? "invert-0" : "dark:invert"}`}
      />
      <p
        className={`hidden text-lg lg:block ${isSelected ? "text-foreground-light" : "foreground-text"}`}
      >
        {title}
      </p>
    </Link>
  );
};

export default SidebarLink;
