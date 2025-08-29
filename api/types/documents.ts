// ============================================================================
// Documents Types
// ============================================================================

export interface Document {
  id: number
  title: string
  description?: string
  file: string
  file_type: string
  file_size: number
  user: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface DocumentCreate {
  title: string
  description?: string
  file: File
  is_public?: boolean
}

export interface DocumentUpdate {
  title?: string
  description?: string
  file?: File
  is_public?: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}