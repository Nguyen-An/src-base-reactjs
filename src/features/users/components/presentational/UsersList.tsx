import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { User } from '../../types'
import type { PaginationMeta } from '@/types/api'

interface UsersListProps {
  users: User[]
  isLoading: boolean
  isDeleting: boolean
  pagination?: PaginationMeta
  currentPage: number
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
}

/**
 * PRESENTATIONAL component — renders the users table.
 * No hooks, no direct API calls. Pure render from props.
 */
export function UsersList({
  users,
  isLoading,
  isDeleting,
  pagination,
  currentPage,
  onPageChange,
  onDelete,
}: UsersListProps) {
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Loading users...
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Users</h2>
        <Button asChild size="sm">
          <Link to="/users/new">+ Add User</Link>
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gmail</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.gmail}</TableCell>
                  <TableCell className="text-muted-foreground">{user.phonenumber}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/users/${user.id}`}>View</Link>
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        onClick={() => onDelete(user.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {currentPage} of {pagination.totalPage} — {pagination.totalRecord} total users
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= pagination.totalPage}
              onClick={() => onPageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
