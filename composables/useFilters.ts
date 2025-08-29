// ============================================================================
// Filters Composable
// ============================================================================

import { ref, computed, readonly } from 'vue'
import { debounced } from '~/utils/debounce'
import {
  createFilterState,
  clearFilters,
  removeEmptyFilters,
  areFiltersEmpty,
  getActiveFiltersCount,
  createFilterParams,
  filterOptions,
  getFilterOptionLabel,
  validateDateRange,
  type FilterState
} from '~/utils/filters'

export interface UseFiltersOptions {
  initialFilters?: Partial<FilterState>
  debounceMs?: number
}

/**
 * Filters composable
 */
export function useFilters(options: UseFiltersOptions = {}) {
  const { initialFilters = {}, debounceMs = 500 } = options
  
  const filters = ref<FilterState>(createFilterState(initialFilters))

  // Computed properties
  const isEmpty = computed(() => areFiltersEmpty(filters.value))
  const activeCount = computed(() => getActiveFiltersCount(filters.value))
  const cleanedFilters = computed(() => removeEmptyFilters(filters.value))

  // Methods
  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    filters.value[key] = value
  }

  const updateFilters = (newFilters: Partial<FilterState>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const clear = () => {
    filters.value = clearFilters(initialFilters)
  }

  const createParams = (additionalParams: Record<string, any> = {}) => {
    return createFilterParams(filters.value, additionalParams)
  }

  const validateDateRangeFilter = () => {
    return validateDateRange(filters.value.date_from, filters.value.date_to)
  }

  // Debounced search
  const debouncedSearch = debounced(() => {
    // This will be called by the component
  }, debounceMs)

  // Helper methods for common filter operations
  const setSearch = (search: string) => {
    updateFilter('search', search)
  }

  const setStatus = (status: string) => {
    updateFilter('status', status)
  }

  const setDateRange = (dateFrom: string, dateTo: string) => {
    updateFilters({ date_from: dateFrom, date_to: dateTo })
  }

  const getStatusLabel = (status: string) => {
    return getFilterOptionLabel(filterOptions.status, status)
  }

  const getUserRoleLabel = (role: string) => {
    return getFilterOptionLabel(filterOptions.userRole, role)
  }

  const getVerificationStatusLabel = (verified: string) => {
    return getFilterOptionLabel(filterOptions.verificationStatus, verified)
  }

  const getReadStatusLabel = (read: string) => {
    return getFilterOptionLabel(filterOptions.readStatus, read)
  }

  return {
    // State
    filters: readonly(filters),
    
    // Computed
    isEmpty,
    activeCount,
    cleanedFilters,
    
    // Methods
    updateFilter,
    updateFilters,
    clear,
    createParams,
    validateDateRangeFilter,
    debouncedSearch,
    
    // Helper methods
    setSearch,
    setStatus,
    setDateRange,
    getStatusLabel,
    getUserRoleLabel,
    getVerificationStatusLabel,
    getReadStatusLabel,
    
    // Filter options
    filterOptions
  }
}