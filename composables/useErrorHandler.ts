/**
 * Centralized error handling composable
 * Provides consistent error parsing and user-friendly messages
 */
export const useErrorHandler = () => {
  /**
   * Parse API error response and return user-friendly message
   * Handles Django DRF error formats and custom Banister error format
   */
  const parseApiError = (error: any): string => {
    // Handle different error formats
    if (typeof error === 'string') {
      try {
        const errorObj = JSON.parse(error)
        return parseApiError(errorObj)
      } catch {
        return error
      }
    }

    // Handle Banister custom error format
    if (error?.description) {
      return error.description
    }

    if (error?.title) {
      return error.title
    }

    // Handle standard Django DRF errors
    if (error?.error?.error_message) {
      return error.error.error_message
    }

    if (error?.error) {
      return error.error
    }

    if (error?.message) {
      return error.message
    }

    if (error?.detail) {
      return error.detail
    }

    // Handle field validation errors
    if (error?.non_field_errors) {
      return Array.isArray(error.non_field_errors) 
        ? error.non_field_errors.join('. ')
        : error.non_field_errors
    }

    // Handle field-specific errors
    const fieldErrors = []
    for (const [field, messages] of Object.entries(error)) {
      if (Array.isArray(messages)) {
        fieldErrors.push(`${field}: ${messages.join(', ')}`)
      } else if (typeof messages === 'string') {
        fieldErrors.push(`${field}: ${messages}`)
      }
    }

    if (fieldErrors.length > 0) {
      return fieldErrors.join('. ')
    }

    return 'An unexpected error occurred'
  }

  /**
   * Get user-friendly error message based on error type
   */
  const getUserFriendlyError = (error: any): string => {
    const message = parseApiError(error)

    // Map common error patterns to user-friendly messages
    if (message.includes('Invalid credentials') || message.includes('authentication')) {
      return 'Invalid email or password. Please try again.'
    }

    if (message.includes('Connection error') || message.includes('fetch')) {
      return 'Connection error. Please check your internet connection.'
    }

    if (message.includes('Timeout')) {
      return 'Request timeout. Please try again.'
    }

    if (message.includes('UNKNOWN_ERROR')) {
      return 'Server error occurred. Please try again later or contact support.'
    }

    if (message.includes('This field may not be blank')) {
      return 'Please fill in all required fields.'
    }

    if (message.includes('already exists') || message.includes('taken')) {
      return 'This information is already in use. Please try different values.'
    }

    return message
  }

  /**
   * Handle API errors with consistent logging and user feedback
   */
  const handleApiError = (error: any, context?: string): string => {
    const userMessage = getUserFriendlyError(error)
    
    // Log error for debugging (only in development)
    if (process.dev) {
      console.error(`API Error${context ? ` in ${context}` : ''}:`, error)
    }

    return userMessage
  }

  return {
    parseApiError,
    getUserFriendlyError,
    handleApiError
  }
}