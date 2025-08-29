// ============================================================================
// Admin API Service
// ============================================================================

import type {
  Login,
  UserCreate,
  UserUpdate,
  AdminPermission,
  AdminPermissionManage,
  ToggleVerification,
  AdminLoginResponse,
  VerificationResponse,
  PaginatedResponse,
  User
} from '../../types/admin'

import { useApi } from '~/utils/api'

export const adminApi = {
  /**
   * Admin login
   */
  async login(credentials: Login): Promise<AdminLoginResponse> {
    const api = useApi()
    return await api.post('admin/login/', credentials)
  },

  /**
   * Register new admin user (super_admin only)
   */
  async register(adminData: UserCreate): Promise<{ user: User; message: string }> {
    const api = useApi()
    return await api.post('admin/register/', adminData)
  },

  /**
   * Get all users (admin only)
   */
  async getUsers(params?: { page?: number; page_size?: number; search?: string; role?: string; is_verified?: boolean; is_active?: boolean }): Promise<PaginatedResponse<User>> {
    const api = useApi()
    return await api.get('admin/users/', { params })
  },

  /**
   * Create a new user (admin only)
   */
  async createUser(userData: UserCreate): Promise<UserCreate> {
    const api = useApi()
    return await api.post('admin/users/', userData)
  },

  /**
   * Get user by ID (admin only)
   */
  async getUser(id: number): Promise<User> {
    const api = useApi()
    return await api.get(`admin/users/${id}/`)
  },

  /**
   * Update user by ID (admin only)
   */
  async updateUser(id: number, userData: UserUpdate): Promise<UserUpdate> {
    const api = useApi()
    return await api.put(`admin/users/${id}/`, userData)
  },

  /**
   * Partially update user by ID (admin only)
   */
  async partialUpdateUser(id: number, userData: UserUpdate): Promise<UserUpdate> {
    const api = useApi()
    return await api.patch(`admin/users/${id}/`, userData)
  },

  /**
   * Delete user by ID (admin only)
   */
  async deleteUser(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`admin/users/${id}/`)
  },

  /**
   * Update admin profile information
   */
  async updateAdminProfile(id: number, profileData: UserUpdate): Promise<User> {
    const api = useApi()
    return await api.put(`admin/users/${id}/profile/`, profileData)
  },

  /**
   * Toggle user verification status
   */
  async toggleVerification(id: number, verificationData: ToggleVerification): Promise<VerificationResponse> {
    const api = useApi()
    return await api.post(`admin/users/${id}/toggle-verification/`, verificationData)
  },

  /**
   * Get all admin permissions
   */
  async getPermissions(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<AdminPermission>> {
    const api = useApi()
    return await api.get('admin/permissions/', { params })
  },

  /**
   * Create new admin permission
   */
  async createPermission(permissionData: AdminPermissionManage): Promise<AdminPermission> {
    const api = useApi()
    return await api.post('admin/permissions/', permissionData)
  },

  /**
   * Get admin permission details
   */
  async getPermission(id: string): Promise<AdminPermission> {
    const api = useApi()
    return await api.get(`admin/permissions/${id}/`)
  },

  /**
   * Update admin permission
   */
  async updatePermission(id: string, permissionData: AdminPermissionManage): Promise<AdminPermission> {
    const api = useApi()
    return await api.put(`admin/permissions/${id}/`, permissionData)
  },

  /**
   * Partially update admin permission
   */
  async partialUpdatePermission(id: string, permissionData: AdminPermissionManage): Promise<AdminPermission> {
    const api = useApi()
    return await api.patch(`admin/permissions/${id}/`, permissionData)
  },

  /**
   * Delete admin permission
   */
  async deletePermission(id: string): Promise<void> {
    const api = useApi()
    return await api.delete(`admin/permissions/${id}/`)
  },

  /**
   * Get all permissions for specific admin
   */
  async getPermissionsByAdmin(adminId: string, params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<AdminPermission>> {
    const api = useApi()
    return await api.get(`admin/permissions/by-admin/${adminId}/`, { params })
  },

  /**
   * Update user permissions
   */
  async updateUserPermissions(userId: number, data: { permissions: number[] }): Promise<any> {
    const api = useApi()
    return await api.patch(`admin/users/${userId}/permissions/`, data)
  }
}