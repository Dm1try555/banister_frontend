// ============================================================================
// Authentication Types
// ============================================================================

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
  confirm_password: string
}

export interface SendVerificationEmail {
  email: string
}

export interface VerifyEmail {
  email: string
  code: string
}

export interface ProfilePhotoUpload {
  profile_photo: File
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
  profile_photo?: File
}

export interface LoginResponse {
  access: string
  refresh: string
  user: User
}

export interface RefreshResponse {
  access: string
  refresh: string
}

export interface MessageResponse {
  message: string
}

export interface PhotoUploadResponse {
  profile_photo_url: string
  message: string
}