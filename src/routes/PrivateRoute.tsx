import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { MainLayout } from '@/components/layouts/MainLayout'

/**
 * Guards all children behind authentication.
 * - Unauthenticated → redirect /login
 * - Authenticated   → render inside MainLayout with Outlet
 */
export function PrivateRoute() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  )
}
