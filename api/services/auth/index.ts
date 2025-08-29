// ============================================================================
// Authentication API Service
// ============================================================================

import type {
  Login,
  Refresh,
  PasswordResetRequest,
  PasswordResetConfirm,
  SendVerificationEmail,
  VerifyEmail,
  ProfilePhotoUpload,
  User,
  UserCreate,
  UserUpdate,
  LoginResponse,
  RefreshResponse,
  MessageResponse,
  PhotoUploadResponse
} from '../../types/auth'

import { useApi } from '~/utils/api'

export const authApi = {
  /**
   * Login user with username/email and password
   */
  async login(data: Login): Promise<LoginResponse> {
    const api = useApi()
    return await api.post('auth/login/', data)
  },

  /**
   * Register a new user
   */
  async register(data: UserCreate): Promise<{ user: User; message: string }> {
    const api = useApi()
    return await api.post('auth/register/', data)
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(data: Refresh): Promise<RefreshResponse> {
    const api = useApi()
    return await api.post('auth/refresh/', data)
  },

  /**
   * Get user profile information
   */
  async getProfile(): Promise<User> {
    const api = useApi()
    return await api.get('auth/profile/')
  },

  /**
   * Update user profile
   */
  async updateProfile(data: UserUpdate): Promise<UserUpdate> {
    const api = useApi()
    return await api.put('auth/profile/', data)
  },

  /**
   * Partially update user profile
   */
  async partialUpdateProfile(data: UserUpdate): Promise<UserUpdate> {
    const api = useApi()
    return await api.patch('auth/profile/', data)
  },

  /**
   * Delete user profile (only own profile)
   */
  async deleteProfile(): Promise<MessageResponse> {
    const api = useApi()
    return await api.delete('auth/profile/delete/')
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(data: PasswordResetRequest): Promise<MessageResponse> {
    const api = useApi()
    return await api.post('auth/password-reset-request/', data)
  },

  /**
   * Confirm password reset with code
   */
  async confirmPasswordReset(data: PasswordResetConfirm): Promise<MessageResponse> {
    const api = useApi()
    return await api.post('auth/password-reset-confirm/', data)
  },

  /**
   * Send verification email to user
   */
  async sendVerificationEmail(data: SendVerificationEmail): Promise<MessageResponse> {
    const api = useApi()
    return await api.post('auth/send-verification/', data)
  },

  /**
   * Verify user email with code
   */
  async verifyEmail(data: VerifyEmail): Promise<MessageResponse> {
    const api = useApi()
    return await api.post('auth/verify-email/', data)
  },

  /**
   * Upload user profile photo
   */
  async uploadPhoto(data: ProfilePhotoUpload): Promise<PhotoUploadResponse> {
    const api = useApi()
    return await api.post('auth/upload-photo/', data)
  },

  /**
   * Register FCM token
   */
  async registerFCMToken(tokenData: { token: string; device_type: string }): Promise<any> {
    const api = useApi()
    return await api.post('auth/fcm-token/register/', tokenData)
  },

  /**
   * Unregister FCM token
   */
  async unregisterFCMToken(tokenData: { token: string }): Promise<any> {
    const api = useApi()
    return await api.post('auth/fcm-token/unregister/', tokenData)
  },

  /**
   * Get FCM tokens list
   */
  async getFCMTokens(): Promise<any> {
    const api = useApi()
    return await api.get('auth/fcm-token/list/')
  },

  /**
   * Resend confirmation email
   */
  async resendConfirmationEmail(email: string): Promise<any> {
    const api = useApi()
    return await api.post('auth/resend-confirmation/', { email })
  }
}