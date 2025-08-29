// ============================================================================
// Services Types
// ============================================================================

export interface Service {
  id: number
  title: string
  description: string
  price: string
  provider: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ServiceCreate {
  title: string
  description: string
  price: string
  provider: number
  is_active?: boolean
}

export interface ServiceUpdate {
  title?: string
  description?: string
  price?: string
  provider?: number
  is_active?: boolean
}

export interface ServiceSearchParams {
  search?: string
  ordering?: string
  page?: number
  page_size?: number
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}