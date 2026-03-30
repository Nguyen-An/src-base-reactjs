import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { authApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'
import { addNotification } from '@/store/notificationSlice'
import { getErrorMessage } from '@/lib/utils'
import type { LoginRequest } from '../types'

/**
 * Smart hook for login.
 * - Calls authApi.login (API layer)
 * - On success: persists token to localStorage, dispatches to Redux, shows toast
 * - On error: dispatches error toast
 *
 * Minh họa: dispatch nhiều action từ nhiều slice khác nhau trong cùng 1 hook
 */
export function useLogin() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      const { user, token } = response.data
      localStorage.setItem('accessToken', token)

      // Dispatch 1: cập nhật auth state
      dispatch(setCredentials({ user, token }))

      // Dispatch 2: hiển thị toast (cross-slice)
      dispatch(addNotification({ type: 'success', title: `Welcome back, ${user.name}!` }))
    },
    onError: (error) => {
      dispatch(addNotification({ type: 'error', title: 'Login failed', message: getErrorMessage(error) }))
    },
  })
}
