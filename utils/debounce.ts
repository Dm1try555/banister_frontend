// ============================================================================
// Debounce Utilities
// ============================================================================

/**
 * Debounce function to limit the rate of function execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout!)
      func(...args)
    }
    
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function to limit the rate of function execution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

/**
 * Create a debounced version of a function with custom wait time
 */
export const createDebounced = (wait: number = 500) => {
  return <T extends (...args: any[]) => any>(func: T) => debounce(func, wait)
}

/**
 * Common debounce configurations
 */
export const debounceConfig = {
  search: 500,      // For search inputs
  input: 300,       // For general inputs
  resize: 250,      // For window resize
  scroll: 100,      // For scroll events
  click: 200        // For click events
} as const

/**
 * Pre-configured debounced functions
 */
export const debounced = {
  search: createDebounced(debounceConfig.search),
  input: createDebounced(debounceConfig.input),
  resize: createDebounced(debounceConfig.resize),
  scroll: createDebounced(debounceConfig.scroll),
  click: createDebounced(debounceConfig.click)
}