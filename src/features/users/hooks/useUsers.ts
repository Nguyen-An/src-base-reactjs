import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '../api/usersApi'
import { QUERY_KEYS } from '@/services/queryKeys'
import type { PaginationParams } from '@/types/api'
import type { CreateUserRequest, UpdateUserRequest } from '../types'

// ─── Read ────────────────────────────────────────────────────────────────────

export function useUsers(params: PaginationParams = { page: 1, size: 10 }) {
  return useQuery({
    queryKey: QUERY_KEYS.users.list(params),
    queryFn: () => usersApi.getAll(params),
  })
}

export function useUser(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.users.detail(id),
    queryFn: () => usersApi.getById(id),
    enabled: id.length > 0,
  })
}

// ─── Write ───────────────────────────────────────────────────────────────────

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateUserRequest) => usersApi.create(data),
    onSuccess: () => {
      // Invalidate all list queries so the table auto-refreshes
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserRequest }) =>
      usersApi.update(id, data),
    onSuccess: (_res, variables) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.detail(variables.id) })
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => usersApi.delete(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() })
    },
  })
}
