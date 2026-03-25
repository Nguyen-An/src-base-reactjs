import { useState } from 'react'
import { useBlogs, useDeleteBlog } from '../../hooks/useBlogs'
import { BlogsList } from '../presentational/BlogsList'
import { getErrorMessage } from '@/lib/utils'

/**
 * CONTAINER (smart) component — owns blogs list logic.
 * - Fetches blogs via useBlogs (React Query)
 * - Handles pagination state
 * - Delegates delete to useDeleteBlog
 * - Passes clean props down to BlogsList
 */
export function BlogsContainer() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError, error } = useBlogs({ page, size: 10 })
  const { mutate: deleteBlog, isPending: isDeleting } = useDeleteBlog()

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/50 p-6 text-center text-destructive">
        Failed to load blogs: {getErrorMessage(error)}
      </div>
    )
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this post? This action cannot be undone.')) {
      deleteBlog(id)
    }
  }

  return (
    <BlogsList
      blogs={data?.data.elements ?? []}
      isLoading={isLoading}
      isDeleting={isDeleting}
      pagination={data?.data.pagination}
      currentPage={page}
      onPageChange={setPage}
      onDelete={handleDelete}
    />
  )
}
