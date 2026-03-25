import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { authApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'
import type { RegisterRequest } from '../types'

/**
 * Smart hook for registration.
 * - Calls authApi.register (API layer)
 * - On success: persists token and dispatches to Redux (auto-login)
 */
export function useRegister() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      const { user, token } = response.data
      localStorage.setItem('accessToken', token)
      dispatch(setCredentials({ user, token }))
    },
  })
}
