// ============================================================================
// Pagination Composable
// ============================================================================

import { ref, computed, readonly } from 'vue'
import {
  createPaginationState,
  getVisiblePages,
  shouldShowPagination,
  getPaginationInfo,
  updatePaginationFromResponse,
  createPaginationParams,
  resetPagination,
  goToPage,
  goToNextPage,
  goToPreviousPage,
  canGoToNextPage,
  canGoToPreviousPage,
  type PaginationState
} from '~/utils/pagination'

export interface UsePaginationOptions {
  pageSize?: number
  autoReset?: boolean
}

/**
 * Pagination composable
 */
export function usePagination(options: UsePaginationOptions = {}) {
  const { pageSize = 20, autoReset = true } = options
  
  const pagination = ref<PaginationState>(createPaginationState(pageSize))

  // Computed properties
  const visiblePages = computed(() => getVisiblePages(pagination.value.currentPage, pagination.value.totalPages))
  const showPagination = computed(() => shouldShowPagination(pagination.value))
  const paginationInfo = computed(() => getPaginationInfo(pagination.value))
  const canGoNext = computed(() => canGoToNextPage(pagination.value))
  const canGoPrevious = computed(() => canGoToPreviousPage(pagination.value))

  // Methods
  const updateFromResponse = (response: { count: number; results: any[] }) => {
    pagination.value = updatePaginationFromResponse(pagination.value, response)
  }

  const createParams = (additionalParams: Record<string, any> = {}) => {
    return createPaginationParams(pagination.value, additionalParams)
  }

  const reset = () => {
    pagination.value = resetPagination(pagination.value)
  }

  const changePage = (page: number) => {
    pagination.value = goToPage(pagination.value, page)
  }

  const nextPage = () => {
    pagination.value = goToNextPage(pagination.value)
  }

  const previousPage = () => {
    pagination.value = goToPreviousPage(pagination.value)
  }

  const setPageSize = (newPageSize: number) => {
    pagination.value = {
      ...pagination.value,
      pageSize: newPageSize,
      currentPage: 1 // Reset to first page when changing page size
    }
  }

  return {
    // State
    pagination: readonly(pagination),
    
    // Computed
    visiblePages,
    showPagination,
    paginationInfo,
    canGoNext,
    canGoPrevious,
    
    // Methods
    updateFromResponse,
    createParams,
    reset,
    changePage,
    nextPage,
    previousPage,
    setPageSize
  }
}