import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { blogsApi } from '../api/blogsApi'
import { QUERY_KEYS } from '@/services/queryKeys'
import type { PaginationParams } from '@/types/api'
import type { CreateBlogRequest, UpdateBlogRequest } from '../types'

// ─── Read ────────────────────────────────────────────────────────────────────

export function useBlogs(params: PaginationParams = { page: 1, size: 10 }) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.list(params),
    queryFn: () => blogsApi.getAll(params),
  })
}

export function useBlog(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.blogs.detail(id),
    queryFn: () => blogsApi.getById(id),
    enabled: id.length > 0,
  })
}

// ─── Write ───────────────────────────────────────────────────────────────────

export function useCreateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateBlogRequest) => blogsApi.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.lists() })
    },
  })
}

export function useUpdateBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBlogRequest }) =>
      blogsApi.update(id, data),
    onSuccess: (_res, variables) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.detail(variables.id) })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.lists() })
    },
  })
}

export function useDeleteBlog() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => blogsApi.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.blogs.lists() })
    },
  })
}
