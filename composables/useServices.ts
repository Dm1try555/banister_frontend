import { ref, computed, readonly } from 'vue'
import { servicesApi } from '~/utils/apiEndpoints'
import type { Service } from '~/utils/apiEndpoints'

export const useServices = () => {
  const services = ref<Service[]>([])
  const currentService = ref<Service | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const servicesCount = computed(() => services.value?.length || 0)
  const activeServices = computed(() => services.value || [])

  // Load all services
  const loadServices = async (search?: string, ordering?: string) => {
    try {
      isLoading.value = true
      error.value = null
      const data = await servicesApi.getServices(search, ordering)
      console.log('Services API response:', data)
      
      // Handle different response formats
      let servicesData = []
      if (Array.isArray(data)) {
        servicesData = data
      } else if (data && Array.isArray(data.results)) {
        servicesData = data.results
      } else if (data && Array.isArray(data.data)) {
        servicesData = data.data
      } else if (data && typeof data === 'object') {
        // If it's an object but not an array, try to extract services
        servicesData = Object.values(data).find(val => Array.isArray(val)) || []
      }
      
      services.value = servicesData
      return servicesData
    } catch (err) {
      console.error('Failed to load services:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load services'
      services.value = [] // Ensure it's always an array
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Load single service
  const loadService = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      const data = await servicesApi.getService(id)
      currentService.value = data
      return data
    } catch (err) {
      console.error('Failed to load service:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load service'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create new service
  const createService = async (serviceData: Omit<Service, 'id' | 'created_at'>) => {
    try {
      isLoading.value = true
      error.value = null
      const newService = await servicesApi.createService(serviceData)
      services.value.push(newService)
      return newService
    } catch (err) {
      console.error('Failed to create service:', err)
      error.value = err instanceof Error ? err.message : 'Failed to create service'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update service
  const updateService = async (id: number, serviceData: Partial<Service>) => {
    try {
      isLoading.value = true
      error.value = null
      const updatedService = await servicesApi.updateService(id, serviceData)
      
      // Update in local state
      const index = services.value.findIndex(s => s.id === id)
      if (index !== -1) {
        services.value[index] = updatedService
      }
      
      if (currentService.value?.id === id) {
        currentService.value = updatedService
      }
      
      return updatedService
    } catch (err) {
      console.error('Failed to update service:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update service'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Patch service (partial update)
  const patchService = async (id: number, serviceData: Partial<Service>) => {
    try {
      isLoading.value = true
      error.value = null
      const updatedService = await servicesApi.patchService(id, serviceData)
      
      // Update in local state
      const index = services.value.findIndex(s => s.id === id)
      if (index !== -1) {
        services.value[index] = { ...services.value[index], ...updatedService }
      }
      
      if (currentService.value?.id === id) {
        currentService.value = { ...currentService.value, ...updatedService }
      }
      
      return updatedService
    } catch (err) {
      console.error('Failed to patch service:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update service'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete service
  const deleteService = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      await servicesApi.deleteService(id)
      
      // Remove from local state
      services.value = services.value.filter(s => s.id !== id)
      
      if (currentService.value?.id === id) {
        currentService.value = null
      }
    } catch (err) {
      console.error('Failed to delete service:', err)
      error.value = err instanceof Error ? err.message : 'Failed to delete service'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Clear current service
  const clearCurrentService = () => {
    currentService.value = null
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    services: readonly(services),
    currentService: readonly(currentService),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
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