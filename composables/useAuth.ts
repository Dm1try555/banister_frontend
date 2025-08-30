import { ref, computed } from 'vue'
import { authEndpoints } from '~/utils/apiEndpoints'
import { useStorage } from './useStorage'
import type { User } from '~/api/types/auth'

export const useAuth = () => {
  const { saveTokens, saveUserRole, getTokens, clearTokens } = useStorage()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const userRole = computed(() => user.value?.role || null)
  const isProvider = computed(() => userRole.value === 'service_provider')
  const isCustomer = computed(() => userRole.value === 'customer')
  const isManagement = computed(() => ['super_admin', 'admin', 'hr', 'supervisor'].includes(userRole.value || ''))

  // Initialize auth state
  const initAuth = async () => {
    const tokens = getTokens()
    if (tokens.access) {
      isAuthenticated.value = true
      await loadUser()
    }
  }

  // Load user profile
  const loadUser = async () => {
    try {
      isLoading.value = true
      error.value = null
      const userData = await authEndpoints.getProfile()
      user.value = userData
      isAuthenticated.value = true
    } catch (err) {
      console.error('Failed to load user:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load user'
      await logout()
    } finally {
      isLoading.value = false
    }
  }

  // Login functions
  const loginCustomer = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.login({ email, password })
      
      saveTokens(response.access_token, response.refresh_token)
      saveUserRole(response.user.role)
      
      isAuthenticated.value = true
      await loadUser()
      
      return response
    } catch (err) {
      console.error('Customer login failed:', err)
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loginProvider = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.login({ email, password })
      
      saveTokens(response.access_token, response.refresh_token)
      saveUserRole(response.user.role)
      
      isAuthenticated.value = true
      await loadUser()
      
      return response
    } catch (err) {
      console.error('Provider login failed:', err)
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const loginManagement = async (email: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.login({ email, password })
      
      saveTokens(response.access_token, response.refresh_token)
      saveUserRole(response.user.role)
      
      isAuthenticated.value = true
      await loadUser()
      
      return response
    } catch (err) {
      console.error('Management login failed:', err)
      error.value = err instanceof Error ? err.message : 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Registration functions
  const registerCustomer = async (userData: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.register(userData)
      return response
    } catch (err) {
      console.error('Customer registration failed:', err)
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const registerProvider = async (userData: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.register(userData)
      return response
    } catch (err) {
      console.error('Provider registration failed:', err)
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const registerManagement = async (userData: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.register(userData)
      return response
    } catch (err) {
      console.error('Management registration failed:', err)
      error.value = err instanceof Error ? err.message : 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Logout
  const logout = async () => {
    try {
      if (isAuthenticated.value) {
        await authEndpoints.logout()
      }
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      // Clear state regardless of API call success
      user.value = null
      isAuthenticated.value = false
      clearTokens()
    }
  }

  // Update profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null
      const updatedUser = await authEndpoints.updateProfile(data)
      user.value = updatedUser
      return updatedUser
    } catch (err) {
      console.error('Profile update failed:', err)
      error.value = err instanceof Error ? err.message : 'Profile update failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Email verification
  const requestEmailConfirmation = async (email: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.sendVerificationEmail({ email })
      return response
    } catch (err) {
      console.error('Email confirmation request failed:', err)
      error.value = err instanceof Error ? err.message : 'Email confirmation request failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const verifyEmail = async (token: string) => {
    try {
      isLoading.value = true
      error.value = null
      const response = await authEndpoints.verifyEmail({ token })
      // Reload user to get updated verification status
      await loadUser()
      return response
    } catch (err) {
      console.error('Email verification failed:', err)
      error.value = err instanceof Error ? err.message : 'Email verification failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Token refresh
  const refreshToken = async () => {
    try {
      const tokens = getTokens()
      if (!tokens.refresh) {
        throw new Error('No refresh token available')
      }

      const response = await authEndpoints.refreshToken({ refresh: tokens.refresh })
      saveTokens(response.access_token, response.refresh_token)
      return response
    } catch (err) {
      console.error('Token refresh failed:', err)
      await logout()
      throw err
    }
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    user: readonly(user),
    isAuthenticated: readonly(isAuthenticated),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    userRole,
    isProvider,
    isCustomer,
    isManagement,
    
    // Methods
    initAuth,
    loadUser,
    loginCustomer,
    loginProvider,
    loginManagement,
    registerCustomer,
    registerProvider,
    registerManagement,
    logout,
    updateProfile,
    requestEmailConfirmation,
    verifyEmail,
    refreshToken,
    clearError
  }
} 