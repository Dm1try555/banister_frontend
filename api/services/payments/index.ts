// ============================================================================
// Payments API Service
// ============================================================================

import type {
  Payment,
  PaymentCreate,
  PaymentUpdate,
  PaymentConfirm,
  PaymentTransfer,
  PaymentConfirmResponse,
  PaymentTransferResponse,
  PaginatedResponse
} from '../../types/payments'

import { useApi } from '~/utils/api'

export const paymentsApi = {
  /**
   * Get all payments
   */
  async getPayments(params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Payment>> {
    const api = useApi()
    return await api.get('payments/', { params })
  },

  /**
   * Create a new payment
   */
  async createPayment(paymentData: PaymentCreate): Promise<PaymentCreate> {
    const api = useApi()
    return await api.post('payments/', paymentData)
  },

  /**
   * Get payment by ID
   */
  async getPayment(id: number): Promise<Payment> {
    const api = useApi()
    return await api.get(`payments/${id}/`)
  },

  /**
   * Update payment by ID
   */
  async updatePayment(id: number, paymentData: PaymentUpdate): Promise<PaymentUpdate> {
    const api = useApi()
    return await api.put(`payments/${id}/`, paymentData)
  },

  /**
   * Partially update payment by ID
   */
  async partialUpdatePayment(id: number, paymentData: PaymentUpdate): Promise<PaymentUpdate> {
    const api = useApi()
    return await api.patch(`payments/${id}/`, paymentData)
  },

  /**
   * Delete payment by ID
   */
  async deletePayment(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`payments/${id}/`)
  },

  /**
   * Confirm payment
   */
  async confirmPayment(confirmData: PaymentConfirm): Promise<PaymentConfirmResponse> {
    const api = useApi()
    return await api.post('payments/confirm/', confirmData)
  },

  /**
   * Transfer payment to provider
   */
  async transferPayment(transferData: PaymentTransfer): Promise<PaymentTransferResponse> {
    const api = useApi()
    return await api.post('payments/transfer/', transferData)
  }
}