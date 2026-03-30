import { useAppSelector } from '@/hooks/useAppSelector'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { logout } from '../store/authSlice'
import { clearNotifications } from '@/store/notificationSlice'

/**
 * Convenience hook: exposes current auth state + logout action.
 *
 * Logout dispatch sequence (cross-slice example):
 *  1. logout()             → xóa auth state + localStorage
 *  2. clearNotifications() → xóa toàn bộ toast queue
 */
export function useAuth() {
  const dispatch = useAppDispatch()
  const { user, isAuthenticated, token } = useAppSelector((state) => state.auth)

  return {
    user,
    isAuthenticated,
    token,
    logout: () => {
      dispatch(logout())
      dispatch(clearNotifications())
    },
  }
}
