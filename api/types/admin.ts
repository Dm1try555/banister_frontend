// ============================================================================
// Admin Types
// ============================================================================

export interface Login {
  username_or_email: string
  password: string
}

export interface AdminUserCreate {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
  role: 'admin' | 'super_admin' | 'hr' | 'supervisor'
}

export interface AdminProfileUpdate {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
}

export interface AdminPermission {
  id: string
  name: string
  codename: string
  content_type: string
  description?: string
}

export interface AdminPermissionManage {
  name: string
  codename: string
  content_type: string
  description?: string
}

export interface ToggleVerification {
  is_verified: boolean
}

export interface User {
  id: number
  username: string
  email: string
  first_name: string
  last_name: string
  phone_number?: string
  role: 'customer' | 'service_provider' | 'management' | 'admin' | 'super_admin' | 'hr' | 'supervisor'
  is_active: boolean
  is_verified: boolean
  date_joined: string
  last_login?: string
  profile_photo?: string
}

export interface UserCreate {
  username: string
  email: string
  first_name: string
  last_name: string
  password: string
  password_confirm: string
  phone_number?: string
  role: 'customer' | 'service_provider' | 'management' | 'admin' | 'super_admin' | 'hr' | 'supervisor'
}

export interface UserUpdate {
  first_name?: string
  last_name?: string
  email?: string
  phone_number?: string
  password?: string
  password_confirm?: string
  role?: 'customer' | 'service_provider' | 'management' | 'admin' | 'super_admin' | 'hr' | 'supervisor'
  is_active?: boolean
  is_verified?: boolean
}

export interface AdminLoginResponse {
  access: string
  refresh: string
  user: User
}

export interface VerificationResponse {
  message: string
  is_verified: boolean
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}