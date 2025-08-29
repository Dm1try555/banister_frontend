// ============================================================================
// Base Data Loader Composable
// ============================================================================

import { ref, computed, readonly } from 'vue'
import { handleApiResponse, handleSingleApiResponse, createErrorMessage } from '~/utils/apiResponseHandler'

export interface UseDataLoaderOptions<T> {
  initialData?: T[]
  errorMessage?: string
}

/**
 * Base composable for data loading with consistent state management
 */
export function useDataLoader<T>(options: UseDataLoaderOptions<T> = {}) {
  const { initialData = [], errorMessage = 'Failed to load data' } = options
  
  // State
  const data = ref<T[]>(initialData)
  const currentItem = ref<T | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const dataCount = computed(() => data.value?.length || 0)
  const hasData = computed(() => data.value?.length > 0)
  const hasError = computed(() => error.value !== null)

  // Methods
  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const setError = (err: any) => {
    error.value = createErrorMessage(err, errorMessage)
  }

  const clearError = () => {
    error.value = null
  }

  const setData = (newData: any) => {
    data.value = handleApiResponse<T>(newData)
  }

  const setSingleData = (newData: any) => {
    currentItem.value = handleSingleApiResponse<T>(newData)
  }

  const addItem = (item: T) => {
    data.value.push(item)
  }

  const updateItem = (id: number, updatedItem: T) => {
    const index = data.value.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      data.value[index] = updatedItem
    }
  }

  const removeItem = (id: number) => {
    const index = data.value.findIndex((item: any) => item.id === id)
    if (index !== -1) {
      data.value.splice(index, 1)
    }
  }

  const clearData = () => {
    data.value = []
    currentItem.value = null
  }

  const reset = () => {
    data.value = initialData
    currentItem.value = null
    isLoading.value = false
    error.value = null
  }

  return {
    // State (readonly)
    data: readonly(data),
    currentItem: readonly(currentItem),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    dataCount,
    hasData,
    hasError,
    
    // Methods
    setLoading,
    setError,
    clearError,
    setData,
    setSingleData,
    addItem,
    updateItem,
    removeItem,
    clearData,
    reset
  }
}