// ============================================================================
// Services API Composable
// ============================================================================

import { servicesApi } from '~/api/services/services'
import type { 
  Service, 
  ServiceCreate, 
  ServiceUpdate,
  ServiceSearchParams,
  PaginatedResponse
} from '~/api/types/services'
import { useBaseApi } from './useBaseApi'

export function useServicesApi() {
  const baseApi = useBaseApi<Service>()

  /**
   * Get all services
   */
  const getServices = async (params?: ServiceSearchParams): Promise<PaginatedResponse<Service>> => {
    return await baseApi.executeApiCall(
      () => servicesApi.getServices(params),
      'Get Services'
    ) as PaginatedResponse<Service>
  }

  /**
   * Create a new service
   */
  const createService = async (serviceData: ServiceCreate): Promise<ServiceCreate | null> => {
    return await baseApi.createItem(
      servicesApi.createService,
      serviceData,
      'Create Service'
    )
  }

  /**
   * Get service by ID
   */
  const getService = async (id: number): Promise<Service | null> => {
    return await baseApi.getItem(
      servicesApi.getService,
      id,
      'Get Service'
    )
  }

  /**
   * Update service by ID
   */
  const updateService = async (id: number, serviceData: ServiceUpdate): Promise<ServiceUpdate | null> => {
    return await baseApi.updateItem(
      servicesApi.updateService,
      id,
      serviceData,
      'Update Service'
    )
  }

  /**
   * Partially update service by ID
   */
  const partialUpdateService = async (id: number, serviceData: ServiceUpdate): Promise<ServiceUpdate | null> => {
    return await baseApi.updateItem(
      servicesApi.partialUpdateService,
      id,
      serviceData,
      'Partial Update Service'
    )
  }

  /**
   * Delete service by ID
   */
  const deleteService = async (id: number): Promise<void> => {
    await baseApi.deleteItem(
      servicesApi.deleteService,
      id,
      'Delete Service'
    )
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    services: baseApi.data,
    
    // Methods
    getServices,
    createService,
    getService,
    updateService,
    partialUpdateService,
    deleteService,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}