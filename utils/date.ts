// ============================================================================
// Date Utilities
// ============================================================================

/**
 * Format date string to localized format
 */
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Неизвестно'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  } catch (error) {
    console.error('Error formatting date:', error)
    return 'Неверная дата'
  }
}

/**
 * Format date and time string to localized format
 */
export const formatDateTime = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Неизвестно'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting datetime:', error)
    return 'Неверная дата'
  }
}

/**
 * Format time string to localized format
 */
export const formatTime = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Неизвестно'
  
  try {
    const date = new Date(dateString)
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (error) {
    console.error('Error formatting time:', error)
    return 'Неверное время'
  }
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString: string | null | undefined): string => {
  if (!dateString) return 'Неизвестно'
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'только что'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} мин назад`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ч назад`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} дн назад`
    
    return formatDate(dateString)
  } catch (error) {
    console.error('Error getting relative time:', error)
    return 'Неверная дата'
  }
}

/**
 * Check if date is today
 */
export const isToday = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false
  
  try {
    const date = new Date(dateString)
    const today = new Date()
    return date.toDateString() === today.toDateString()
  } catch (error) {
    console.error('Error checking if date is today:', error)
    return false
  }
}

/**
 * Check if date is in the past
 */
export const isPast = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    return date < now
  } catch (error) {
    console.error('Error checking if date is past:', error)
    return false
  }
}

/**
 * Check if date is in the future
 */
export const isFuture = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false
  
  try {
    const date = new Date(dateString)
    const now = new Date()
    return date > now
  } catch (error) {
    console.error('Error checking if date is future:', error)
    return false
  }
}