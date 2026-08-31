import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function installCommand(packageName: string, options?: { prerelease?: boolean }): string {
  return options?.prerelease
    ? `dotnet add package ${packageName} --prerelease`
    : `dotnet add package ${packageName}`;
}

export function installCommands(packageNames: string[], options?: { prerelease?: boolean }): string {
  return packageNames.map((name) => installCommand(name, options)).join("\n");
}
