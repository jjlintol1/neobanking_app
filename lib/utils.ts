import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (obj: any) => JSON.parse(JSON.stringify(obj));

export const formatUSD = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

interface FormUrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export function formUrlQuery({ params, key, value }: FormUrlQueryParams) {
  const parsed = queryString.parse(params);
  parsed[key] = value;
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: parsed,
    },
    {
      skipNull: true,
      skipEmptyString: true,
    }
  );
}

interface RemoveKeysFromQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveKeysFromQueryParams) {
  const parsed = queryString.parse(params);
  for (const key of keysToRemove) {
    delete parsed[key];
  }
  return queryString.stringifyUrl(
    {
      url: window.location.pathname,
      query: parsed,
    },
    {
      skipEmptyString: true,
      skipNull: true,
    }
  );
}

export function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatLocalTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours || 12; // The hour '0' should be '12'
  const formattedHours = hours.toString().padStart(2, "0");

  return `${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function convertDateToDateTime(dateString: string) {
  // Create a new Date object from the date string
  const date = new Date(dateString);

  // Ensure the date is valid
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format. Please use YYYY-MM-DD format.");
  }

  // Convert the date to ISO string and truncate to only include the date part
  const isoString = date.toISOString().split("T")[0];

  // Append time part set to midnight and 'Z' to indicate UTC time
  const dateTimeString = `${isoString}T00:00:00.000Z`;

  return dateTimeString;
}

export function formatDateString(inputDate: string): string {
  // Use a regular expression to match the desired date part
  const match = inputDate.match(/^\d{4}-\d{2}-\d{2}/);
  if (!match) {
    throw new Error("Invalid date format");
  }
  return match[0];
}

export function getRandomAvatarColor() {
  const colors = [
    { color: "#FF5733", textColor: "#FFFFFF" }, // Red-Orange with white text
    { color: "#33FF57", textColor: "#000000" }, // Green with black text
    { color: "#3357FF", textColor: "#FFFFFF" }, // Blue with white text
    { color: "#FF33A1", textColor: "#FFFFFF" }, // Pink with white text
    { color: "#FF8C33", textColor: "#000000" }, // Orange with black text
    { color: "#8C33FF", textColor: "#FFFFFF" }, // Purple with white text
    { color: "#33FF8C", textColor: "#000000" }, // Light Green with black text
    { color: "#FF3333", textColor: "#FFFFFF" }, // Red with white text
    { color: "#33FFF5", textColor: "#000000" }, // Cyan with black text
    { color: "#FFF533", textColor: "#000000" }, // Yellow with black text
  ];

  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

export function timeAgo(dateString: string) {
  const inputDate = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor((now.getTime() - inputDate.getTime()) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  } else if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  } else if (days < 7) {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  } else if (weeks < 4) {
    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  } else if (months < 12) {
    return `${months} month${months !== 1 ? "s" : ""} ago`;
  } else {
    return `${years} year${years !== 1 ? "s" : ""} ago`;
  }
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date.toLocaleDateString("en-US", options);
}

export function greetingBasedOnTime() {
  const now = new Date();
  const hours = now.getHours();

  if (hours >= 0 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else if (hours >= 18 && hours < 24) {
    return "evening";
  }
}
