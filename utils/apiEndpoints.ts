import { useApi } from './api'

// Types based on Swagger definitions
export interface User {
  id?: number
  email: string
  phone?: string
  role?: 'customer' | 'provider' | 'management'
  profile: Profile
}

export interface Profile {
  first_name: string
  last_name: string
  avatar_url?: string
  bio?: string
}

export interface Service {
  id?: number
  provider?: User
  provider_id: number
  title: string
  description: string
  price: string
  created_at?: string
}

export interface Booking {
  id?: number
  customer?: User
  provider?: User
  provider_id: number
  service?: Service
  service_id: number
  date: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  created_at?: string
}

export interface DashboardStats {
  user?: User
  total_bookings?: number
  total_earnings?: string
}

export interface Document {
  id?: number
  user?: number
  file?: string
  uploaded_at?: string
}

export interface Message {
  id?: number
  chat: number
  sender?: User
  text: string
  timestamp?: string
}

export interface Chat {
  id?: number
  type: 'private' | 'group'
  created_at?: string
  participants?: User[]
  message?: Message[]
}

export interface Payment {
  id?: number
  user?: User
  amount: string
  status: 'pending' | 'completed' | 'failed'
  created_at?: string
}

export interface Provider {
  id?: number
  user: User
  verified?: boolean
  rating?: number
}

export interface Schedule {
  id?: number
  provider?: User
  date: string
  start_time: string
  end_time: string
  created_at?: string
}

export interface AdminIssue {
  id?: number
  user?: User
  description: string
  status?: 'open' | 'resolved'
  created_at?: string
}

export interface Withdrawal {
  id?: number
  provider?: User
  amount: string
  status: 'pending' | 'completed' | 'rejected'
  created_at?: string
}

export interface ProfilePhoto {
  id?: string
  user?: User
  file_storage?: any
  is_active?: boolean
  created_at?: string
  updated_at?: string
  photo_url?: string
}

export interface UploadProfilePhoto {
  photo: string
}

export interface TokenRefresh {
  refresh: string
  access?: string
}

// Authentication API
export const authApi = {
  // Email confirmation
  requestEmailConfirmation: async (email: string) => {
    const api = useApi()
    return await api.post('auth/email-confirm/request/', { email })
  },

  verifyEmail: async (token: string) => {
    const api = useApi()
    return await api.get(`auth/email-confirm/verify/?token=${token}`)
  },

  // Login endpoints
  loginCustomer: async (email: string, password: string) => {
    const api = useApi()
    return await api.post('auth/login/customer/', { email, password })
  },

  loginProvider: async (email: string, password: string) => {
    const api = useApi()
    return await api.post('auth/login/provider/', { email, password })
  },

  loginManagement: async (email: string, password: string) => {
    const api = useApi()
    return await api.post('auth/login/management/', { email, password })
  },

  logout: async () => {
    const api = useApi()
    return await api.post('auth/logout/')
  },

  // Profile management
  getProfile: async () => {
    const api = useApi()
    return await api.get('auth/profile/')
  },

  updateProfile: async (data: Partial<User>) => {
    const api = useApi()
    return await api.put('auth/profile/', data)
  },

  patchProfile: async (data: Partial<User>) => {
    const api = useApi()
    return await api.patch('auth/profile/', data)
  },

  deleteProfile: async () => {
    const api = useApi()
    return await api.delete('auth/profile/')
  },

  // Registration
  registerCustomer: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('auth/register/customer/', data)
  },

  registerProvider: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('auth/register/provider/', data)
  },

  registerManagement: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('auth/register/management/', data)
  },

  // Token refresh
  refreshToken: async (refresh: string) => {
    const api = useApi()
    return await api.post('auth/token/refresh/', { refresh })
  }
}

// Services API
export const servicesApi = {
  getServices: async (search?: string, ordering?: string) => {
    const api = useApi()
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    if (ordering) params.append('ordering', ordering)
    const query = params.toString()
    return await api.get(`services/${query ? '?' + query : ''}`)
  },

  getService: async (id: number) => {
    const api = useApi()
    return await api.get(`services/${id}/`)
  },

  createService: async (data: Omit<Service, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('services/', data)
  },

  updateService: async (id: number, data: Partial<Service>) => {
    const api = useApi()
    return await api.put(`services/${id}/`, data)
  },

  patchService: async (id: number, data: Partial<Service>) => {
    const api = useApi()
    return await api.patch(`services/${id}/`, data)
  },

  deleteService: async (id: number) => {
    const api = useApi()
    return await api.delete(`services/${id}/`)
  }
}

// Bookings API
export const bookingsApi = {
  getBookings: async () => {
    const api = useApi()
    return await api.get('bookings/')
  },

  getBooking: async (id: number) => {
    const api = useApi()
    return await api.get(`bookings/${id}/`)
  },

  createBooking: async (data: Omit<Booking, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('bookings/', data)
  },

  updateBooking: async (id: number, data: Partial<Booking>) => {
    const api = useApi()
    return await api.put(`bookings/${id}/`, data)
  },

  patchBooking: async (id: number, data: Partial<Booking>) => {
    const api = useApi()
    return await api.patch(`bookings/${id}/`, data)
  },

  deleteBooking: async (id: number) => {
    const api = useApi()
    return await api.delete(`bookings/${id}/`)
  },

  // Booking status management (providers only)
  updateBookingStatus: async (bookingId: number, status: string) => {
    const api = useApi()
    return await api.post(`bookings/status/${bookingId}/`, { status })
  }
}

// Dashboard API
export const dashboardApi = {
  getOverview: async () => {
    const api = useApi()
    return await api.get('dashboard/overview')
  },

  getStatistics: async () => {
    const api = useApi()
    return await api.get('dashboard/statistics')
  }
}

// Documents API
export const documentsApi = {
  getDocuments: async () => {
    const api = useApi()
    return await api.get('documents/')
  },

  getDocument: async (id: number) => {
    const api = useApi()
    return await api.get(`documents/${id}/`)
  },

  createDocument: async (data: Partial<Document>) => {
    const api = useApi()
    return await api.post('documents/', data)
  },

  updateDocument: async (id: number, data: Partial<Document>) => {
    const api = useApi()
    return await api.put(`documents/${id}/`, data)
  },

  patchDocument: async (id: number, data: Partial<Document>) => {
    const api = useApi()
    return await api.patch(`documents/${id}/`, data)
  },

  deleteDocument: async (id: number) => {
    const api = useApi()
    return await api.delete(`documents/${id}/`)
  }
}

// Messages API
export const messagesApi = {
  getMessages: async () => {
    const api = useApi()
    return await api.get('message/')
  },

  getMessage: async (id: number) => {
    const api = useApi()
    return await api.get(`message/${id}/`)
  },

  createMessage: async (data: Omit<Message, 'id' | 'timestamp'>) => {
    const api = useApi()
    return await api.post('message/', data)
  },

  updateMessage: async (id: number, data: Partial<Message>) => {
    const api = useApi()
    return await api.put(`message/${id}/`, data)
  },

  patchMessage: async (id: number, data: Partial<Message>) => {
    const api = useApi()
    return await api.patch(`message/${id}/`, data)
  },

  deleteMessage: async (id: number) => {
    const api = useApi()
    return await api.delete(`message/${id}/`)
  },

  // Chat management
  getChat: async (id: number) => {
    const api = useApi()
    return await api.get(`message/chat/${id}/`)
  },

  createChat: async (data: Omit<Chat, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('message/chat/', data)
  },

  updateChat: async (id: number, data: Partial<Chat>) => {
    const api = useApi()
    return await api.put(`message/chat/${id}/`, data)
  },

  patchChat: async (id: number, data: Partial<Chat>) => {
    const api = useApi()
    return await api.patch(`message/chat/${id}/`, data)
  },

  deleteChat: async (id: number) => {
    const api = useApi()
    return await api.delete(`message/chat/${id}/`)
  }
}

// Payments API
export const paymentsApi = {
  getPayments: async () => {
    const api = useApi()
    return await api.get('payments/')
  },

  getPayment: async (id: number) => {
    const api = useApi()
    return await api.get(`payments/${id}/`)
  },

  createPayment: async (data: Omit<Payment, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('payments/', data)
  },

  updatePayment: async (id: number, data: Partial<Payment>) => {
    const api = useApi()
    return await api.put(`payments/${id}/`, data)
  },

  patchPayment: async (id: number, data: Partial<Payment>) => {
    const api = useApi()
    return await api.patch(`payments/${id}/`, data)
  },

  deletePayment: async (id: number) => {
    const api = useApi()
    return await api.delete(`payments/${id}/`)
  }
}

// Schedules API
export const schedulesApi = {
  getSchedules: async () => {
    const api = useApi()
    return await api.get('schedules/')
  },

  getSchedule: async (id: string) => {
    const api = useApi()
    return await api.get(`schedules/${id}`)
  },

  createSchedule: async (data: Omit<Schedule, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('schedules/', data)
  },

  updateSchedule: async (id: string, data: Partial<Schedule>) => {
    const api = useApi()
    return await api.put(`schedules/${id}`, data)
  },

  patchSchedule: async (id: string, data: Partial<Schedule>) => {
    const api = useApi()
    return await api.patch(`schedules/${id}`, data)
  },

  deleteSchedule: async (id: string) => {
    const api = useApi()
    return await api.delete(`schedules/${id}`)
  }
}

// Withdrawals API
export const withdrawalsApi = {
  getWithdrawals: async () => {
    const api = useApi()
    return await api.get('withdrawals/')
  },

  createWithdrawal: async (data: Omit<Withdrawal, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('withdrawals/', data)
  },

  updateWithdrawal: async (id: number, data: Partial<Withdrawal>) => {
    const api = useApi()
    return await api.put(`withdrawals/${id}/`, data)
  },

  patchWithdrawal: async (id: number, data: Partial<Withdrawal>) => {
    const api = useApi()
    return await api.patch(`withdrawals/${id}/`, data)
  },

  deleteWithdrawal: async (id: number) => {
    const api = useApi()
    return await api.delete(`withdrawals/${id}/`)
  }
}

// Profile Photos API
export const profilePhotosApi = {
  getProfilePhoto: async () => {
    const api = useApi()
    return await api.get('files/profile-photo/')
  },

  uploadProfilePhoto: async (data: UploadProfilePhoto) => {
    const api = useApi()
    return await api.post('files/profile-photo/upload/', data)
  },

  deleteProfilePhoto: async () => {
    const api = useApi()
    return await api.delete('files/profile-photo/delete/')
  }
}

// Public API (no authentication required)
export const publicApi = {
  getProviders: async () => {
    const api = useApi()
    return await api.get('public/providers')
  },

  getProvider: async (id: number) => {
    const api = useApi()
    return await api.get(`public/providers/${id}`)
  },

  getServices: async () => {
    const api = useApi()
    return await api.get('public/services')
  }
}

// Management API (admin only)
export const managementApi = {
  // User management
  getAllUsers: async () => {
    const api = useApi()
    return await api.get('users/users/')
  },

  getUser: async (id: number) => {
    const api = useApi()
    return await api.get(`users/users/${id}/`)
  },

  createUser: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('users/users/', data)
  },

  updateUser: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.put(`users/users/${id}/`, data)
  },

  patchUser: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.patch(`users/users/${id}/`, data)
  },

  deleteUser: async (id: number) => {
    const api = useApi()
    return await api.delete(`users/users/${id}/`)
  },

  // Customer management
  getCustomers: async () => {
    const api = useApi()
    return await api.get('users/management/customers/')
  },

  createCustomer: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('users/management/customers/', data)
  },

  updateCustomer: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.put(`users/management/customers/${id}/`, data)
  },

  patchCustomer: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.patch(`users/management/customers/${id}/`, data)
  },

  deleteCustomer: async (id: number) => {
    const api = useApi()
    return await api.delete(`users/management/customers/${id}/`)
  },

  // Provider management
  getProviders: async () => {
    const api = useApi()
    return await api.get('users/management/providers/')
  },

  createProvider: async (data: Partial<User>) => {
    const api = useApi()
    return await api.post('users/management/providers/', data)
  },

  updateProvider: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.put(`users/management/providers/${id}/`, data)
  },

  patchProvider: async (id: number, data: Partial<User>) => {
    const api = useApi()
    return await api.patch(`users/management/providers/${id}/`, data)
  },

  deleteProvider: async (id: number) => {
    const api = useApi()
    return await api.delete(`users/management/providers/${id}/`)
  },

  // Issues management
  getIssues: async () => {
    const api = useApi()
    return await api.get('users/issues/')
  },

  getIssue: async (id: number) => {
    const api = useApi()
    return await api.get(`users/issues/${id}/`)
  },

  createIssue: async (data: Omit<AdminIssue, 'id' | 'created_at'>) => {
    const api = useApi()
    return await api.post('users/issues/', data)
  },

  updateIssue: async (id: number, data: Partial<AdminIssue>) => {
    const api = useApi()
    return await api.put(`users/issues/${id}/`, data)
  },

  patchIssue: async (id: number, data: Partial<AdminIssue>) => {
    const api = useApi()
    return await api.patch(`users/issues/${id}/`, data)
  },

  deleteIssue: async (id: number) => {
    const api = useApi()
    return await api.delete(`users/issues/${id}/`)
  }
}

// Utility functions
export const apiUtils = {
  // Save tokens to localStorage
  saveTokens: (access: string, refresh: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
    }
  },

  // Get tokens from localStorage
  getTokens: () => {
    if (typeof window !== 'undefined') {
      return {
        access: localStorage.getItem('access_token'),
        refresh: localStorage.getItem('refresh_token')
      }
    }
    return { access: null, refresh: null }
  },

  // Clear tokens from localStorage
  clearTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token')
    }
    return false
  },

  // Get user role from localStorage
  getUserRole: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('user_role')
    }
    return null
  },

  // Save user role to localStorage
  saveUserRole: (role: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('user_role', role)
    }
  }
} 