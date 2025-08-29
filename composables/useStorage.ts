/**
 * Centralized storage management composable
 * Handles localStorage operations with SSR safety
 */
export const useStorage = () => {
  // Check if we're in browser environment
  const isClient = typeof window !== 'undefined'

  const setItem = (key: string, value: string) => {
    if (isClient) {
      localStorage.setItem(key, value)
    }
  }

  const getItem = (key: string): string | null => {
    if (isClient) {
      return localStorage.getItem(key)
    }
    return null
  }

  const removeItem = (key: string) => {
    if (isClient) {
      localStorage.removeItem(key)
    }
  }

  const clear = () => {
    if (isClient) {
      localStorage.clear()
    }
  }

  // Token management
  const saveTokens = (access: string, refresh: string) => {
    setItem('access_token', access)
    setItem('refresh_token', refresh)
  }

  const getTokens = () => {
    return {
      access: getItem('access_token'),
      refresh: getItem('refresh_token')
    }
  }

  const clearTokens = () => {
    removeItem('access_token')
    removeItem('refresh_token')
    removeItem('user_role')
    removeItem('user_email')
  }

  const isAuthenticated = () => {
    return !!getItem('access_token')
  }

  // User role management
  const saveUserRole = (role: string) => {
    setItem('user_role', role)
  }

  const getUserRole = () => {
    return getItem('user_role')
  }

  // Email verification management
  const setEmailVerified = (verified: boolean = true) => {
    setItem('email_verified', verified.toString())
  }

  const isEmailVerified = () => {
    return getItem('email_verified') === 'true'
  }

  const setBannerDismissed = (dismissed: boolean = true) => {
    setItem('emailBannerDismissed', dismissed.toString())
  }

  const isBannerDismissed = () => {
    return getItem('emailBannerDismissed') === 'true'
  }

  return {
    setItem,
    getItem,
    removeItem,
    clear,
    saveTokens,
    getTokens,
    clearTokens,
    isAuthenticated,
    saveUserRole,
    getUserRole,
    setEmailVerified,
    isEmailVerified,
    setBannerDismissed,
    isBannerDismissed
  }
}