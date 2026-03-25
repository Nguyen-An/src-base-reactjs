import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { Blog } from '../../types'
import type { PaginationMeta } from '@/types/api'

interface BlogsListProps {
  blogs: Blog[]
  isLoading: boolean
  isDeleting: boolean
  pagination?: PaginationMeta
  currentPage: number
  onPageChange: (page: number) => void
  onDelete: (id: string) => void
}

/**
 * PRESENTATIONAL component — renders the blogs grid.
 * No hooks, no direct API calls. Pure render from props.
 */
export function BlogsList({
  blogs,
  isLoading,
  isDeleting,
  pagination,
  currentPage,
  onPageChange,
  onDelete,
}: BlogsListProps) {
  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-muted-foreground">
        Loading posts...
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Button asChild size="sm">
          <Link to="/blogs/new">+ New Post</Link>
        </Button>
      </div>

      {/* Grid */}
      {blogs.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No blog posts yet</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <Card key={blog.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="line-clamp-2 text-base">{blog.title}</CardTitle>
                {blog.author && (
                  <p className="text-xs text-muted-foreground">by {blog.author.name}</p>
                )}
              </CardHeader>
              <CardContent className="flex-1">
                <p className="line-clamp-3 text-sm text-muted-foreground">{blog.content}</p>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/blogs/${blog.id}`}>View</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                    onClick={() => onDelete(blog.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Page {currentPage} of {pagination.totalPage} — {pagination.totalRecord} total posts
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
