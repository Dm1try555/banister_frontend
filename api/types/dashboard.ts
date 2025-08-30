// ============================================================================
// Dashboard Types - Updated for Django Backend
// ============================================================================

export interface DashboardStats {
  total_bookings: number
  total_earnings: string
  user?: any
  pending_bookings?: number
  completed_bookings?: number
  cancelled_bookings?: number
  monthly_earnings?: string
  weekly_earnings?: string
  average_rating?: number
  total_services?: number
  active_services?: number
}