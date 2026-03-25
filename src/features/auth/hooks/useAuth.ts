import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout } from '../store/authSlice'

/**
 * Convenience hook: exposes current auth state + logout action.
 * Components should use this instead of reading Redux state directly.
 */
export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth)

  return {
    user,
    isAuthenticated,
    token,
    logout: () => dispatch(logout()),
  }
}
