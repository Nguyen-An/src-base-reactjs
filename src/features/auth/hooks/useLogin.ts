import { useMutation } from '@tanstack/react-query'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { authApi } from '../api/authApi'
import { setCredentials } from '../store/authSlice'
import type { LoginRequest } from '../types'

/**
 * Smart hook for login.
 * - Calls authApi.login (API layer)
 * - On success: persists token to localStorage and dispatches to Redux
 */
export function useLogin() {
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      console.log("response: ", response);
      const { user, token } = response.data
      console.log("user: ", user);
      console.log("token: ", token);
      localStorage.setItem('accessToken', token)
      dispatch(setCredentials({ user, token }))
    },
  })
}
