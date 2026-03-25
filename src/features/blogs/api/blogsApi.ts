import axiosInstance from '@/lib/axios'
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api'
import type { Blog, CreateBlogRequest, UpdateBlogRequest } from '../types'

/** Blogs API layer — pure HTTP, no React/Redux logic */
export const blogsApi = {
  getAll: async (params: PaginationParams): Promise<PaginatedResponse<Blog>> => {
    const res = await axiosInstance.get<PaginatedResponse<Blog>>('/api/blogs', { params })
    return res.data
  },

  getById: async (id: string): Promise<ApiResponse<Blog>> => {
    const res = await axiosInstance.get<ApiResponse<Blog>>(`/api/blogs/${id}`)
    return res.data
  },

  create: async (data: CreateBlogRequest): Promise<ApiResponse<Blog>> => {
    const res = await axiosInstance.post<ApiResponse<Blog>>('/api/blogs', data)
    return res.data
  },

  update: async (id: string, data: UpdateBlogRequest): Promise<ApiResponse<Blog>> => {
    const res = await axiosInstance.put<ApiResponse<Blog>>(`/api/blogs/${id}`, data)
    return res.data
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await axiosInstance.delete<ApiResponse<null>>(`/api/blogs/${id}`)
    return res.data
  },
}
