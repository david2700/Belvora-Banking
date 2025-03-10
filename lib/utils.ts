import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmount(amount: number) {
  return new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  }).format(amount)
}
