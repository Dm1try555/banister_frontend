import { computed } from 'vue'
import { bookingsApi } from '~/utils/apiEndpoints'
import type { Booking } from '~/utils/apiEndpoints'
import { useDataLoader } from '~/composables/useDataLoader'
import { log } from '~/utils/logger'

export const useBookings = () => {
  const {
    data: bookings,
    currentItem: currentBooking,
    isLoading,
    error,
    dataCount: bookingsCount,
    setLoading,
    setError,
    clearError,
    setData,
    setSingleData,
    addItem,
    updateItem,
    removeItem
  } = useDataLoader<Booking>({
    errorMessage: 'Failed to load bookings'
  })

  // Computed properties
  const pendingBookings = computed(() => bookings.value?.filter(booking => booking.status === 'pending') || [])
  const confirmedBookings = computed(() => bookings.value?.filter(booking => booking.status === 'confirmed') || [])
  const cancelledBookings = computed(() => bookings.value?.filter(booking => booking.status === 'cancelled') || [])

  // Load all bookings
  const loadBookings = async () => {
    try {
      setLoading(true)
      clearError()
      const data = await bookingsApi.getBookings()
      log.api.response('GET', 'bookings', data)
      
      setData(data)
      return bookings.value
    } catch (err) {
      log.api.error('GET', 'bookings', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Load single booking
  const loadBooking = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      const data = await bookingsApi.getBooking(id)
      log.api.response('GET', `bookings/${id}`, data)
      setSingleData(data)
      return currentBooking.value
    } catch (err) {
      log.api.error('GET', `bookings/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Create new booking
  const createBooking = async (bookingData: Omit<Booking, 'id' | 'created_at'>) => {
    try {
      setLoading(true)
      clearError()
      const newBooking = await bookingsApi.createBooking(bookingData)
      log.api.response('POST', 'bookings', newBooking)
      addItem(newBooking)
      return newBooking
    } catch (err) {
      log.api.error('POST', 'bookings', err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update booking
  const updateBooking = async (id: number, bookingData: Partial<Booking>) => {
    try {
      setLoading(true)
      clearError()
      const updatedBooking = await bookingsApi.updateBooking(id, bookingData)
      log.api.response('PUT', `bookings/${id}`, updatedBooking)
      
      updateItem(id, updatedBooking)
      if (currentBooking.value?.id === id) {
        setSingleData(updatedBooking)
      }
      
      return updatedBooking
    } catch (err) {
      log.api.error('PUT', `bookings/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Patch booking (partial update)
  const patchBooking = async (id: number, bookingData: Partial<Booking>) => {
    try {
      setLoading(true)
      clearError()
      const updatedBooking = await bookingsApi.patchBooking(id, bookingData)
      log.api.response('PATCH', `bookings/${id}`, updatedBooking)
      
      updateItem(id, updatedBooking)
      if (currentBooking.value?.id === id) {
        setSingleData(updatedBooking)
      }
      
      return updatedBooking
    } catch (err) {
      log.api.error('PATCH', `bookings/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete booking
  const deleteBooking = async (id: number) => {
    try {
      setLoading(true)
      clearError()
      await bookingsApi.deleteBooking(id)
      log.api.response('DELETE', `bookings/${id}`, null)
      
      removeItem(id)
      if (currentBooking.value?.id === id) {
        setSingleData(null)
      }
    } catch (err) {
      log.api.error('DELETE', `bookings/${id}`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update booking status (for providers)
  const updateBookingStatus = async (bookingId: number, status: string) => {
    try {
      setLoading(true)
      clearError()
      await bookingsApi.updateBookingStatus(bookingId, status)
      log.api.response('PATCH', `bookings/${bookingId}/status`, { status })
      
      // Update in local state
      const booking = bookings.value.find(b => b.id === bookingId)
      if (booking) {
        updateItem(bookingId, { ...booking, status: status as any } as any)
      }
      
      if (currentBooking.value?.id === bookingId) {
        setSingleData({ ...currentBooking.value, status: status as any } as any)
      }
    } catch (err) {
      log.api.error('PATCH', `bookings/${bookingId}/status`, err)
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Clear current booking
  const clearCurrentBooking = () => {
    setSingleData(null)
  }

  return {
    // State
    bookings,
    currentBooking,
    isLoading,
    error,
    
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