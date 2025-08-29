// ============================================================================
// Admin API Composable
// ============================================================================

import { ref, computed } from 'vue'
import { adminApi } from '~/api/services/admin'
import type { 
  User, 
  UserCreate, 
  UserUpdate,
  AdminPermission,
  AdminPermissionManage,
  ToggleVerification,
  AdminLoginResponse,
  VerificationResponse,
  PaginatedResponse
} from '~/api/types/admin'
import { useErrorHandler } from './useErrorHandler'
import { useStorage } from './useStorage'

export function useAdminApi() {
  const { handleApiError } = useErrorHandler()
  const { saveTokens, clearTokens } = useStorage()
  
  const loading = ref(false)
  const error = ref<string | null>(null)

  /**
   * Admin login
   */
  const adminLogin = async (credentials: { username_or_email: string; password: string }): Promise<AdminLoginResponse | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.login(credentials)
      
      // Save tokens and admin data
      saveTokens(response.access, response.refresh)
      
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Admin Login')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Register new admin user (super_admin only)
   */
  const registerAdmin = async (adminData: UserCreate): Promise<{ user: User; message: string } | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.register(adminData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Admin Registration')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get all users (admin only)
   */
  const getUsers = async (params?: { page?: number; page_size?: number; search?: string; role?: string; is_verified?: boolean; is_active?: boolean }): Promise<PaginatedResponse<User>> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getUsers(params)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Users')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Create a new user (admin only)
   */
  const createUser = async (userData: UserCreate): Promise<UserCreate | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.createUser(userData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Create User')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get user by ID (admin only)
   */
  const getUser = async (id: number): Promise<User | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getUser(id)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get User')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update user by ID (admin only)
   */
  const updateUser = async (id: number, userData: UserUpdate): Promise<UserUpdate | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.updateUser(id, userData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update User')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Partially update user by ID (admin only)
   */
  const partialUpdateUser = async (id: number, userData: UserUpdate): Promise<UserUpdate | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.partialUpdateUser(id, userData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Partial Update User')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete user by ID (admin only)
   */
  const deleteUser = async (id: number): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      await adminApi.deleteUser(id)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Delete User')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get permissions list (simple array)
   */
  const getPermissionsList = async (): Promise<any[]> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getPermissions()
      return response.results || []
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Permissions List')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update user permissions
   */
  const updateUserPermissions = async (id: number, data: { permissions: number[] }): Promise<any> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.updateUserPermissions(id, data)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update User Permissions')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update admin profile information
   */
  const updateAdminProfile = async (id: number, profileData: UserUpdate): Promise<User | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.updateAdminProfile(id, profileData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update Admin Profile')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Toggle user verification status
   */
  const toggleUserVerification = async (id: number, verificationData: ToggleVerification): Promise<VerificationResponse | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.toggleVerification(id, verificationData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Toggle User Verification')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get all admin permissions
   */
  const getPermissions = async (params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<AdminPermission>> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getPermissions(params)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Permissions')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Create new admin permission
   */
  const createPermission = async (permissionData: AdminPermissionManage): Promise<AdminPermission | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.createPermission(permissionData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Create Permission')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get admin permission details
   */
  const getPermission = async (id: string): Promise<AdminPermission | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getPermission(id)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Permission')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Update admin permission
   */
  const updatePermission = async (id: string, permissionData: AdminPermissionManage): Promise<AdminPermission | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.updatePermission(id, permissionData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Update Permission')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Partially update admin permission
   */
  const partialUpdatePermission = async (id: string, permissionData: AdminPermissionManage): Promise<AdminPermission | null> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.partialUpdatePermission(id, permissionData)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Partial Update Permission')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Delete admin permission
   */
  const deletePermission = async (id: string): Promise<void> => {
    loading.value = true
    error.value = null
    try {
      await adminApi.deletePermission(id)
    } catch (error) {
      const errorMessage = handleApiError(error, 'Delete Permission')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get all permissions for specific admin
   */
  const getPermissionsByAdmin = async (adminId: string, params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<AdminPermission>> => {
    loading.value = true
    error.value = null
    try {
      const response = await adminApi.getPermissionsByAdmin(adminId, params)
      return response
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Permissions By Admin')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Get dashboard statistics
   */
  const getDashboardStats = async (): Promise<any> => {
    loading.value = true
    error.value = null
    try {
      // This would be a custom endpoint for dashboard stats
      // For now, we'll return mock data
      return {
        totalUsers: 0,
        totalServices: 0,
        totalBookings: 0,
        totalRevenue: 0
      }
    } catch (error) {
      const errorMessage = handleApiError(error, 'Get Dashboard Stats')
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    
    // Authentication
    adminLogin,
    registerAdmin,
    
    // User Management
    getUsers,
    createUser,
    getUser,
    updateUser,
    partialUpdateUser,
    deleteUser,
    updateAdminProfile,
    toggleUserVerification,
    
    // Permission Management
    getPermissions,
    getPermissionsList,
    updateUserPermissions,
    createPermission,
    getPermission,
    updatePermission,
    partialUpdatePermission,
    deletePermission,
    getPermissionsByAdmin,
    
    // Dashboard
    getDashboardStats
  }
}