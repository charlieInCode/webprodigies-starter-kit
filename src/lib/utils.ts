import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function convertDateExcel(excelDate: number) {
    // Get the number of milliseconds from Unix epoch.
    const unixTime = (excelDate - 25569) * 86400 * 1000
    return new Date(unixTime)
}
