import { ref, computed, readonly } from 'vue'
import { dashboardEndpoints } from '~/utils/apiEndpoints'
import type { DashboardStats } from '~/api/types/dashboard'

export const useDashboard = () => {
  const overview = ref<DashboardStats | null>(null)
  const statistics = ref<DashboardStats | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const totalBookings = computed(() => overview.value?.total_bookings || 0)
  const totalEarnings = computed(() => overview.value?.total_earnings || '0')
  const user = computed(() => overview.value?.user || null)

  // Load dashboard overview
  const loadOverview = async () => {
    try {
      isLoading.value = true
      error.value = null
      const data = await dashboardEndpoints.getCustomerDashboard()
      overview.value = data
      return data
    } catch (err) {
      console.error('Failed to load dashboard overview:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load dashboard overview'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Load dashboard statistics
  const loadStatistics = async () => {
    try {
      isLoading.value = true
      error.value = null
      const data = await dashboardEndpoints.getProviderDashboard()
      statistics.value = data
      return data
    } catch (err) {
      console.error('Failed to load dashboard statistics:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load dashboard statistics'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Load both overview and statistics
  const loadDashboard = async () => {
    try {
      isLoading.value = true
      error.value = null
      const [overviewData, statisticsData] = await Promise.all([
        dashboardEndpoints.getCustomerDashboard().catch(err => {
          console.error('Failed to load overview:', err)
          return null
        }),
        dashboardEndpoints.getProviderDashboard().catch(err => {
          console.error('Failed to load statistics:', err)
          return null
        })
      ])
      overview.value = overviewData
      statistics.value = statisticsData
      return { overview: overviewData, statistics: statisticsData }
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load dashboard data'
      // Set default values to prevent errors
      overview.value = { total_bookings: 0, total_earnings: '0' }
      statistics.value = { total_bookings: 0, total_earnings: '0' }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Clear dashboard data
  const clearDashboard = () => {
    overview.value = null
    statistics.value = null
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    overview: readonly(overview),
    statistics: readonly(statistics),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    totalBookings,
    totalEarnings,
    user,
    
    // Methods
    loadOverview,
    loadStatistics,
    loadDashboard,
    clearDashboard,
    clearError
  }
} 