// ============================================================================
// Admin Page Composable
// ============================================================================

import { ref, computed, readonly } from 'vue'
import { useBaseApi } from './useBaseApi'
import { usePagination } from './usePagination'
import { useFilters } from './useFilters'
import { formatDate, formatDateTime } from '~/utils/date'

export interface AdminPageOptions {
  pageSize?: number
  initialFilters?: Record<string, any>
  autoLoad?: boolean
}

/**
 * Universal composable for admin pages
 */
export function useAdminPage<T = any>(options: AdminPageOptions = {}) {
  const { pageSize = 20, initialFilters = {}, autoLoad = true } = options
  
  // Base API functionality
  const baseApi = useBaseApi<T>({ autoLoad })
  
  // Pagination
  const pagination = usePagination({ pageSize })
  
  // Filters
  const filters = useFilters({ initialFilters })
  
  // Additional state
  const selectedItems = ref<T[]>([])
  const showCreateModal = ref(false)
  const showEditModal = ref(false)
  const showDeleteModal = ref(false)
  const selectedItem = ref<T | null>(null)
  const processing = ref(false)

  // Computed properties
  const hasSelection = computed(() => selectedItems.value.length > 0)
  const selectedCount = computed(() => selectedItems.value.length)
  const isEmpty = computed(() => baseApi.data.value.length === 0)
  const isLoading = computed(() => baseApi.loading.value)
  const hasError = computed(() => baseApi.error.value !== null)

  // Methods
  const loadData = async (apiCall: (params: any) => Promise<{ results: T[]; count: number }>) => {
    try {
      const params = {
        ...pagination.createParams(),
        ...filters.createParams()
      }
      
      const response = await baseApi.loadData(apiCall, params)
      if (response) {
        baseApi.data.value = response.results
        pagination.updateFromResponse(response)
      }
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const refreshData = async (apiCall: (params: any) => Promise<{ results: T[]; count: number }>) => {
    pagination.reset()
    await loadData(apiCall)
  }

  const searchData = async (apiCall: (params: any) => Promise<{ results: T[]; count: number }>) => {
    pagination.reset()
    await loadData(apiCall)
  }

  const createItem = async (
    apiCall: (data: any) => Promise<T>,
    itemData: any,
    operation: string = 'Create item'
  ) => {
    processing.value = true
    try {
      const newItem = await baseApi.createItem(apiCall, itemData, operation)
      if (newItem) {
        baseApi.data.value.unshift(newItem)
        closeModals()
      }
      return newItem
    } finally {
      processing.value = false
    }
  }

  const updateItem = async (
    apiCall: (id: number, data: any) => Promise<T>,
    id: number,
    itemData: any,
    operation: string = 'Update item'
  ) => {
    processing.value = true
    try {
      const updatedItem = await baseApi.updateItem(apiCall, id, itemData, operation)
      if (updatedItem) {
        const index = baseApi.data.value.findIndex((item: any) => item.id === id)
        if (index !== -1) {
          baseApi.data.value[index] = updatedItem
        }
        closeModals()
      }
      return updatedItem
    } finally {
      processing.value = false
    }
  }

  const deleteItem = async (
    apiCall: (id: number) => Promise<void>,
    id: number,
    operation: string = 'Delete item'
  ) => {
    processing.value = true
    try {
      await baseApi.deleteItem(apiCall, id, operation)
      baseApi.data.value = baseApi.data.value.filter((item: any) => item.id !== id)
      closeModals()
    } finally {
      processing.value = false
    }
  }

  const toggleSelection = (item: T) => {
    const index = selectedItems.value.findIndex((selected: any) => (selected as any).id === (item as any).id)
    if (index > -1) {
      selectedItems.value.splice(index, 1)
    } else {
      selectedItems.value.push(item)
    }
  }

  const selectAll = () => {
    selectedItems.value = [...baseApi.data.value]
  }

  const clearSelection = () => {
    selectedItems.value = []
  }

  const openCreateModal = () => {
    showCreateModal.value = true
    selectedItem.value = null
  }

  const openEditModal = (item: T) => {
    selectedItem.value = item
    showEditModal.value = true
  }

  const openDeleteModal = (item: T) => {
    selectedItem.value = item
    showDeleteModal.value = true
  }

  const closeModals = () => {
    showCreateModal.value = false
    showEditModal.value = false
    showDeleteModal.value = false
    selectedItem.value = null
  }

  const changePage = (page: number) => {
    pagination.changePage(page)
  }

  const clearFilters = () => {
    filters.clear()
    pagination.reset()
  }

  // Utility functions
  const formatDateUtil = formatDate
  const formatDateTimeUtil = formatDateTime

  return {
    // State
    data: baseApi.data,
    loading: baseApi.loading,
    error: baseApi.error,
    pagination: pagination.pagination,
    filters: filters.filters,
    selectedItems: readonly(selectedItems),
    selectedItem: readonly(selectedItem),
    processing: readonly(processing),
    
    // Modal states
    showCreateModal: readonly(showCreateModal),
    showEditModal: readonly(showEditModal),
    showDeleteModal: readonly(showDeleteModal),
    
    // Computed
    hasSelection,
    selectedCount,
    isEmpty,
    isLoading,
    hasError,
    visiblePages: pagination.visiblePages,
    showPagination: pagination.showPagination,
    paginationInfo: pagination.paginationInfo,
    canGoNext: pagination.canGoNext,
    canGoPrevious: pagination.canGoPrevious,
    filtersEmpty: filters.isEmpty,
    activeFiltersCount: filters.activeCount,
    
    // Methods
    loadData,
    refreshData,
    searchData,
    createItem,
    updateItem,
    deleteItem,
    toggleSelection,
    selectAll,
    clearSelection,
    openCreateModal,
    openEditModal,
    openDeleteModal,
    closeModals,
    changePage,
    clearFilters,
    
    // Pagination methods
    nextPage: pagination.nextPage,
    previousPage: pagination.previousPage,
    
    // Filter methods
    updateFilter: filters.updateFilter,
    updateFilters: filters.updateFilters,
    createFilterParams: filters.createParams,
    debouncedSearch: filters.debouncedSearch,
    
    // Utility functions
    formatDate: formatDateUtil,
    formatDateTime: formatDateTimeUtil,
    
    // Filter options
    filterOptions: filters.filterOptions
  }
}