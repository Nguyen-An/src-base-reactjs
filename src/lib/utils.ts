import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely (shadcn pattern) */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract a user-friendly error message from any thrown value */
export function getErrorMessage(error: unknown): string {
  if (error !== null && typeof error === 'object' && 'response' in error) {
    const axiosLike = error as { response?: { data?: { message?: string } }; message?: string }
    return axiosLike.response?.data?.message ?? axiosLike.message ?? 'An error occurred'
  }
  if (error instanceof Error) return error.message
  return 'An error occurred'
}
