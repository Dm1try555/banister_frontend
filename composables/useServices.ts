import { computed } from 'vue'
import { servicesApi } from '~/utils/apiEndpoints'
import type { Service } from '~/utils/apiEndpoints'
import { useDataLoader } from '~/composables/useDataLoader'
import { log } from '~/utils/logger'

export const useServices = () => {
  const {
    data: services,
    currentItem: currentService,
    isLoading,
    error,
    dataCount: servicesCount,
    setLoading,
    setError,
    clearError,
    setData,
    setSingleData,
    addItem,
    updateItem,
    removeItem
  } = useDataLoader<Service>({
    errorMessage: 'Failed to load services'
  })

  // Computed properties
  const activeServices = computed(() => services.value || [])

  // Load all services
  const loadServices = async (search?: string, ordering?: string) => {
    try {
      setLoading(true)
      clearError()
      const data = await servicesApi.getServices(search, ordering)
      log.api.response('GET', 'services', data)
      
      setData(data)
      return services.value
    } catch (err) {
      log.api.error('GET', 'services', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Load single service
  const loadService = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      const data = await servicesApi.getService(id)
      log.api.response('GET', `services/${id}`, data)
      setSingleData(data)
      return currentService.value
    } catch (err) {
      log.api.error('GET', `services/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Create new service
  const createService = async (serviceData: Omit<Service, 'id' | 'created_at'>) => {
    try {
      setLoading(true)
      clearError()
      const newService = await servicesApi.createService(serviceData)
      log.api.response('POST', 'services', newService)
      addItem(newService)
      return newService
    } catch (err) {
      log.api.error('POST', 'services', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update service
  const updateService = async (id: number, serviceData: Partial<Service>) => {
    try {
      setLoading(true)
      clearError()
      const updatedService = await servicesApi.updateService(id, serviceData)
      log.api.response('PUT', `services/${id}`, updatedService)
      
      updateItem(id, updatedService)
      if (currentService.value?.id === id) {
        setSingleData(updatedService)
      }
      
      return updatedService
    } catch (err) {
      log.api.error('PUT', `services/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Patch service (partial update)
  const patchService = async (id: number, serviceData: Partial<Service>) => {
    try {
      setLoading(true)
      clearError()
      const updatedService = await servicesApi.patchService(id, serviceData)
      log.api.response('PATCH', `services/${id}`, updatedService)
      
      updateItem(id, updatedService)
      if (currentService.value?.id === id) {
        setSingleData(updatedService)
      }
      
      return updatedService
    } catch (err) {
      log.api.error('PATCH', `services/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete service
  const deleteService = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      await servicesApi.deleteService(id)
      log.api.response('DELETE', `services/${id}`, null)
      
      removeItem(id)
      if (currentService.value?.id === id) {
        setSingleData(null)
      }
    } catch (err) {
      log.api.error('DELETE', `services/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Clear current service
  const clearCurrentService = () => {
    setSingleData(null)
  }

  return {
    // State
    services,
    currentService,
    isLoading,
    error,
    
    // Computed
    servicesCount,
    activeServices,
    
    // Methods
    loadServices,
    loadService,
    createService,
    updateService,
    patchService,
    deleteService,
    clearCurrentService,
    clearError
  }
} 