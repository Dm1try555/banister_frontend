// ============================================================================
// Notifications API Composable
// ============================================================================

import { notificationsApi } from '~/api/services/notifications'
import type { 
  Notification, 
  NotificationCreate, 
  NotificationUpdate,
  PaginatedResponse
} from '~/api/types/notifications'
import { useBaseApi } from './useBaseApi'

export function useNotificationsApi() {
  const baseApi = useBaseApi<Notification>()

  /**
   * Get all notifications
   */
  const getNotifications = async (params?: { page?: number; page_size?: number }): Promise<PaginatedResponse<Notification>> => {
    return await baseApi.executeApiCall(
      () => notificationsApi.getNotifications(params),
      'Get Notifications'
    ) as PaginatedResponse<Notification>
  }

  /**
   * Create a new notification
   */
  const createNotification = async (notificationData: NotificationCreate): Promise<NotificationCreate | null> => {
    return await baseApi.createItem(
      notificationsApi.createNotification,
      notificationData,
      'Create Notification'
    )
  }

  /**
   * Get notification by ID
   */
  const getNotification = async (id: number): Promise<Notification | null> => {
    return await baseApi.getItem(
      notificationsApi.getNotification,
      id,
      'Get Notification'
    )
  }

  /**
   * Update notification by ID
   */
  const updateNotification = async (id: number, notificationData: NotificationUpdate): Promise<NotificationUpdate | null> => {
    return await baseApi.updateItem(
      notificationsApi.updateNotification,
      id,
      notificationData,
      'Update Notification'
    )
  }

  /**
   * Partially update notification by ID
   */
  const partialUpdateNotification = async (id: number, notificationData: NotificationUpdate): Promise<NotificationUpdate | null> => {
    return await baseApi.updateItem(
      notificationsApi.partialUpdateNotification,
      id,
      notificationData,
      'Partial Update Notification'
    )
  }

  /**
   * Delete notification by ID
   */
  const deleteNotification = async (id: number): Promise<void> => {
    await baseApi.deleteItem(
      notificationsApi.deleteNotification,
      id,
      'Delete Notification'
    )
  }

  /**
   * Mark notification as read
   */
  const markAsRead = async (id: number): Promise<Notification | null> => {
    return await baseApi.executeApiCall(
      () => notificationsApi.markAsRead(id),
      'Mark Notification as Read'
    ) as Notification
  }

  /**
   * Mark all notifications as read
   */
  const markAllAsRead = async (): Promise<any> => {
    return await baseApi.executeApiCall(
      () => notificationsApi.markAllAsRead(),
      'Mark All Notifications as Read'
    )
  }

  /**
   * Delete all notifications
   */
  const deleteAll = async (): Promise<any> => {
    return await baseApi.executeApiCall(
      () => notificationsApi.deleteAll(),
      'Delete All Notifications'
    )
  }

  /**
   * Get unread notifications count
   */
  const getUnreadCount = async (): Promise<{ count: number } | null> => {
    return await baseApi.executeApiCall(
      () => notificationsApi.getUnreadCount(),
      'Get Unread Count'
    ) as { count: number }
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    notifications: baseApi.data,
    
    // Methods
    getNotifications,
    createNotification,
    getNotification,
    updateNotification,
    partialUpdateNotification,
    deleteNotification,
    markAsRead,
    markAllAsRead,
    deleteAll,
    getUnreadCount,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}