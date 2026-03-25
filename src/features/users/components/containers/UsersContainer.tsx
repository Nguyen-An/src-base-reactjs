import { useState } from 'react'
import { useUsers, useDeleteUser } from '../../hooks/useUsers'
import { UsersList } from '../presentational/UsersList'
import { getErrorMessage } from '@/lib/utils'

/**
 * CONTAINER (smart) component — owns users list logic.
 * - Fetches users via useUsers (React Query)
 * - Handles pagination state
 * - Delegates delete to useDeleteUser
 * - Passes clean props down to UsersList
 */
export function UsersContainer() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useUsers({ page, size: 2 })
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 p-6 text-center text-destructive">
        Failed to load users: {getErrorMessage(error)}
      </div>
    )
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this user? This action cannot be undone.')) {
      deleteUser(id)
    }
  }

  return (
    <UsersList
      users={data?.data.elements ?? []}
      isLoading={isLoading}
      isDeleting={isDeleting}
      pagination={data?.data.pagination}
      currentPage={page}
      onPageChange={setPage}
      onDelete={handleDelete}
    />
  )
}
