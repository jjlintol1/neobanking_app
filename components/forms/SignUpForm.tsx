"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { register } from "@/lib/actions/user.action";

import * as z from "zod";
import { signUpSchema } from "@/lib/validations";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { signIn } from "next-auth/react";
// import { useToast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import {
  RiCommunityFill,
  RiCommunityLine,
  RiHome2Fill,
  RiHome2Line,
  RiIdCardFill,
  RiIdCardLine,
  RiLockFill,
  RiLockLine,
  RiMailFill,
  RiMailLine,
  RiMap2Fill,
  RiMap2Line,
  RiUserFill,
  RiUserLine,
  RiUserLocationFill,
  RiUserLocationLine,
} from "@remixicon/react";
import { useTheme } from "@/context/ThemeProvider";

const SignUpForm = () => {
  // const { toast } = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const { mode } = useTheme();

  const form = useForm<z.infer<typeof signUpSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      ssn: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    setIsLoading(true);
    try {
      const user = await register({ ...values });
      if (user.created) {
        const response = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (response?.error) {
          return toast({
            title: "Unable to sign in",
            description: response.error,
          });
        }
        router.push("/");
      }
    } catch (error: any) {
      toast({
        title: "Unable to sign up",
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
        className="mb-10 mt-5 flex flex-col items-center justify-center gap-5 overflow-y-auto rounded-[12px] px-14"
      >
        <div className="flex w-full max-w-[425px] flex-col gap-5">
          <div className="flex flex-col gap-5">
            <h2 className="foreground-text text-2xl font-medium sm:text-4xl">
              Automate your finances
            </h2>
            <p className="foreground-text">
              Enter your details below to get started
            </p>
          </div>
          <div className="mt-5 flex w-full flex-col gap-4 sm:flex-row lg:items-center">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel className="foreground-text">First Name</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiUserLine className="size-[24px]" />
                      ) : (
                        <RiUserFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="John"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-1 flex-col">
                  <FormLabel className="foreground-text">Last Name</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiUserLine className="size-[24px]" />
                      ) : (
                        <RiUserFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="Smith"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="foreground-text">Email</FormLabel>
                <FormControl>
                  <div className="card flex w-full items-center rounded-md px-3">
                    {mode === "dark" ? (
                      <RiMailLine className="size-[24px]" />
                    ) : (
                      <RiMailFill className="size-[24px] dark:invert" />
                    )}
                    <Input
                      className="no-focus w-full rounded-md border-none bg-transparent"
                      {...field}
                      placeholder="johnsmith@gmail.com"
                      type="email"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="foreground-text">Username</FormLabel>
                <FormControl>
                  <div className="card flex w-full items-center rounded-md px-3">
                    {mode === "dark" ? (
                      <RiIdCardLine className="size-[24px]" />
                    ) : (
                      <RiIdCardFill className="size-[24px] dark:invert" />
                    )}
                    <Input
                      className="no-focus w-full rounded-md border-none bg-transparent"
                      {...field}
                      placeholder="jsmith"
                      type="username"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">Address</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiHome2Line className="size-[24px] dark:text-foreground-dark" />
                      ) : (
                        <RiHome2Fill className="size-[24px]" />
                      )}
                      <Input
                        className="no-focus w-full items-center rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="1234 Main St"
                        type="text"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">City</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiCommunityLine className="size-[24px] text-foreground-dark" />
                      ) : (
                        <RiCommunityFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="New York"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">State</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiMap2Line className="size-[24px] dark:text-foreground-dark" />
                      ) : (
                        <RiMap2Fill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="NY"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">Zip</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiUserLocationLine className="size-[24px] dark:text-foreground-dark" />
                      ) : (
                        <RiUserLocationFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="12345"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">Birthday</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiUserLine className="size-[24px] dark:text-foreground-dark" />
                      ) : (
                        <RiUserFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="YYYY-MM-DD"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ssn"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="foreground-text">SSN</FormLabel>
                  <FormControl>
                    <div className="card flex w-full items-center rounded-md px-3">
                      {mode === "dark" ? (
                        <RiLockLine className="size-[24px] dark:text-foreground-dark" />
                      ) : (
                        <RiLockFill className="size-[24px] dark:invert" />
                      )}
                      <Input
                        className="no-focus w-full rounded-md border-none bg-transparent"
                        {...field}
                        placeholder="1234"
                        type="text"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="foreground-text">Password</FormLabel>
                <FormControl>
                  <div className="card flex w-full items-center rounded-md  px-3">
                    {mode === "dark" ? (
                      <RiLockLine className="size-[24px] dark:text-foreground-dark" />
                    ) : (
                      <RiLockFill className="size-[24px] dark:invert" />
                    )}
                    <Input
                      className="no-focus w-full rounded-md border-none bg-transparent"
                      {...field}
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="line-clamp-1 flex w-full items-center justify-center bg-primary-gradient"
          >
            {isLoading ? <div className="custom-loader-dark"></div> : "Sign up"}
          </Button>
          <div className="foreground-text flex w-full items-center justify-center">
            <p>
              Already have an account?{" "}
              <Link className="gradient-text font-semibold" href="/sign-in">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
