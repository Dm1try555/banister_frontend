// ============================================================================
// Authentication API Composable
// ============================================================================

import { ref, computed } from 'vue'
import { authEndpoints } from '~/utils/apiEndpoints'
import type { 
  Login, 
  UserCreate, 
  UserUpdate, 
  LoginResponse, 
  User,
  PasswordResetRequest,
  PasswordResetConfirm,
  SendVerificationEmail,
  VerifyEmail,
  ProfilePhotoUpload
} from '~/api/types/auth'
import { useErrorHandler } from './useErrorHandler'
import { useStorage } from './useStorage'

export function useAuthApi() {
  const { handleApiError } = useErrorHandler()
  const { saveTokens, clearTokens, saveUserRole } = useStorage()
  
  const loading = ref(false)
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Login user
   */
  const login = async (credentials: Login): Promise<LoginResponse | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.login(credentials)
      
      // Save tokens and user data
      saveTokens(response.access, response.refresh)
      saveUserRole(response.user.role || 'customer')
      user.value = response.user
      
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Login')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Register new user
   */
  const register = async (userData: UserCreate): Promise<{ user: User; message: string } | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.register(userData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Registration')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Logout user
   */
  const logout = async (): Promise<void> => {
    loading.value = true
    try {
      clearTokens()
      user.value = null
    } catch (error) {
      const errorMessage = handleApiError(error, 'Logout')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get user profile
   */
  const getProfile = async (): Promise<User | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.getProfile()
      user.value = response
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Profile')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update user profile
   */
  const updateProfile = async (userData: UserUpdate): Promise<UserUpdate | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.updateProfile(userData)
      // Refresh user data
      await getProfile()
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update Profile')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Partially update user profile
   */
  const partialUpdateProfile = async (userData: UserUpdate): Promise<UserUpdate | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.updateProfile(userData)
      // Refresh user data
      await getProfile()
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update Profile')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete user profile
   */
  const deleteProfile = async (): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.deleteProfile()
      await logout()
    } catch (error) {
      const errorMessage = handleApiError(error, 'Delete Profile')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Request password reset
   */
  const requestPasswordReset = async (data: PasswordResetRequest): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.requestPasswordReset(data)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Password Reset Request')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Confirm password reset
   */
  const confirmPasswordReset = async (data: PasswordResetConfirm): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.confirmPasswordReset(data)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Password Reset Confirm')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Send verification email
   */
  const sendVerificationEmail = async (data: SendVerificationEmail): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.sendVerificationEmail(data)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Send Verification Email')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Verify email
   */
  const verifyEmail = async (data: VerifyEmail): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.verifyEmail(data)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Verify Email')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload profile photo
   */
  const uploadPhoto = async (data: FormData): Promise<string | null> => {
    loading.value = true
    try {
      const response = await authEndpoints.uploadPhoto(data)
      // Refresh user data to get updated photo
      await getProfile()
      return response.profile_photo_url
    } catch (error) {
      const errorMessage = handleApiError(error, 'Upload Photo')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Register FCM token
   */
  const registerFCMToken = async (tokenData: { token: string; device_type: string }): Promise<any> => {
    loading.value = true
    try {
      const response = await authEndpoints.registerFCMToken(tokenData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Register FCM Token')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Unregister FCM token
   */
  const unregisterFCMToken = async (tokenData: { token: string }): Promise<any> => {
    loading.value = true
    try {
      const response = await authEndpoints.unregisterFCMToken(tokenData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Unregister FCM Token')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Resend confirmation email
   */
  const resendConfirmationEmail = async (email: string): Promise<void> => {
    loading.value = true
    try {
      await authEndpoints.sendVerificationEmail({ email })
    } catch (error) {
      const errorMessage = handleApiError(error, 'Resend Confirmation Email')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    loading: readonly(loading),
    user: readonly(user),
    isAuthenticated,
    
    // Methods
    login,
    register,
    logout,
    getProfile,
    updateProfile,
    partialUpdateProfile,
    deleteProfile,
    requestPasswordReset,
    confirmPasswordReset,
    sendVerificationEmail,
    verifyEmail,
    uploadPhoto,
    registerFCMToken,
    unregisterFCMToken,
    
    // Email confirmation methods
    resendConfirmationEmail
  }
}