// ============================================================================
// Bookings API Composable
// ============================================================================

import { bookingsApi } from '~/api/services/bookings'
import type { 
  Booking, 
  BookingCreate, 
  BookingUpdate,
  PaginatedResponse
} from '~/api/types/bookings'
import { useBaseApi } from './useBaseApi'

export function useBookingsApi() {
  const baseApi = useBaseApi<Booking>()

  /**
   * Get all bookings
   */
  const getBookings = async (params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Booking>> => {
    return await baseApi.executeApiCall(
      () => bookingsApi.getBookings(params),
      'Get Bookings'
    ) as PaginatedResponse<Booking>
  }

  /**
   * Create a new booking
   */
  const createBooking = async (bookingData: BookingCreate): Promise<BookingCreate | null> => {
    return await baseApi.createItem(
      bookingsApi.createBooking,
      bookingData,
      'Create Booking'
    )
  }

  /**
   * Get booking by ID
   */
  const getBooking = async (id: number): Promise<Booking | null> => {
    return await baseApi.getItem(
      bookingsApi.getBooking,
      id,
      'Get Booking'
    )
  }

  /**
   * Update booking by ID
   */
  const updateBooking = async (id: number, bookingData: BookingUpdate): Promise<BookingUpdate | null> => {
    return await baseApi.updateItem(
      bookingsApi.updateBooking,
      id,
      bookingData,
      'Update Booking'
    )
  }

  /**
   * Partially update booking by ID
   */
  const partialUpdateBooking = async (id: number, bookingData: BookingUpdate): Promise<BookingUpdate | null> => {
    return await baseApi.updateItem(
      bookingsApi.partialUpdateBooking,
      id,
      bookingData,
      'Partial Update Booking'
    )
  }

  /**
   * Delete booking by ID
   */
  const deleteBooking = async (id: number): Promise<void> => {
    await baseApi.deleteItem(
      bookingsApi.deleteBooking,
      id,
      'Delete Booking'
    )
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    bookings: baseApi.data,
    
    // Methods
    getBookings,
    createBooking,
    getBooking,
    updateBooking,
    partialUpdateBooking,
    deleteBooking,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}