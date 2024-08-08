"use client";

import { useTheme } from "@/context/ThemeProvider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Image from "next/image";
import { themes } from "@/constants";

const Theme = () => {
  const { mode, setMode } = useTheme();
  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger>
          {mode === "light" ? (
            <Image
              src="/assets/icons/sun.svg"
              alt="sun"
              width={20}
              height={20}
              className="dark:invert"
            />
          ) : (
            <Image
              src="/assets/icons/moon.svg"
              alt="moon"
              width={20}
              height={20}
              className="dark:invert"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded-md border-none py-2 card">
          {themes.map((item) => (
            <MenubarItem
              key={item.value}
              className="flex cursor-pointer items-center gap-4 px-2.5 py-2"
              onClick={() => {
                setMode(item.value)
                if (item.value !== 'system') {
                    localStorage.theme = item.value;
                } else {
                    localStorage.removeItem('theme');
                }
              }}
            >
              <Image
                src={item.icon}
                alt={item.value}
                width={16}
                height={16}
                className={`dark:invert`}
              />
              <p
                className={`body-semibold text-light-500 ${
                  mode === item.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                }`}
              >
                {item.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;