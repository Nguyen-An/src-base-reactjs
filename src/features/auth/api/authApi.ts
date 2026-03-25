import axiosInstance from '@/lib/axios'
import type { ApiResponse } from '@/types/api'
import type { LoginRequest, RegisterRequest, AuthLoginData } from '../types'

/**
 * Auth API layer — raw HTTP calls only, no state logic here.
 * Hooks in /hooks/ are responsible for state side-effects.
 */
export const authApi = {
  login: async (data: LoginRequest): Promise<ApiResponse<AuthLoginData>> => {
    const res = await axiosInstance.post<ApiResponse<AuthLoginData>>('/api/auth/login', data)
    return res.data
  },

  register: async (data: RegisterRequest): Promise<ApiResponse<AuthLoginData>> => {
    const res = await axiosInstance.post<ApiResponse<AuthLoginData>>('/api/auth/register', data)
    return res.data
  },
}
