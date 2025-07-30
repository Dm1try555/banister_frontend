import { ref, computed, readonly } from 'vue'
import { bookingsApi } from '~/utils/apiEndpoints'
import type { Booking } from '~/utils/apiEndpoints'

export const useBookings = () => {
  const bookings = ref<Booking[]>([])
  const currentBooking = ref<Booking | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Computed properties
  const bookingsCount = computed(() => bookings.value?.length || 0)
  const pendingBookings = computed(() => bookings.value?.filter(booking => booking.status === 'pending') || [])
  const confirmedBookings = computed(() => bookings.value?.filter(booking => booking.status === 'confirmed') || [])
  const cancelledBookings = computed(() => bookings.value?.filter(booking => booking.status === 'cancelled') || [])

  // Load all bookings
  const loadBookings = async () => {
    try {
      isLoading.value = true
      error.value = null
      const data = await bookingsApi.getBookings()
      console.log('Bookings API response:', data)
      
      // Handle different response formats
      let bookingsData = []
      if (Array.isArray(data)) {
        bookingsData = data
      } else if (data && Array.isArray(data.results)) {
        bookingsData = data.results
      } else if (data && Array.isArray(data.data)) {
        bookingsData = data.data
      } else if (data && typeof data === 'object') {
        // If it's an object but not an array, try to extract bookings
        bookingsData = Object.values(data).find(val => Array.isArray(val)) || []
      }
      
      bookings.value = bookingsData
      return bookingsData
    } catch (err) {
      console.error('Failed to load bookings:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load bookings'
      bookings.value = [] // Ensure it's always an array
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Load single booking
  const loadBooking = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      const data = await bookingsApi.getBooking(id)
      currentBooking.value = data
      return data
    } catch (err) {
      console.error('Failed to load booking:', err)
      error.value = err instanceof Error ? err.message : 'Failed to load booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Create new booking
  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>) => {
    try {
      isLoading.value = true
      error.value = null
      const newBooking = await bookingsApi.createBooking(bookingData)
      bookings.value.push(newBooking)
      return newBooking
    } catch (err) {
      console.error('Failed to create booking:', err)
      error.value = err instanceof Error ? err.message : 'Failed to create booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update booking
  const updateBooking = async (id: number, bookingData: Partial<Booking>) => {
    try {
      isLoading.value = true
      error.value = null
      const updatedBooking = await bookingsApi.updateBooking(id, bookingData)
      
      // Update in local state
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1) {
        bookings.value[index] = updatedBooking
      }
      
      if (currentBooking.value?.id === id) {
        currentBooking.value = updatedBooking
      }
      
      return updatedBooking
    } catch (err) {
      console.error('Failed to update booking:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Patch booking (partial update)
  const patchBooking = async (id: number, bookingData: Partial<Booking>) => {
    try {
      isLoading.value = true
      error.value = null
      const updatedBooking = await bookingsApi.patchBooking(id, bookingData)
      
      // Update in local state
      const index = bookings.value.findIndex(b => b.id === id)
      if (index !== -1) {
        bookings.value[index] = { ...bookings.value[index], ...updatedBooking }
      }
      
      if (currentBooking.value?.id === id) {
        currentBooking.value = { ...currentBooking.value, ...updatedBooking }
      }
      
      return updatedBooking
    } catch (err) {
      console.error('Failed to patch booking:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Delete booking
  const deleteBooking = async (id: number) => {
    try {
      isLoading.value = true
      error.value = null
      await bookingsApi.deleteBooking(id)
      
      // Remove from local state
      bookings.value = bookings.value.filter(b => b.id !== id)
      
      if (currentBooking.value?.id === id) {
        currentBooking.value = null
      }
    } catch (err) {
      console.error('Failed to delete booking:', err)
      error.value = err instanceof Error ? err.message : 'Failed to delete booking'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Update booking status (for providers)
  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      isLoading.value = true
      error.value = null
      await bookingsApi.updateBookingStatus(bookingId, status)
      
      // Update in local state
      const index = bookings.value.findIndex(b => b.id === bookingId)
      if (index !== -1) {
        bookings.value[index] = { ...bookings.value[index], status: status as any } as any
      }
      
      if (currentBooking.value?.id === bookingId) {
        currentBooking.value = { ...currentBooking.value, status: status as any } as any
      }
    } catch (err) {
      console.error('Failed to update booking status:', err)
      error.value = err instanceof Error ? err.message : 'Failed to update booking status'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // Clear current booking
  const clearCurrentBooking = () => {
    currentBooking.value = null
  }

  // Clear error
  const clearError = () => {
    error.value = null
  }

  return {
    // State
    bookings: readonly(bookings),
    currentBooking: readonly(currentBooking),
    isLoading: readonly(isLoading),
    error: readonly(error),
    
    // Computed
    bookingsCount,
    pendingBookings,
    confirmedBookings,
    cancelledBookings,
    
    // Methods
    loadBookings,
    loadBooking,
    createBooking,
    updateBooking,
    patchBooking,
    deleteBooking,
    updateBookingStatus,
    clearCurrentBooking,
    clearError
  }
} 