import { Outlet } from 'react-router-dom'
import { AuthLayout } from '@/components/layouts/AuthLayout'

/** Wraps public auth pages (Login, Register) in AuthLayout */
export function AuthRoute() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  )
}
