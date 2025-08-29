// ============================================================================
// Bookings API Service
// ============================================================================

import type {
  Booking,
  BookingCreate,
  BookingUpdate,
  PaginatedResponse
} from '../../types/bookings'

import { useApi } from '~/utils/api'

export const bookingsApi = {
  /**
   * Get all bookings
   */
  async getBookings(params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Booking>> {
    const api = useApi()
    return await api.get('bookings/', { params })
  },

  /**
   * Create a new booking
   */
  async createBooking(bookingData: BookingCreate): Promise<BookingCreate> {
    const api = useApi()
    return await api.post('bookings/', bookingData)
  },

  /**
   * Get booking by ID
   */
  async getBooking(id: number): Promise<Booking> {
    const api = useApi()
    return await api.get(`bookings/${id}/`)
  },

  /**
   * Update booking by ID
   */
  async updateBooking(id: number, bookingData: BookingUpdate): Promise<BookingUpdate> {
    const api = useApi()
    return await api.put(`bookings/${id}/`, bookingData)
  },

  /**
   * Partially update booking by ID
   */
  async partialUpdateBooking(id: number, bookingData: BookingUpdate): Promise<BookingUpdate> {
    const api = useApi()
    return await api.patch(`bookings/${id}/`, bookingData)
  },

  /**
   * Delete booking by ID
   */
  async deleteBooking(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`bookings/${id}/`)
  }
}