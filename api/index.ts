// ============================================================================
// API - Main Export
// ============================================================================

// Export all types
export * from './types'

// Export all services
export * from './services'

// Re-export commonly used types for convenience
export type {
  User,
  UserCreate,
  UserUpdate,
  Login,
  LoginResponse,
  Refresh,
  RefreshResponse,
  Booking,
  BookingCreate,
  BookingUpdate,
  Service,
  ServiceCreate,
  ServiceUpdate,
  Payment,
  PaymentCreate,
  PaymentUpdate,
  Notification,
  NotificationCreate,
  NotificationUpdate,
  PaginatedResponse,
  ApiError
} from './types'