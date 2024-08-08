import Image from "next/image";
import React from "react";
import MobileHamburgerMenu from "./MobileHamburgerMenu";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Theme from "./Theme";

const MobileNavbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className="flex items-center justify-between p-6 sm:hidden">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-end gap-4">
        <Theme />
        <MobileHamburgerMenu user={session.user} />
      </div>
    </nav>
  );
};

export default MobileNavbar;
