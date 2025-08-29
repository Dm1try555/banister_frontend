// ============================================================================
// Access Control Middleware
// ============================================================================

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  if (process.client) {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      return navigateTo('/admin/login')
    }
  }

  // Get user role and permissions
  const userRole = process.client ? localStorage.getItem('user_role') : null
  const userPermissions = process.client ? JSON.parse(localStorage.getItem('user_permissions') || '[]') : []
  
  if (!userRole) {
    return navigateTo('/admin/login')
  }

  // Define required permissions for each route
  const routePermissions: Record<string, string[]> = {
    '/admin/users': ['users.view', 'users.manage'],
    '/admin/users/create': ['users.create'],
    '/admin/users/edit': ['users.edit'],
    '/admin/users/delete': ['users.delete'],
    '/admin/services': ['services.view', 'services.manage'],
    '/admin/services/create': ['services.create'],
    '/admin/services/edit': ['services.edit'],
    '/admin/services/delete': ['services.delete'],
    '/admin/bookings': ['bookings.view', 'bookings.manage'],
    '/admin/bookings/edit': ['bookings.edit'],
    '/admin/payments': ['payments.view', 'payments.manage'],
    '/admin/withdrawals': ['withdrawals.view', 'withdrawals.manage'],
    '/admin/notifications': ['notifications.view', 'notifications.manage'],
    '/admin/documents': ['documents.view', 'documents.manage'],
    '/admin/chat': ['chat.view', 'chat.manage'],
    '/admin/settings': ['settings.view', 'settings.manage'],
    '/admin/admins': ['admins.view', 'admins.manage'],
    '/admin/admins/create': ['admins.create'],
    '/admin/admins/edit': ['admins.edit'],
    '/admin/admins/delete': ['admins.delete'],
    '/admin/permissions': ['permissions.view', 'permissions.manage']
  }

  // Super admin has access to everything
  if (userRole === 'super_admin') {
    return
  }

  // Check if route requires specific permissions
  const requiredPermissions = routePermissions[to.path]
  if (requiredPermissions) {
    const hasPermission = requiredPermissions.some(permission => 
      userPermissions.includes(permission)
    )
    
    if (!hasPermission) {
      // Redirect to access denied page or admin dashboard
      return navigateTo('/admin/access-denied')
    }
  }
})