import axiosInstance from '@/lib/axios'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'
import type { User, CreateUserRequest, UpdateUserRequest } from '../types'

/** Users API layer — pure HTTP, no React/Redux logic */
export const usersApi = {
  getAll: async (params: PaginationParams): Promise<PaginatedResponse<User>> => {
    const res = await axiosInstance.get<PaginatedResponse<User>>('/api/users', { params })
    return res.data
  },

  getById: async (id: string): Promise<ApiResponse<User>> => {
    const res = await axiosInstance.get<ApiResponse<User>>(`/api/users/${id}`)
    return res.data
  },

  create: async (data: CreateUserRequest): Promise<ApiResponse<User>> => {
    const res = await axiosInstance.post<ApiResponse<User>>('/api/users', data)
    return res.data
  },

  update: async (id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    const res = await axiosInstance.put<ApiResponse<User>>(`/api/users/${id}`, data)
    return res.data
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(`/api/users/${id}`)
    return res.data
  },
}
