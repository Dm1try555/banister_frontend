// ============================================================================
// Filter Utilities
// ============================================================================

export interface FilterState {
  search: string
  status: string
  date_from: string
  date_to: string
  [key: string]: any
}

/**
 * Create initial filter state
 */
export const createFilterState = (initialFilters: Partial<FilterState> = {}): FilterState => ({
  search: '',
  status: '',
  date_from: '',
  date_to: '',
  ...initialFilters
})

/**
 * Clear all filters
 */
export const clearFilters = (initialFilters: Partial<FilterState> = {}): FilterState => {
  return createFilterState(initialFilters)
}

/**
 * Remove empty filters from object
 */
export const removeEmptyFilters = (filters: Record<string, any>): Record<string, any> => {
  const cleaned: Record<string, any> = {}
  
  Object.keys(filters).forEach(key => {
    const value = filters[key]
    if (value !== '' && value !== null && value !== undefined) {
      cleaned[key] = value
    }
  })
  
  return cleaned
}

/**
 * Check if filters are empty
 */
export const areFiltersEmpty = (filters: FilterState): boolean => {
  return Object.values(removeEmptyFilters(filters)).length === 0
}

/**
 * Get active filters count
 */
export const getActiveFiltersCount = (filters: FilterState): number => {
  return Object.keys(removeEmptyFilters(filters)).length
}

/**
 * Create filter parameters for API request
 */
export const createFilterParams = (
  filters: FilterState,
  additionalParams: Record<string, any> = {}
): Record<string, any> => {
  return {
    ...removeEmptyFilters(filters),
    ...additionalParams
  }
}

/**
 * Common filter options
 */
export const filterOptions = {
  status: [
    { value: '', label: 'Все' },
    { value: 'active', label: 'Активные' },
    { value: 'inactive', label: 'Неактивные' },
    { value: 'pending', label: 'Ожидают' },
    { value: 'approved', label: 'Одобрены' },
    { value: 'rejected', label: 'Отклонены' }
  ],
  
  userRole: [
    { value: '', label: 'Все роли' },
    { value: 'customer', label: 'Клиент' },
    { value: 'service_provider', label: 'Провайдер' },
    { value: 'management', label: 'Менеджер' },
    { value: 'admin', label: 'Админ' },
    { value: 'super_admin', label: 'Супер админ' }
  ],
  
  verificationStatus: [
    { value: '', label: 'Все' },
    { value: 'true', label: 'Верифицированы' },
    { value: 'false', label: 'Не верифицированы' }
  ],
  
  readStatus: [
    { value: '', label: 'Все' },
    { value: 'true', label: 'Прочитанные' },
    { value: 'false', label: 'Непрочитанные' }
  ]
} as const

/**
 * Get filter option label by value
 */
export const getFilterOptionLabel = (
  options: Array<{ value: string; label: string }>,
  value: string
): string => {
  const option = options.find(opt => opt.value === value)
  return option ? option.label : value
}

/**
 * Create date range filter
 */
export const createDateRangeFilter = (
  from: string,
  to: string
): { date_from: string; date_to: string } => {
  return {
    date_from: from || '',
    date_to: to || ''
  }
}

/**
 * Validate date range
 */
export const validateDateRange = (
  dateFrom: string,
  dateTo: string
): { isValid: boolean; error?: string } => {
  if (!dateFrom && !dateTo) {
    return { isValid: true }
  }
  
  if (dateFrom && dateTo) {
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo)
    
    if (fromDate > toDate) {
      return {
        isValid: false,
        error: 'Дата начала не может быть больше даты окончания'
      }
    }
  }
  
  return { isValid: true }
}