import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-background-light dark:bg-background-dark">
      <nav className="flex p-6">
        <div className="flex items-center gap-5">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={30}
            height={30}
          />
          <h2 className="text-xl font-bold text-primary-light">
            Clear<span className="foreground-text">Pay</span>
          </h2>
        </div>
      </nav>
      <section className="flex min-h-[calc(100vh-78px)] w-full items-center justify-center overflow-y-auto">
        <div className="flex w-full">
          <div className="min-h-[calc(100vh-78px)] w-full  flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default AuthLayout;
