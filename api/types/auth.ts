// ============================================================================
// Authentication Types
// ============================================================================

export interface Login {
  email: string
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
  location?: string
  role: 'super_admin' | 'admin' | 'hr' | 'supervisor' | 'customer' | 'service_provider'
  email_verified: boolean
  firebase_token?: string
  stripe_account_id?: string
  provider_verified?: boolean
  provider_rating?: number
  provider_hourly_rate?: number
  created_at: string
  updated_at: string
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
  access_token: string
  refresh_token: string
  user: User
}

export interface FCMTokenRegister {
  token: string
}

export interface FCMTokenUnregister {
  token: string
}

export interface FCMToken {
  id: number
  user: number
  token: string
  created_at: string
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