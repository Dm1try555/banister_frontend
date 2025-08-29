// ============================================================================
// Interviews Types
// ============================================================================

export interface Interview {
  id: number
  user: number
  interviewer: number
  scheduled_date: string
  scheduled_time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  rating?: number
  feedback?: string
  created_at: string
  updated_at: string
}

export interface InterviewCreate {
  user: number
  interviewer: number
  scheduled_date: string
  scheduled_time: string
  notes?: string
}

export interface InterviewUpdate {
  user?: number
  interviewer?: number
  scheduled_date?: string
  scheduled_time?: string
  status?: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
  rating?: number
  feedback?: string
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}