// ============================================================================
// Bookings Types
// ============================================================================

export interface Booking {
  id: number
  customer: number
  service: number
  provider: number
  location?: string
  preferred_date?: string
  preferred_time?: string
  scheduled_datetime?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  total_price?: number
  created_at: string
}

export interface BookingCreate {
  customer: number
  service: number
  provider: number
  location?: string
  preferred_date?: string
  preferred_time?: string
  scheduled_datetime?: string
  notes?: string
}

export interface BookingUpdate {
  location?: string
  preferred_date?: string
  preferred_time?: string
  scheduled_datetime?: string
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  total_price?: number
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}