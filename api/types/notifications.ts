// ============================================================================
// Notifications Types
// ============================================================================

export interface Notification {
  id: number
  user: number
  notification_type: string
  data: Record<string, any>
  is_read: boolean
  created_at: string
}

export interface NotificationCreate {
  user: number
  notification_type: string
  data?: Record<string, any>
}

export interface NotificationUpdate {
  notification_type?: string
  data?: Record<string, any>
  is_read?: boolean
}