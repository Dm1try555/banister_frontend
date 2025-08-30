// ============================================================================
// API Endpoints - Organized API calls based on Django backend
// ============================================================================

import { useApi } from './api'

const api = useApi()

// Authentication endpoints
export const authEndpoints = {
  // Registration and login (unified endpoints)
  register: (data: any) => api.post('/auth/register/', data),
  login: (data: any) => api.post('/auth/login/', data),
  
  // Token management
  refreshToken: (data: any) => api.post('/auth/refresh/', data),
  
  // Profile management
  getProfile: () => api.get('/auth/profile/'),
  updateProfile: (data: any) => api.patch('/auth/profile/', data),
  deleteProfile: () => api.delete('/auth/profile/delete/'),
  
  // Email verification
  sendVerificationEmail: (data: any) => api.post('/auth/send-verification/', data),
  verifyEmail: (data: any) => api.post('/auth/verify-email/', data),
  
  // Password reset
  requestPasswordReset: (data: any) => api.post('/auth/password-reset-request/', data),
  confirmPasswordReset: (data: any) => api.post('/auth/password-reset-confirm/', data),
  
  // Profile photo upload
  uploadPhoto: (data: FormData) => api.post('/auth/upload-photo/', data),
  
  // FCM Token management
  registerFCMToken: (data: any) => api.post('/auth/fcm-token/register/', data),
  unregisterFCMToken: (data: any) => api.post('/auth/fcm-token/unregister/', data),
  getFCMTokens: () => api.get('/auth/fcm-token/list/'),
  
  // Logout
  logout: () => api.post('/auth/logout/'),
}

// Admin endpoints
export const adminEndpoints = {
  // Admin authentication
  adminLogin: (data: any) => api.post('/admin/login/', data),
  adminRegister: (data: any) => api.post('/admin/register/', data),
  
  // User management
  getUsers: (params?: any) => api.get('/admin/users/', { params }),
  createUser: (data: any) => api.post('/admin/users/', data),
  getUser: (id: number) => api.get(`/admin/users/${id}/`),
  updateUser: (id: number, data: any) => api.patch(`/admin/users/${id}/`, data),
  deleteUser: (id: number) => api.delete(`/admin/users/${id}/`),
  
  // Permission management
  getPermissions: () => api.get('/admin/permissions/'),
  createPermission: (data: any) => api.post('/admin/permissions/', data),
  getPermission: (id: number) => api.get(`/admin/permissions/${id}/`),
  updatePermission: (id: number, data: any) => api.patch(`/admin/permissions/${id}/`, data),
  deletePermission: (id: number) => api.delete(`/admin/permissions/${id}/`),
  getPermissionsByAdmin: (adminId: number) => api.get(`/admin/permissions/by-admin/${adminId}/`),
}

// Service endpoints
export const serviceEndpoints = {
  getServices: (params?: any) => api.get('/services/', { params }),
  createService: (data: any) => api.post('/services/', data),
  getService: (id: number) => api.get(`/services/${id}/`),
  updateService: (id: number, data: any) => api.patch(`/services/${id}/`, data),
  deleteService: (id: number) => api.delete(`/services/${id}/`),
  
  // Schedules
  getSchedules: (params?: any) => api.get('/schedules/', { params }),
  createSchedule: (data: any) => api.post('/schedules/', data),
  getSchedule: (id: number) => api.get(`/schedules/${id}/`),
  updateSchedule: (id: number, data: any) => api.patch(`/schedules/${id}/`, data),
  deleteSchedule: (id: number) => api.delete(`/schedules/${id}/`),
}

// Booking endpoints
export const bookingEndpoints = {
  getBookings: (params?: any) => api.get('/bookings/', { params }),
  createBooking: (data: any) => api.post('/bookings/', data),
  getBooking: (id: number) => api.get(`/bookings/${id}/`),
  updateBooking: (id: number, data: any) => api.patch(`/bookings/${id}/`, data),
  deleteBooking: (id: number) => api.delete(`/bookings/${id}/`),
}

// Payment endpoints
export const paymentEndpoints = {
  getPayments: (params?: any) => api.get('/payments/', { params }),
  createPayment: (data: any) => api.post('/payments/', data),
  getPayment: (id: number) => api.get(`/payments/${id}/`),
  updatePayment: (id: number, data: any) => api.patch(`/payments/${id}/`, data),
  deletePayment: (id: number) => api.delete(`/payments/${id}/`),
  
  // Payment processing
  confirmPayment: (data: any) => api.post('/payments/confirm/', data),
  transferPayment: (data: any) => api.post('/payments/transfer/', data),
  getClientSecret: (data: any) => api.post('/payments/client-secret/', data),
  
  // Stripe integration
  createStripeAccount: (data: any) => api.post('/stripe/account/create/', data),
}

// Withdrawal endpoints
export const withdrawalEndpoints = {
  getWithdrawals: (params?: any) => api.get('/withdrawals/', { params }),
  createWithdrawal: (data: any) => api.post('/withdrawals/', data),
  getWithdrawal: (id: number) => api.get(`/withdrawals/${id}/`),
  updateWithdrawal: (id: number, data: any) => api.patch(`/withdrawals/${id}/`, data),
  deleteWithdrawal: (id: number) => api.delete(`/withdrawals/${id}/`),
  
  // Withdrawal processing
  approveWithdrawal: (id: number) => api.post(`/withdrawals/${id}/approve/`),
  rejectWithdrawal: (id: number) => api.post(`/withdrawals/${id}/reject/`),
}

// Notification endpoints
export const notificationEndpoints = {
  getNotifications: (params?: any) => api.get('/notifications/', { params }),
  createNotification: (data: any) => api.post('/notifications/', data),
  getNotification: (id: number) => api.get(`/notifications/${id}/`),
  updateNotification: (id: number, data: any) => api.patch(`/notifications/${id}/`, data),
  deleteNotification: (id: number) => api.delete(`/notifications/${id}/`),
  
  // Notification actions
  markAsRead: (id: number) => api.post(`/notifications/${id}/mark-read/`),
  markAllAsRead: () => api.post('/notifications/mark-all-read/'),
  deleteAll: () => api.post('/notifications/delete-all/'),
  getUnreadCount: () => api.get('/notifications/unread-count/'),
}

// Chat endpoints
export const chatEndpoints = {
  // Chat rooms
  getChatRooms: (params?: any) => api.get('/chat/rooms/', { params }),
  createChatRoom: (data: any) => api.post('/chat/rooms/', data),
  getChatRoom: (id: number) => api.get(`/chat/rooms/${id}/`),
  updateChatRoom: (id: number, data: any) => api.patch(`/chat/rooms/${id}/`, data),
  deleteChatRoom: (id: number) => api.delete(`/chat/rooms/${id}/`),
  
  // Messages
  getMessages: (params?: any) => api.get('/chat/messages/', { params }),
  createMessage: (data: any) => api.post('/chat/messages/', data),
  getMessage: (id: number) => api.get(`/chat/messages/${id}/`),
  updateMessage: (id: number, data: any) => api.patch(`/chat/messages/${id}/`, data),
  deleteMessage: (id: number) => api.delete(`/chat/messages/${id}/`),
  
  // Messages by room
  getMessagesByRoom: (roomId: number, params?: any) => api.get(`/chat/rooms/${roomId}/messages/`, { params }),
}

// Dashboard endpoints
export const dashboardEndpoints = {
  getCustomerDashboard: () => api.get('/customer-dashboard/'),
  getProviderDashboard: () => api.get('/provider-dashboard/'),
  getManagementDashboard: () => api.get('/management-dashboard/'),
}

// Document endpoints
export const documentEndpoints = {
  getDocuments: (params?: any) => api.get('/documents/', { params }),
  createDocument: (data: any) => api.post('/documents/', data),
  getDocument: (id: number) => api.get(`/documents/${id}/`),
  updateDocument: (id: number, data: any) => api.patch(`/documents/${id}/`, data),
  deleteDocument: (id: number) => api.delete(`/documents/${id}/`),
}

// Interview endpoints
export const interviewEndpoints = {
  getInterviews: (params?: any) => api.get('/interviews/', { params }),
  createInterview: (data: any) => api.post('/interviews/', data),
  getInterview: (id: number) => api.get(`/interviews/${id}/`),
  updateInterview: (id: number, data: any) => api.patch(`/interviews/${id}/`, data),
  deleteInterview: (id: number) => api.delete(`/interviews/${id}/`),
  
  // Interview requests
  getInterviewRequests: (params?: any) => api.get('/interview-requests/', { params }),
  createInterviewRequest: (data: any) => api.post('/interview-requests/', data),
  getInterviewRequest: (id: number) => api.get(`/interview-requests/${id}/`),
  updateInterviewRequest: (id: number, data: any) => api.patch(`/interview-requests/${id}/`, data),
  deleteInterviewRequest: (id: number) => api.delete(`/interview-requests/${id}/`),
  
  // Test Google Meet
  testGoogleMeet: () => api.get('/test-google-meet/'),
}