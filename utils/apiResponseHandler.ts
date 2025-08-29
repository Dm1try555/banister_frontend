// ============================================================================
// API Response Handler Utility
// ============================================================================

/**
 * Handles different API response formats and extracts data consistently
 */
export function handleApiResponse<T>(data: any): T[] {
  // Handle different response formats
  if (Array.isArray(data)) {
    return data
  } else if (data && Array.isArray(data.results)) {
    return data.results
  } else if (data && Array.isArray(data.data)) {
    return data.data
  } else if (data && typeof data === 'object') {
    // If it's an object but not an array, try to extract data
    const arrayValue = Object.values(data).find(val => Array.isArray(val))
    return arrayValue || []
  }
  
  return []
}

/**
 * Handles API response for single item
 */
export function handleSingleApiResponse<T>(data: any): T | null {
  if (data && typeof data === 'object') {
    return data
  }
  return null
}

/**
 * Creates a standardized error message from API error
 */
export function createErrorMessage(error: any, defaultMessage: string): string {
  if (error instanceof Error) {
    return error.message
  } else if (typeof error === 'string') {
    return error
  } else if (error && error.message) {
    return error.message
  }
  return defaultMessage
}

/**
 * Standard API call wrapper with error handling
 */
export async function withErrorHandling<T>(
  apiCall: () => Promise<T>,
  errorMessage: string
): Promise<T> {
  try {
    return await apiCall()
  } catch (error) {
    const message = createErrorMessage(error, errorMessage)
    throw new Error(message)
  }
}