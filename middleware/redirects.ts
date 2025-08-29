// ============================================================================
// Redirect Middleware
// ============================================================================

export default defineNuxtRouteMiddleware((to) => {
  // Customer dashboard redirect
  if (to.path === '/customer') {
    return navigateTo('/customer/calendar')
  }
  
  // Management dashboard redirect  
  if (to.path === '/management') {
    return navigateTo('/management/all-customers')
  }
})