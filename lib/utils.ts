import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Funkcija 'cn' kombinuje klasu koristeći 'clsx' i spaja stilove koristeći 'twMerge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
