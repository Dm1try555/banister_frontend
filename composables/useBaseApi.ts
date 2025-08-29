// ============================================================================
// Base API Composable
// ============================================================================

import { ref, readonly } from 'vue'
import { useErrorHandler } from './useErrorHandler'

export interface BaseApiState<T> {
  loading: boolean
  error: string | null
  data: T[]
}

export interface BaseApiOptions {
  autoLoad?: boolean
  initialData?: any[]
}

/**
 * Base composable for API operations
 */
export function useBaseApi<T = any>(options: BaseApiOptions = {}) {
  const { handleApiError } = useErrorHandler()
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const data = ref<T[]>(options.initialData || [])

  /**
   * Execute API call with loading and error handling
   */
  const executeApiCall = async <R>(
    apiCall: () => Promise<R>,
    operation: string = 'API call'
  ): Promise<R | null> => {
    loading.value = true
    error.value = null
    
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      const errorMessage = handleApiError(err, operation)
      error.value = errorMessage
      throw new Error(errorMessage)
    } finally {
      loading.value = false
    }
  }

  /**
   * Load data with pagination
   */
  const loadData = async <R>(
    apiCall: (params: any) => Promise<{ results: R[]; count: number }>,
    params: any = {}
  ): Promise<{ results: R[]; count: number } | null> => {
    return await executeApiCall(
      () => apiCall(params),
      'Load data'
    )
  }

  /**
   * Create new item
   */
  const createItem = async <R>(
    apiCall: (data: any) => Promise<R>,
    itemData: any,
    operation: string = 'Create item'
  ): Promise<R | null> => {
    return await executeApiCall(
      () => apiCall(itemData),
      operation
    )
  }

  /**
   * Update item
   */
  const updateItem = async <R>(
    apiCall: (id: number, data: any) => Promise<R>,
    id: number,
    itemData: any,
    operation: string = 'Update item'
  ): Promise<R | null> => {
    return await executeApiCall(
      () => apiCall(id, itemData),
      operation
    )
  }

  /**
   * Delete item
   */
  const deleteItem = async (
    apiCall: (id: number) => Promise<void>,
    id: number,
    operation: string = 'Delete item'
  ): Promise<void> => {
    await executeApiCall(
      () => apiCall(id),
      operation
    )
  }

  /**
   * Get single item
   */
  const getItem = async <R>(
    apiCall: (id: number) => Promise<R>,
    id: number,
    operation: string = 'Get item'
  ): Promise<R | null> => {
    return await executeApiCall(
      () => apiCall(id),
      operation
    )
  }

  /**
   * Clear error state
   */
  const clearError = () => {
    error.value = null
  }

  /**
   * Reset state
   */
  const resetState = () => {
    loading.value = false
    error.value = null
    data.value = options.initialData || []
  }

  return {
    // State
    loading: readonly(loading),
    error: readonly(error),
    data: readonly(data),
    
    // Methods
    executeApiCall,
    loadData,
    createItem,
    updateItem,
    deleteItem,
    getItem,
    clearError,
    resetState
  }
}