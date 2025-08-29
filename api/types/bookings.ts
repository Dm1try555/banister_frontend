// ============================================================================
// Bookings Types
// ============================================================================

export interface Booking {
  id: number
  service: number
  customer: number
  provider?: number
  preferred_date: string
  preferred_time: string
  scheduled_datetime?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at: string
  updated_at: string
}

export interface BookingCreate {
  service: number
  customer: number
  provider?: number
  preferred_date: string
  preferred_time: string
  scheduled_datetime?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface BookingUpdate {
  service?: number
  customer?: number
  provider?: number
  preferred_date?: string
  preferred_time?: string
  scheduled_datetime?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}