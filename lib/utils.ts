import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function installCommand(packageName: string): string {
  return `dotnet add package ${packageName}`;
}
