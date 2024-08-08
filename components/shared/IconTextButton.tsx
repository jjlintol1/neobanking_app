import React from "react";
import { Button } from "../ui/button";
import { RiExchangeDollarLine } from "@remixicon/react";

interface IconTextButtonProps {
  variant: "primary" | "secondary";
  text: string;
}

const IconTextButton = ({ variant, text }: IconTextButtonProps) => {
  return (
    <Button className="flex items-center justify-center gap-3 border-none bg-card-light font-bold text-cardForeground-light shadow-md transition-colors hover:bg-accent-light hover:text-accentForeground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring-light disabled:pointer-events-none disabled:opacity-50 dark:border-none dark:bg-card-dark dark:text-foreground-dark dark:hover:bg-accent-dark">
      <RiExchangeDollarLine size={24} className="dark:text-primary-light" />
      <p>{text}</p>
    </Button>
  );
};

export default IconTextButton;
