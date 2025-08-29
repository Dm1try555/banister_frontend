export default defineNuxtRouteMiddleware((to, from) => {
  // Check if user is authenticated
  const token = useCookie('access_token')
  
  if (!token.value) {
    return navigateTo('/join/signin')
  }

  // Check if user has admin role
  const userRole = useCookie('user_role')
  const adminRoles = ['super_admin', 'admin', 'hr', 'supervisor']
  
  if (!userRole.value || !adminRoles.includes(userRole.value)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Доступ запрещен. Требуются права администратора.'
    })
  }
})