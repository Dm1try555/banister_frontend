// ============================================================================
// API Types - Generated from Swagger/OpenAPI Definition
// ============================================================================

// ============================================================================
// Base Types
// ============================================================================

export type UserRole = 'super_admin' | 'admin' | 'hr' | 'supervisor' | 'customer' | 'service_provider'
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed'
export type PaymentStatus = 'pending' | 'completed' | 'failed'
export type WithdrawalStatus = 'pending' | 'completed' | 'rejected'
export type InterviewStatus = 'pending' | 'scheduled' | 'rejected' | 'completed'
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6
export type CalendarViewType = 'day' | 'week' | 'month'
export type VerificationType = 'email' | 'provider'

// ============================================================================
// User & Authentication Types
// ============================================================================

export interface User {
  id?: number
  username: string
  email: string
  first_name?: string
  last_name?: string
  role?: UserRole
  phone_number?: string
  location?: string
  profile_photo?: string
  email_verified?: boolean
  firebase_token?: string
  stripe_account_id?: string
  provider_verified?: boolean
  provider_rating?: string
  provider_hourly_rate?: string
  created_at?: string
  updated_at?: string
}

export interface UserCreate {
  username: string
  email: string
  first_name?: string
  last_name?: string
  password: string
  password_confirm: string
  role?: UserRole
  phone_number?: string
  location?: string
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  phone_number?: string
  location?: string
}

export interface AdminUserCreate {
  username: string
  email: string
  first_name?: string
  last_name?: string
  password: string
  password_confirm: string
  role?: UserRole
  phone_number?: string
  location?: string
}

export interface AdminProfileUpdate {
  first_name?: string
  last_name?: string
}

export interface Login {
  username_or_email: string
  password: string
}

export interface Refresh {
  refresh: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  email: string
  code: string
  new_password: string
  new_password_confirm: string
}

export interface SendVerificationEmail {
  email: string
}

export interface VerifyEmail {
  email: string
  code: string
}

export interface ProfilePhotoUpload {
  photo?: string
}

export interface ToggleVerification {
  type: VerificationType
}

// ============================================================================
// Admin Permission Types
// ============================================================================

export interface AdminPermission {
  id?: number
  permission_name: string
  can_access?: boolean
  created_at?: string
  updated_at?: string
  admin: number
}

export interface AdminPermissionManage {
  admin_id: number
  permission_name: string
  can_access: boolean
}

// ============================================================================
// Booking Types
// ============================================================================

export interface Booking {
  id?: number
  customer: number
  service: number
  provider: number
  location?: string
  preferred_date?: string
  preferred_time?: string
  scheduled_datetime?: string
  status?: BookingStatus
  notes?: string
  total_price?: string
  created_at?: string
}

export interface BookingCreate {
  service: number
  preferred_date?: string
  preferred_time?: string
  notes?: string
}

export interface BookingUpdate {
  status?: BookingStatus
  scheduled_datetime?: string
  notes?: string
  total_price?: string
}

// ============================================================================
// Chat Types
// ============================================================================

export interface Message {
  id?: number
  content: string
  sender_username?: string
  created_at?: string
  updated_at?: string
  is_deleted?: boolean
}

export interface MessageCreate {
  content: string
  room: number
}

export interface MessageUpdate {
  content: string
}

export interface ChatRoom {
  id?: number
  name: string
  participants_count?: number
  is_private?: boolean
  created_at?: string
  last_message?: string
}

export interface ChatRoomCreate {
  name: string
  is_private?: boolean
}

export interface ChatRoomUpdate {
  name: string
  is_private?: boolean
}

// ============================================================================
// Document Types
// ============================================================================

export interface Document {
  id?: number
  title: string
  description?: string
  file?: string
  file_path?: string
  file_type?: string
  file_size?: string
  file_extension?: string
  uploaded_by?: number
  created_at?: string
}

export interface DocumentCreate {
  title: string
  description?: string
  file?: string
}

export interface DocumentUpdate {
  title: string
  description?: string
}

// ============================================================================
// Interview Types
// ============================================================================

export interface Interview {
  id?: number
  customer: number
  provider?: number
  service: number
  preferred_date: string
  preferred_time: string
  scheduled_datetime?: string
  status?: InterviewStatus
  notes?: string
  admin_notes?: string
  google_calendar_event_id?: string
  created_at?: string
}

export interface InterviewCreate {
  preferred_date: string
  preferred_time: string
  notes?: string
  customer: number
  service: number
}

export interface InterviewUpdate {
  status?: InterviewStatus
  scheduled_datetime?: string
  admin_notes?: string
}

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id?: number
  user: number
  notification_type: string
  data?: Record<string, any>
  is_read?: boolean
  created_at?: string
}

export interface NotificationCreate {
  notification_type: string
  data?: Record<string, any>
}

export interface NotificationUpdate {
  is_read?: boolean
}

// ============================================================================
// Payment Types
// ============================================================================

export interface Payment {
  id?: number
  booking: number
  customer?: number
  provider?: number
  service?: string
  amount: string
  currency?: string
  status?: PaymentStatus
  stripe_payment_intent_id?: string
  stripe_transfer_id?: string
  created_at?: string
  completed_at?: string
}

export interface PaymentCreate {
  id?: number
  booking: number
  amount: string
  currency?: string
  status?: PaymentStatus
  stripe_payment_intent_id?: string
  service_title?: string
  created_at?: string
}

export interface PaymentUpdate {
  status?: PaymentStatus
  stripe_payment_intent_id?: string
}

export interface PaymentConfirm {
  payment_intent_id: string
}

export interface PaymentTransfer {
  provider_stripe_account: string
}

// ============================================================================
// Schedule Types
// ============================================================================

export interface Schedule {
  id?: number
  service: number
  service_title?: string
  provider?: string
  provider_name?: string
  service_provider_name?: string
  day_of_week: DayOfWeek
  day_of_week_display?: string
  start_time: string
  end_time: string
  is_available?: boolean
  created_at?: string
}

export interface ScheduleCreate {
  service: number
  day_of_week: DayOfWeek
  start_time: string
  end_time: string
  is_available?: boolean
}

export interface ScheduleUpdate {
  day_of_week: DayOfWeek
  start_time: string
  end_time: string
  is_available?: boolean
}

// ============================================================================
// Service Types
// ============================================================================

export interface Service {
  id?: number
  title: string
  description: string
  price: string
  provider?: string
  provider_name?: string
  created_at?: string
}

export interface ServiceCreate {
  title: string
  description: string
  price: string
}

export interface ServiceUpdate {
  title: string
  description: string
  price: string
}

// ============================================================================
// Withdrawal Types
// ============================================================================

export interface Withdrawal {
  id?: number
  user: number
  amount: string
  currency?: string
  status?: WithdrawalStatus
  stripe_transfer_id?: string
  reason?: string
  created_at?: string
  completed_at?: string
}

export interface WithdrawalCreate {
  amount: string
  currency?: string
}

export interface WithdrawalUpdate {
  status?: WithdrawalStatus
  stripe_transfer_id?: string
  completed_at?: string
  reason?: string
}

export interface WithdrawalApprove {
  // Empty interface for approval
}

export interface WithdrawalReject {
  reason?: string
}

// ============================================================================
// Dashboard Types
// ============================================================================

export interface CustomerDashboard {
  id?: number
  user: number
  preferred_services?: number[]
  booking_history_count?: number
  total_spent?: number
  favorite_providers?: number[]
  notification_preferences?: Record<string, any>
  created_at?: string
  updated_at?: string
}

export interface CustomerDashboardUpdate {
  id?: number
  calendar_view_type?: CalendarViewType
  email_notifications?: boolean
  sms_notifications?: boolean
  vacation_mode?: boolean
  vacation_start?: string
  vacation_end?: string
  created_at?: string
  updated_at?: string
  user: number
}

export interface ProviderDashboard {
  id?: number
  user: number
  calendar_view_type?: string
  working_hours_start?: string
  working_hours_end?: string
  commission_rate?: number
  email_notifications?: boolean
  sms_notifications?: boolean
  vacation_mode?: boolean
  vacation_start?: string
  vacation_end?: string
  total_earnings?: number
  total_bookings?: number
  average_rating?: number
  created_at?: string
  updated_at?: string
}

export interface ProviderDashboardUpdate {
  calendar_view_type?: CalendarViewType
  working_hours_start?: string
  working_hours_end?: string
  commission_rate?: string
  email_notifications?: boolean
  sms_notifications?: boolean
  vacation_mode?: boolean
  vacation_start?: string
  vacation_end?: string
}

export interface ManagementDashboard {
  id?: number
  user: number
  total_customers_managed?: number
  total_issues_resolved?: number
  total_issues_pending?: number
  total_revenue_managed?: number
  total_providers_managed?: number
  system_health_status?: string
  last_maintenance_date?: string
  created_at?: string
  updated_at?: string
}

export interface ManagementDashboardUpdate {
  total_customers_managed?: number
  total_issues_resolved?: number
  total_issues_pending?: number
}

// ============================================================================
// API Response Types
// ============================================================================

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}

export interface ApiError {
  statusCode: number
  errorCode: number
  exceptionType: string
  message: string
  error: string
  timestamp: string
  endpoint: string
  method: string
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

export interface AdminLoginResponse {
  user: User
  access: string
  refresh: string
}

export interface RefreshResponse {
  access: string
}

export interface MessageResponse {
  message: string
}

export interface PhotoUploadResponse {
  message: string
  profile_photo_url: string
}

export interface VerificationResponse {
  status: string
  verified: boolean
}

export interface PaymentConfirmResponse {
  status: string
  message: string
  payment_id: number
}

export interface PaymentTransferResponse {
  status: string
  message: string
  transfer_id: string
}

export interface WithdrawalActionResponse {
  status: string
  message: string
  withdrawal_id: number
}

// ============================================================================
// Query Parameters
// ============================================================================

export interface PaginationParams {
  page?: number
}

export interface ServiceSearchParams extends PaginationParams {
  search?: string
  ordering?: string
}

// ============================================================================
// Export all types
// ============================================================================

export * from './auth'
export * from './admin'
export * from './bookings'
export * from './chat'
export * from './documents'
export * from './interviews'
export * from './notifications'
export * from './payments'
export * from './schedules'
export * from './services'
export * from './withdrawals'
export * from './dashboards'