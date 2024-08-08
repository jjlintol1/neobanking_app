interface SidebarLink {
  title: string;
  route: string;
  icon: string;
}

export const sidebarLinks: SidebarLink[] = [
  {
    title: "Dashboard",
    route: "/",
    icon: "/assets/icons/home-line.svg",
  },
  // {
  //   title: "Analytics",
  //   route: "/accounts",
  //   icon: "/assets/icons/bank.svg",
  // },
  {
    title: "Transactions",
    route: "/transactions",
    icon: "/assets/icons/receipt.svg",
  },
  {
    title: "Transfer",
    route: "/payment",
    icon: "/assets/icons/exchange.svg",
  },
  // {
  //   title: "Crypto",
  //   route: "/cryptocurrency",
  //   icon: "/assets/icons/bitcoin.svg",
  // },
  // {
  //   title: "Add Account",
  //   route: "/add-account",
  //   icon: "/assets/icons/wallet.svg",
  // },
];

export const incomeTransactionTypes = [1, 2];

export const transferTransactionTypes = [3, 4];

export const formLogoClasses = "size-[24px] dark:text-foreground-dark";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];
