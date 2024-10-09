import { sidebarLinks } from "@/constants";
import Image from "next/image";
import React from "react";
import SidebarLink from "./SidebarLink";
import PlaidLink from "../PlaidLink";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";



const Sidebar = async () => {
  const session = await getServerSession(options);

  if (!session) redirect("/sign-in");

  const { user } = session;

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between overflow-y-auto border-r border-gray-300 p-6 max-sm:hidden lg:w-[266px]">
      <div className="w-full">
        <div className="flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={30}
            height={30}
          />
          <h2 className="ml-2 hidden text-xl font-bold text-primary-light lg:block">
            Clear
            <span className="text-foreground-light dark:text-foreground-dark">
              Pay
            </span>
          </h2>
        </div>
        <div className="mt-10 flex flex-col gap-5">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.title} {...link} />
          ))}
          <PlaidLink user={user} sidebar mode="create" />
        </div>
      </div>
      <LogoutButton />
    </section>
  );
};

export default Sidebar;
