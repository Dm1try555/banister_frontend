# API Integration Guide

This document explains how to use the comprehensive API integration that has been implemented for the Banister frontend application.

## Overview

The API integration is organized into several layers:

1. **Base API Layer** (`utils/api.ts`) - Core HTTP client with error handling
2. **API Endpoints** (`utils/apiEndpoints.ts`) - Organized API calls by functionality
3. **Composables** (`composables/`) - Reactive state management for different features
4. **Pages/Components** - UI layer that uses the composables

## API Endpoints Structure

All API endpoints are organized by functionality in `utils/apiEndpoints.ts`:

### Authentication API
```typescript
import { authApi } from '~/utils/apiEndpoints'

// Login
await authApi.loginCustomer(email, password)
await authApi.loginProvider(email, password)
await authApi.loginManagement(email, password)

// Registration
await authApi.registerCustomer(userData)
await authApi.registerProvider(userData)
await authApi.registerManagement(userData)

// Profile management
await authApi.getProfile()
await authApi.updateProfile(data)
await authApi.patchProfile(data)

// Email verification
await authApi.requestEmailConfirmation(email)
await authApi.verifyEmail(token)

// Token refresh
await authApi.refreshToken(refreshToken)
```

### Services API
```typescript
import { servicesApi } from '~/utils/apiEndpoints'

// Get services with search and ordering
await servicesApi.getServices(search, ordering)
await servicesApi.getService(id)
await servicesApi.createService(serviceData)
await servicesApi.updateService(id, data)
await servicesApi.patchService(id, data)
await servicesApi.deleteService(id)
```

### Bookings API
```typescript
import { bookingsApi } from '~/utils/apiEndpoints'

await bookingsApi.getBookings()
await bookingsApi.getBooking(id)
await bookingsApi.createBooking(bookingData)
await bookingsApi.updateBooking(id, data)
await bookingsApi.patchBooking(id, data)
await bookingsApi.deleteBooking(id)
await bookingsApi.updateBookingStatus(bookingId, status) // For providers
```

### Dashboard API
```typescript
import { dashboardApi } from '~/utils/apiEndpoints'

await dashboardApi.getOverview()
await dashboardApi.getStatistics()
```

### Messages API
```typescript
import { messagesApi } from '~/utils/apiEndpoints'

await messagesApi.getMessages()
await messagesApi.getMessage(id)
await messagesApi.createMessage(messageData)
await messagesApi.getChat(id)
```

### Payments API
```typescript
import { paymentsApi } from '~/utils/apiEndpoints'

await paymentsApi.getPayments()
await paymentsApi.getPayment(id)
await paymentsApi.createPayment(paymentData)
```

### Documents API
```typescript
import { documentsApi } from '~/utils/apiEndpoints'

await documentsApi.getDocuments()
await documentsApi.getDocument(id)
await documentsApi.createDocument(documentData)
```

### Profile Photos API
```typescript
import { profilePhotosApi } from '~/utils/apiEndpoints'

await profilePhotosApi.getProfilePhoto()
await profilePhotosApi.uploadProfilePhoto(data)
await profilePhotosApi.deleteProfilePhoto()
```

### Public API (No authentication required)
```typescript
import { publicApi } from '~/utils/apiEndpoints'

await publicApi.getProviders()
await publicApi.getProvider(id)
await publicApi.getServices()
```

### Management API (Admin only)
```typescript
import { managementApi } from '~/utils/apiEndpoints'

// User management
await managementApi.getAllUsers()
await managementApi.getUser(id)
await managementApi.createUser(userData)
await managementApi.updateUser(id, data)
await managementApi.deleteUser(id)

// Customer management
await managementApi.getCustomers()
await managementApi.createCustomer(userData)

// Provider management
await managementApi.getProviders()
await managementApi.createProvider(userData)

// Issues management
await managementApi.getIssues()
await managementApi.getIssue(id)
await managementApi.createIssue(issueData)
```

## Using Composables

The composables provide reactive state management and are the recommended way to interact with the API.

### Authentication Composable
```typescript
import { useAuth } from '~/composables/useAuth'

const { 
  user, 
  isAuthenticated, 
  isLoading, 
  error,
  userRole,
  isProvider,
  isCustomer,
  isManagement,
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
} = useAuth()

// Initialize auth state
await initAuth()

// Login
await loginProvider(email, password)

// Check user role
if (isProvider.value) {
  // Provider-specific logic
}
```

### Services Composable
```typescript
import { useServices } from '~/composables/useServices'

const {
  services,
  currentService,
  isLoading,
  error,
  servicesCount,
  activeServices,
  loadServices,
  loadService,
  createService,
  updateService,
  patchService,
  deleteService,
  clearCurrentService,
  clearError
} = useServices()

// Load all services
await loadServices()

// Create a new service
await createService({
  provider_id: 1,
  title: 'House Cleaning',
  description: 'Professional house cleaning service',
  price: '50.00'
})

// Update a service
await updateService(1, { price: '60.00' })
```

### Bookings Composable
```typescript
import { useBookings } from '~/composables/useBookings'

const {
  bookings,
  currentBooking,
  isLoading,
  error,
  bookingsCount,
  pendingBookings,
  confirmedBookings,
  cancelledBookings,
  loadBookings,
  loadBooking,
  createBooking,
  updateBooking,
  patchBooking,
  deleteBooking,
  updateBookingStatus,
  clearCurrentBooking,
  clearError
} = useBookings()

// Load all bookings
await loadBookings()

// Create a new booking
await createBooking({
  provider_id: 1,
  service_id: 1,
  date: '2024-01-15T10:00:00Z'
})

// Update booking status (for providers)
await updateBookingStatus(1, 'confirmed')
```

### Dashboard Composable
```typescript
import { useDashboard } from '~/composables/useDashboard'

const {
  overview,
  statistics,
  isLoading,
  error,
  totalBookings,
  totalEarnings,
  user,
  loadOverview,
  loadStatistics,
  loadDashboard,
  clearDashboard,
  clearError
} = useDashboard()

// Load dashboard data
await loadDashboard()

// Access computed values
console.log('Total earnings:', totalEarnings.value)
console.log('Total bookings:', totalBookings.value)
```

## Example: Provider Dashboard Page

Here's how the provider dashboard page uses the composables:

```vue
<script setup>
import { computed, onMounted } from 'vue'
import { useDashboard } from '~/composables/useDashboard'
import { useBookings } from '~/composables/useBookings'
import { useServices } from '~/composables/useServices'

const { 
  overview, 
  statistics, 
  isLoading: dashboardLoading, 
  error: dashboardError, 
  loadDashboard 
} = useDashboard()

const { 
  bookings, 
  isLoading: bookingsLoading, 
  error: bookingsError, 
  loadBookings 
} = useBookings()

const { 
  services, 
  isLoading: servicesLoading, 
  error: servicesError, 
  loadServices 
} = useServices()

// Computed properties for dashboard data
const dashboardData = computed(() => {
  const stats = overview.value || statistics.value
  const recentBookings = bookings.value.slice(0, 5)
  
  return {
    totalEarnings: parseFloat(stats?.total_earnings || '0'),
    completedOrders: bookings.value.filter(b => b.status === 'confirmed').length,
    pendingOrders: bookings.value.filter(b => b.status === 'pending').length,
    activeServices: services.value.length,
    recentOrders: recentBookings.map(booking => ({
      id: booking.id,
      customerName: booking.customer?.profile?.first_name + ' ' + booking.customer?.profile?.last_name,
      serviceName: booking.service?.title || 'Unknown Service',
      status: booking.status,
      amount: parseFloat(booking.service?.price || '0')
    }))
  }
})

const loading = computed(() => dashboardLoading.value || bookingsLoading.value || servicesLoading.value)
const error = computed(() => dashboardError.value || bookingsError.value || servicesError.value)

onMounted(async () => {
  try {
    // Load all dashboard data in parallel
    await Promise.all([
      loadDashboard(),
      loadBookings(),
      loadServices()
    ])
  } catch (e) {
    console.error('Dashboard loading error:', e)
  }
})
</script>

<template>
  <div v-if="loading" class="text-center py-4">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  
  <div v-else-if="error" class="alert alert-danger">
    {{ error }}
  </div>
  
  <div v-else>
    <!-- Dashboard content using dashboardData -->
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class="card-body text-center">
            <h4>£{{ dashboardData.totalEarnings.toFixed(2) }}</h4>
            <p>Total Earnings</p>
          </div>
        </div>
      </div>
      <!-- More dashboard cards... -->
    </div>
  </div>
</template>
```

## Error Handling

All API calls include comprehensive error handling:

```typescript
try {
  await loadServices()
} catch (error) {
  console.error('Failed to load services:', error)
  // Error is automatically set in the composable
  // You can access it via the error reactive property
}
```

## Authentication Flow

1. **Login**: User logs in with email/password
2. **Token Storage**: Access and refresh tokens are stored in localStorage
3. **API Calls**: All authenticated API calls automatically include the Bearer token
4. **Token Refresh**: When access token expires, refresh token is used automatically
5. **Logout**: Tokens are cleared from localStorage

## Best Practices

1. **Use Composables**: Always use composables instead of direct API calls for better state management
2. **Error Handling**: Always handle errors in try-catch blocks
3. **Loading States**: Use the `isLoading` reactive property to show loading indicators
4. **Reactive Data**: The composables provide reactive data that automatically updates the UI
5. **Type Safety**: All API calls are fully typed with TypeScript interfaces

## Backend Integration

The frontend is now fully integrated with your backend API. When you implement the backend endpoints, the frontend will automatically:

- Display real data from your database
- Handle authentication and authorization
- Manage user sessions
- Provide real-time updates through reactive state
- Handle all CRUD operations for services, bookings, payments, etc.

## Next Steps

1. **Backend Development**: Focus on implementing the backend endpoints according to the Swagger specification
2. **Testing**: Test the API integration with your backend
3. **Features**: Add more features using the existing composables and API structure
4. **Optimization**: Add caching, pagination, and other optimizations as needed

The frontend is now ready to work with your backend once you implement the API endpoints! 