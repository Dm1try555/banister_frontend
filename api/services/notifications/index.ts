// ============================================================================
// Notifications API Service
// ============================================================================

import type {
  Notification,
  NotificationCreate,
  NotificationUpdate,
  PaginatedResponse
} from '../../types/notifications'

import { useApi } from '~/utils/api'

export const notificationsApi = {
  /**
   * Get all notifications
   */
  async getNotifications(params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<Notification>> {
    const api = useApi()
    return await api.get('notifications/', { params })
  },

  /**
   * Create a new notification
   */
  async createNotification(notificationData: NotificationCreate): Promise<NotificationCreate> {
    const api = useApi()
    return await api.post('notifications/', notificationData)
  },

  /**
   * Get notification by ID
   */
  async getNotification(id: number): Promise<Notification> {
    const api = useApi()
    return await api.get(`notifications/${id}/`)
  },

  /**
   * Update notification by ID
   */
  async updateNotification(id: number, notificationData: NotificationUpdate): Promise<NotificationUpdate> {
    const api = useApi()
    return await api.put(`notifications/${id}/`, notificationData)
  },

  /**
   * Partially update notification by ID
   */
  async partialUpdateNotification(id: number, notificationData: NotificationUpdate): Promise<NotificationUpdate> {
    const api = useApi()
    return await api.patch(`notifications/${id}/`, notificationData)
  },

  /**
   * Delete notification by ID
   */
  async deleteNotification(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`notifications/${id}/`)
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: number): Promise<Notification> {
    const api = useApi()
    return await api.patch(`notifications/${id}/mark-read/`)
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead(): Promise<any> {
    const api = useApi()
    return await api.patch('notifications/mark-all-read/')
  },

  /**
   * Delete all notifications
   */
  async deleteAll(): Promise<any> {
    const api = useApi()
    return await api.delete('notifications/delete-all/')
  },

  /**
   * Get unread notifications count
   */
  async getUnreadCount(): Promise<{ count: number }> {
    const api = useApi()
    return await api.get('notifications/unread-count/')
  }
}