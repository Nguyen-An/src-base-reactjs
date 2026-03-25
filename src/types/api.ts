/**
 * Generic API response shapes.
 * Adjust these interfaces to match your actual backend response format.
 */

/** Single-resource response: { success, message, data: T } */
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

/** Shape of `data` inside a paginated response */
export interface PaginatedData<T> {
  elements: T[]
  pagination: PaginationMeta
}

/** Paginated list response: { success, message, data: { elements, pagination } } */
export interface PaginatedResponse<T> {
  success: boolean
  message: string
  data: PaginatedData<T>
}

export interface PaginationMeta {
  page: number
  size: number
  totalPage: number
  totalRecord: number
}

export interface PaginationParams {
  page?: number
  size?: number
}
