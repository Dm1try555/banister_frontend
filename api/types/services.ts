// ============================================================================
// Services Types
// ============================================================================

export interface Service {
  id: number
  provider: number
  title: string
  description: string
  price: number
  created_at: string
  updated_at: string
}

export interface ServiceCreate {
  provider: number
  title: string
  description: string
  price: number
}

export interface ServiceUpdate {
  title?: string
  description?: string
  price?: number
}

export interface ServiceSearchParams {
  search?: string
  ordering?: string
  page?: number
  page_size?: number
}

export interface Schedule {
  id: number
  provider: number
  service: number
  day_of_week: number
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleCreate {
  provider: number
  service: number
  day_of_week: number
  start_time: string
  end_time: string
  is_available?: boolean
}

export interface ScheduleUpdate {
  day_of_week?: number
  start_time?: string
  end_time?: string
  is_available?: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}