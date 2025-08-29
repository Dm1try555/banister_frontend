// ============================================================================
// Pagination Utilities
// ============================================================================

export interface PaginationState {
  currentPage: number
  totalPages: number
  totalCount: number
  pageSize: number
}

export interface PaginationParams {
  page?: number
  page_size?: number
}

/**
 * Create initial pagination state
 */
export const createPaginationState = (pageSize: number = 20): PaginationState => ({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize
})

/**
 * Calculate visible pages for pagination component
 */
export const getVisiblePages = (
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5
): number[] => {
  const pages: number[] = []
  const half = Math.floor(maxVisible / 2)
  
  let start = Math.max(1, currentPage - half)
  let end = Math.min(totalPages, currentPage + half)
  
  // Adjust if we're near the beginning or end
  if (end - start + 1 < maxVisible) {
    if (start === 1) {
      end = Math.min(totalPages, start + maxVisible - 1)
    } else {
      start = Math.max(1, end - maxVisible + 1)
    }
  }
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
}

/**
 * Check if pagination should be shown
 */
export const shouldShowPagination = (pagination: PaginationState): boolean => {
  return pagination.totalPages > 1
}

/**
 * Get pagination info text
 */
export const getPaginationInfo = (pagination: PaginationState): string => {
  const start = (pagination.currentPage - 1) * pagination.pageSize + 1
  const end = Math.min(pagination.currentPage * pagination.pageSize, pagination.totalCount)
  
  return `Показано ${start}-${end} из ${pagination.totalCount}`
}

/**
 * Update pagination state from API response
 */
export const updatePaginationFromResponse = (
  pagination: PaginationState,
  response: { count: number; results: any[] }
): PaginationState => {
  return {
    ...pagination,
    totalPages: Math.ceil(response.count / pagination.pageSize),
    totalCount: response.count
  }
}

/**
 * Create pagination parameters for API request
 */
export const createPaginationParams = (
  pagination: PaginationState,
  additionalParams: Record<string, any> = {}
): PaginationParams & Record<string, any> => {
  return {
    page: pagination.currentPage,
    page_size: pagination.pageSize,
    ...additionalParams
  }
}

/**
 * Reset pagination to first page
 */
export const resetPagination = (pagination: PaginationState): PaginationState => {
  return {
    ...pagination,
    currentPage: 1
  }
}

/**
 * Go to specific page
 */
export const goToPage = (
  pagination: PaginationState,
  page: number
): PaginationState => {
  if (page >= 1 && page <= pagination.totalPages) {
    return {
      ...pagination,
      currentPage: page
    }
  }
  return pagination
}

/**
 * Go to next page
 */
export const goToNextPage = (pagination: PaginationState): PaginationState => {
  return goToPage(pagination, pagination.currentPage + 1)
}

/**
 * Go to previous page
 */
export const goToPreviousPage = (pagination: PaginationState): PaginationState => {
  return goToPage(pagination, pagination.currentPage - 1)
}

/**
 * Check if can go to next page
 */
export const canGoToNextPage = (pagination: PaginationState): boolean => {
  return pagination.currentPage < pagination.totalPages
}

/**
 * Check if can go to previous page
 */
export const canGoToPreviousPage = (pagination: PaginationState): boolean => {
  return pagination.currentPage > 1
}