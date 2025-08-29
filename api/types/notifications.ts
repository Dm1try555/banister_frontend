// ============================================================================
// Notifications Types
// ============================================================================

export interface Notification {
  id: number
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  user: number
  created_at: string
  updated_at: string
}

export interface NotificationCreate {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  user: number
}

export interface NotificationUpdate {
  title?: string
  message?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  is_read?: boolean
  user?: number
}