import type { PaginationParams } from '@/types/api'

/**
 * Centralized React Query key factory.
 *
 * Rules:
 *  - Keys are READ-ONLY tuples → no magic strings scattered in code
 *  - Hierarchy: [entity, scope, ...params]
 *  - Invalidate a whole entity:   queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.all })
 *  - Invalidate just lists:       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.lists() })
 *  - Invalidate one record:       queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.detail(id) })
 */
export const QUERY_KEYS = {
  users: {
    all: ['users'] as const,
    lists: () => ['users', 'list'] as const,
    list: (params: PaginationParams) => ['users', 'list', params] as const,
    details: () => ['users', 'detail'] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
  },

  blogs: {
    all: ['blogs'] as const,
    lists: () => ['blogs', 'list'] as const,
    list: (params: PaginationParams) => ['blogs', 'list', params] as const,
    details: () => ['blogs', 'detail'] as const,
    detail: (id: string) => ['blogs', 'detail', id] as const,
  },
} as const
