import { useNavigate, useParams } from 'react-router-dom'
import { useUser, useDeleteUser } from '../../hooks/useUsers'
import { UserDetail } from '../presentational/UserDetail'
import { getErrorMessage } from '@/lib/utils'

/**
 * CONTAINER (smart) component — owns user detail logic.
 * - Reads :id from URL params
 * - Fetches user via useUser (React Query)
 * - Handles delete + navigation
 */
export function UserDetailContainer() {
  const { id = '' } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data, isLoading, isError, error } = useUser(id)
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser()

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Loading user...
      </div>
    )
  }

  if (isError || !data?.data) {
    return (
      <div className="rounded-lg border border-destructive/50 p-6 text-center text-destructive">
        {isError ? getErrorMessage(error) : 'User not found'}
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Delete this user? This action cannot be undone.')) {
      deleteUser(id, { onSuccess: () => void navigate('/users') })
    }
  }

  return (
    <UserDetail
      user={data.data}
      isDeleting={isDeleting}
      onDelete={handleDelete}
    />
  )
}
