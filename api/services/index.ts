// ============================================================================
// API Services - Main Export
// ============================================================================

// Export all API services
export { authApi } from './auth'
export { adminApi } from './admin'
export { bookingsApi } from './bookings'
export { chatApi } from './chat'
export { documentsApi } from './documents'
export { interviewsApi } from './interviews'
export { notificationsApi } from './notifications'
export { paymentsApi } from './payments'
export { schedulesApi } from './schedules'
export { servicesApi } from './services'
export { withdrawalsApi } from './withdrawals'
export { dashboardsApi } from './dashboards'

// Combined API object for easy access
export const api = {
  auth: () => import('./auth').then(m => m.authApi),
  admin: () => import('./admin').then(m => m.adminApi),
  bookings: () => import('./bookings').then(m => m.bookingsApi),
  chat: () => import('./chat').then(m => m.chatApi),
  documents: () => import('./documents').then(m => m.documentsApi),
  interviews: () => import('./interviews').then(m => m.interviewsApi),
  notifications: () => import('./notifications').then(m => m.notificationsApi),
  payments: () => import('./payments').then(m => m.paymentsApi),
  schedules: () => import('./schedules').then(m => m.schedulesApi),
  services: () => import('./services').then(m => m.servicesApi),
  withdrawals: () => import('./withdrawals').then(m => m.withdrawalsApi),
  dashboards: () => import('./dashboards').then(m => m.dashboardsApi)
}