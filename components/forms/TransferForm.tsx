"use client";

import React, { useEffect, useState } from "react";

import z from "zod";
import { Form, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { transferSchema } from "@/lib/validations";
import TransferUserSearch from "../shared/search/TransferUserSearch";
import Image from "next/image";
import { Input } from "../ui/input";
import MoneyInput from "../custom/MoneyInput";
import { Button } from "../ui/button";
import { formatUSD } from "@/lib/utils";
import { Avatar } from "../ui/avatar";
import BankSelect from "../shared/BankSelect";
import { toast } from "../ui/use-toast";
import { transfer } from "@/lib/actions/transaction.action";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface TransferFormProps {
  accounts: any[];
}

const TransferForm = ({ accounts }: TransferFormProps) => {
  const [selectedBank, setSelectedBank] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof transferSchema>>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      amount: 0,
      account: "",
      recipient: {
        id: "",
        firstName: "",
        lastName: "",
        username: "",
      },
      description: "",
    },
  });

  const account = form.watch("account");
  const recipient = form.watch("recipient");

  useEffect(() => {
    if (account) setSelectedBank(accounts.find((acc) => acc.id === account));
  }, [account, accounts]);

  function formatBankAvatar(name: string) {
    if (name.split(" ").length > 1) {
      return name.split(" ")[0][0] + name.split(" ")[1][0];
    } else {
      return name.split(" ")[0][0];
    }
  }

  async function onSubmit(values: z.infer<typeof transferSchema>) {
    setIsLoading(true);
    try {
      await transfer({
        recipientUserId: values.recipient.id,
        amount: values.amount,
        description: values.description,
        senderAccountId: values.account,
      });
      router.push("/");
      toast({
        title: "Transfer initiated",
        description: `You initiated a transfer of ${formatUSD(values.amount)} to ${values.recipient.firstName} ${values.recipient.lastName}`,
      });
    } catch (error: any) {
      console.error(error);
      return toast({
        title: "Unable to transfer funds",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-10 flex w-full gap-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="recipient"
            render={({ field }) => (
              <FormItem>
                <TransferUserSearch form={form} />
              </FormItem>
            )}
          />
          <div className="mt-5 flex w-full items-center justify-center gap-5">
            <div className="flex items-center gap-3">
              <p className="foreground-text">
                {selectedBank ? selectedBank.name : "Select Bank"}
              </p>
              <Avatar className="flex size-[40px] items-center justify-center bg-primary-light">
                <p className="">
                  {selectedBank ? formatBankAvatar(selectedBank.name) : ""}
                </p>
              </Avatar>
            </div>
            <div className="gradient-white rounded-full p-2">
              <Image
                src="/assets/icons/transfer.svg"
                alt="transfer"
                width={20}
                height={20}
              />
            </div>
            <div className="flex items-center gap-3">
              <Avatar className="flex size-[40px] items-center justify-center bg-primary-light">
                <p className="">
                  {recipient.firstName
                    ? `${recipient.firstName.charAt(0)}${recipient.lastName.charAt(0)}`
                    : ""}
                </p>
              </Avatar>
              <p className="foreground-text">
                {recipient.firstName
                  ? `${recipient.firstName} ${recipient.lastName}`
                  : "Select Recipient"}
              </p>
            </div>
          </div>
          <FormField
            control={form.control}
            name="account"
            render={({ field }) => (
              <FormItem>
                <BankSelect accounts={accounts} fullWidth form={form} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <MoneyInput
                  form={form}
                  name="amount"
                  label="Amount"
                  placeholder="$0.00"
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="foreground-text">Description</FormLabel>
                <Input
                  {...field}
                  className="card no-focus mt-4 min-h-[56px] w-full rounded-md"
                  type="text"
                  placeholder="What's this for?"
                  {...field}
                />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="flex min-w-[175px] items-center justify-center rounded-md bg-primary-gradient px-4 font-semibold text-foreground-light"
          >
            {isLoading ? "Initiating transfer..." : "Transfer Funds"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TransferForm;
