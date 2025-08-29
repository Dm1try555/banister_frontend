// ============================================================================
// Dashboards API Service
// ============================================================================

import type {
  CustomerDashboard,
  CustomerDashboardUpdate,
  ProviderDashboard,
  ProviderDashboardUpdate,
  ManagementDashboard,
  ManagementDashboardUpdate
} from '../../types/dashboards'

import { useApi } from '~/utils/api'

export const dashboardsApi = {
  /**
   * Get customer dashboard
   */
  async getCustomerDashboard(): Promise<CustomerDashboard> {
    const api = useApi()
    return await api.get('customer-dashboard/')
  },

  /**
   * Update customer dashboard
   */
  async updateCustomerDashboard(data: CustomerDashboardUpdate): Promise<CustomerDashboard> {
    const api = useApi()
    return await api.put('customer-dashboard/', data)
  },

  /**
   * Partially update customer dashboard
   */
  async partialUpdateCustomerDashboard(data: CustomerDashboardUpdate): Promise<CustomerDashboard> {
    const api = useApi()
    return await api.patch('customer-dashboard/', data)
  },

  /**
   * Get provider dashboard
   */
  async getProviderDashboard(): Promise<ProviderDashboard> {
    const api = useApi()
    return await api.get('provider-dashboard/')
  },

  /**
   * Update provider dashboard
   */
  async updateProviderDashboard(data: ProviderDashboardUpdate): Promise<ProviderDashboard> {
    const api = useApi()
    return await api.put('provider-dashboard/', data)
  },

  /**
   * Partially update provider dashboard
   */
  async partialUpdateProviderDashboard(data: ProviderDashboardUpdate): Promise<ProviderDashboard> {
    const api = useApi()
    return await api.patch('provider-dashboard/', data)
  },

  /**
   * Get management dashboard
   */
  async getManagementDashboard(): Promise<ManagementDashboard> {
    const api = useApi()
    return await api.get('management-dashboard/')
  },

  /**
   * Update management dashboard
   */
  async updateManagementDashboard(data: ManagementDashboardUpdate): Promise<ManagementDashboard> {
    const api = useApi()
    return await api.put('management-dashboard/', data)
  },

  /**
   * Partially update management dashboard
   */
  async partialUpdateManagementDashboard(data: ManagementDashboardUpdate): Promise<ManagementDashboard> {
    const api = useApi()
    return await api.patch('management-dashboard/', data)
  }
}