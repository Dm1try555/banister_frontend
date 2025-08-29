// ============================================================================
// Admin Middleware
// ============================================================================

export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  if (process.client) {
    const accessToken = localStorage.getItem('access_token')
    if (!accessToken) {
      return navigateTo('/admin/login')
    }
  }

  // Get user role from localStorage
  const userRole = process.client ? localStorage.getItem('user_role') : null
  
  // Check if user has admin role
  const adminRoles = ['admin', 'super_admin', 'hr', 'supervisor']
  if (!userRole || !adminRoles.includes(userRole)) {
    return navigateTo('/admin/login')
  }
})