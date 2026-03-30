import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { authApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'
import { addNotification } from '@/store/notificationSlice'
import { getErrorMessage } from '@/lib/utils'
import type { RegisterRequest } from '../types'

/**
 * Smart hook for registration.
 * - Calls authApi.register (API layer)
 * - On success: persists token, dispatches to Redux (auto-login), shows toast
 */
export function useRegister() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      const { user, token } = response.data
      localStorage.setItem('accessToken', token)
      dispatch(setCredentials({ user, token }))
      dispatch(addNotification({ type: 'success', title: `Welcome, ${user.name}! Đăng ký thành công.` }))
    },
    onError: (error) => {
      dispatch(addNotification({ type: 'error', title: 'Registration failed', message: getErrorMessage(error) }))
    },
  })
}
