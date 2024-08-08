"use client";

import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import { signInSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "../ui/use-toast";
import { RiLock2Fill, RiLock2Line, RiMailFill, RiMailLine } from "@remixicon/react";
import { useTheme } from "@/context/ThemeProvider";

const SignInForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const { mode } = useTheme();

  const form = useForm<z.infer<typeof signInSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    setIsLoading(true);
    try {
      const { email, password } = values;
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        return toast({
          title: "Unable to sign in",
          description: response.error,
        });
      } else {
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Unable to sign in",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        // eslint-disable-next-line tailwindcss/no-unnecessary-arbitrary-value
        className="flex w-full flex-col items-center justify-center p-14"
      >
        <div className="flex w-full max-w-[425px] flex-col gap-5">
          <div className="mb-5 flex w-full items-center justify-center">
            <h2 className="foreground-text text-2xl font-medium sm:text-4xl">
              Log in to ClearPay
            </h2>
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="foreground-text">Email</FormLabel>
                <FormControl>
                  <div className="card flex w-full items-center rounded-[10px] px-3">
                    {mode === "dark" ? <RiMailLine className="size-[24px] text-foreground-dark" /> : <RiMailFill className="text-[24px]" /> }
                    <Input
                      className="no-focus w-full rounded-[10px] border-none bg-inherit"
                      {...field}
                      placeholder="johnsmith@gmail.com"
                      type="email"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="foreground-text">Password</FormLabel>
                <FormControl>
                  <div className="card flex w-full items-center rounded-[10px] px-3">
                    {mode === "dark" ? <RiLock2Line className="size-[24px] text-foreground-dark" /> : <RiLock2Fill className="text-[24px]" /> }
                    <Input
                      className="no-focus w-full rounded-[10px] border-none bg-transparent"
                      {...field}
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="line-clamp-1 flex w-full items-center justify-center bg-primary-gradient"
          >
            {isLoading ? <div className="custom-loader-dark"></div> : "Sign In"}
          </Button>
          <div className="foreground-text flex w-full items-center justify-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="gradient-text font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
