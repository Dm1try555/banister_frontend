// ============================================================================
// Services API Service
// ============================================================================

import type {
  Service,
  ServiceCreate,
  ServiceUpdate,
  ServiceSearchParams,
  PaginatedResponse
} from '../../types/services'

import { useApi } from '~/utils/api'

export const servicesApi = {
  /**
   * Get all services
   */
  async getServices(params?: ServiceSearchParams): Promise<PaginatedResponse<Service>> {
    const api = useApi()
    return await api.get('services/', { params })
  },

  /**
   * Create a new service
   */
  async createService(serviceData: ServiceCreate): Promise<ServiceCreate> {
    const api = useApi()
    return await api.post('services/', serviceData)
  },

  /**
   * Get service by ID
   */
  async getService(id: number): Promise<Service> {
    const api = useApi()
    return await api.get(`services/${id}/`)
  },

  /**
   * Update service by ID
   */
  async updateService(id: number, serviceData: ServiceUpdate): Promise<ServiceUpdate> {
    const api = useApi()
    return await api.put(`services/${id}/`, serviceData)
  },

  /**
   * Partially update service by ID
   */
  async partialUpdateService(id: number, serviceData: ServiceUpdate): Promise<ServiceUpdate> {
    const api = useApi()
    return await api.patch(`services/${id}/`, serviceData)
  },

  /**
   * Delete service by ID
   */
  async deleteService(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`services/${id}/`)
  }
}