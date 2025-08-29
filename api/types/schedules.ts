// ============================================================================
// Schedules Types
// ============================================================================

export interface Schedule {
  id: number
  user: number
  day_of_week: number
  start_time: string
  end_time: string
  is_available: boolean
  created_at: string
  updated_at: string
}

export interface ScheduleCreate {
  user: number
  day_of_week: number
  start_time: string
  end_time: string
  is_available?: boolean
}

export interface ScheduleUpdate {
  user?: number
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