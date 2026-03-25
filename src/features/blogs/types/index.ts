export interface Blog {
  id: string
  title: string
  content: string
  authorId: string
  author?: { id: string; name: string }
  createdAt: string
  updatedAt: string
}

export interface CreateBlogRequest {
  title: string
  content: string
}

export interface UpdateBlogRequest {
  title?: string
  content?: string
}
