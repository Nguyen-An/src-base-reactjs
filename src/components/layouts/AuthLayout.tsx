import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

/** Centered card layout for unauthenticated pages (Login, Register) */
export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
