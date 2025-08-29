// ============================================================================
// Dashboards Types
// ============================================================================

export interface CustomerDashboard {
  id: number
  user: number
  total_bookings: number
  completed_bookings: number
  pending_bookings: number
  total_spent: string
  favorite_services: any[]
  recent_bookings: any[]
  created_at: string
  updated_at: string
}

export interface CustomerDashboardUpdate {
  total_bookings?: number
  completed_bookings?: number
  pending_bookings?: number
  total_spent?: string
  favorite_services?: any[]
  recent_bookings?: any[]
}

export interface ProviderDashboard {
  id: number
  user: number
  total_services: number
  active_services: number
  total_bookings: number
  completed_bookings: number
  total_earnings: string
  pending_earnings: string
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export interface ProviderDashboardUpdate {
  total_services?: number
  active_services?: number
  total_bookings?: number
  completed_bookings?: number
  total_earnings?: string
  pending_earnings?: string
  rating?: number
  reviews_count?: number
}

export interface ManagementDashboard {
  id: number
  user: number
  total_customers: number
  total_providers: number
  total_bookings: number
  total_revenue: string
  pending_issues: number
  resolved_issues: number
  created_at: string
  updated_at: string
}

export interface ManagementDashboardUpdate {
  total_customers?: number
  total_providers?: number
  total_bookings?: number
  total_revenue?: string
  pending_issues?: number
  resolved_issues?: number
}