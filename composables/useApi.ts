// ============================================================================
// Main API Composable
// ============================================================================

import { useAuthApi } from './useAuthApi'
import { useBookingsApi } from './useBookingsApi'
import { useServicesApi } from './useServicesApi'
import { usePaymentsApi } from './usePaymentsApi'

/**
 * Main API composable that provides access to all API services
 * This is a convenience composable that combines all individual API composables
 */
export function useApi() {
  const auth = useAuthApi()
  const bookings = useBookingsApi()
  const services = useServicesApi()
  const payments = usePaymentsApi()

  return {
    auth,
    bookings,
    services,
    payments
  }
}

// Re-export individual composables for direct use
export { useAuthApi } from './useAuthApi'
export { useBookingsApi } from './useBookingsApi'
export { useServicesApi } from './useServicesApi'
export { usePaymentsApi } from './usePaymentsApi'