// ============================================================================
// Payments API Composable
// ============================================================================

import { paymentsApi } from '~/api/services/payments'
import type { 
  Payment, 
  PaymentCreate, 
  PaymentUpdate,
  PaymentConfirm,
  PaymentTransfer,
  PaymentConfirmResponse,
  PaymentTransferResponse,
  PaginatedResponse
} from '~/api/types/payments'
import { useBaseApi } from './useBaseApi'

export function usePaymentsApi() {
  const baseApi = useBaseApi<Payment>()

  /**
   * Get all payments
   */
  const getPayments = async (params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Payment>> => {
    return await baseApi.executeApiCall(
      () => paymentsApi.getPayments(params),
      'Get Payments'
    ) as PaginatedResponse<Payment>
  }

  /**
   * Create a new payment
   */
  const createPayment = async (paymentData: PaymentCreate): Promise<PaymentCreate | null> => {
    return await baseApi.createItem(
      paymentsApi.createPayment,
      paymentData,
      'Create Payment'
    )
  }

  /**
   * Get payment by ID
   */
  const getPayment = async (id: number): Promise<Payment | null> => {
    return await baseApi.getItem(
      paymentsApi.getPayment,
      id,
      'Get Payment'
    )
  }

  /**
   * Update payment by ID
   */
  const updatePayment = async (id: number, paymentData: PaymentUpdate): Promise<PaymentUpdate | null> => {
    return await baseApi.updateItem(
      paymentsApi.updatePayment,
      id,
      paymentData,
      'Update Payment'
    )
  }

  /**
   * Partially update payment by ID
   */
  const partialUpdatePayment = async (id: number, paymentData: PaymentUpdate): Promise<PaymentUpdate | null> => {
    return await baseApi.updateItem(
      paymentsApi.partialUpdatePayment,
      id,
      paymentData,
      'Partial Update Payment'
    )
  }

  /**
   * Delete payment by ID
   */
  const deletePayment = async (id: number): Promise<void> => {
    await baseApi.deleteItem(
      paymentsApi.deletePayment,
      id,
      'Delete Payment'
    )
  }

  /**
   * Confirm payment
   */
  const confirmPayment = async (confirmData: PaymentConfirm): Promise<PaymentConfirmResponse | null> => {
    return await baseApi.executeApiCall(
      () => paymentsApi.confirmPayment(confirmData),
      'Confirm Payment'
    ) as PaymentConfirmResponse
  }

  /**
   * Transfer payment to provider
   */
  const transferPayment = async (transferData: PaymentTransfer): Promise<PaymentTransferResponse | null> => {
    return await baseApi.executeApiCall(
      () => paymentsApi.transferPayment(transferData),
      'Transfer Payment'
    ) as PaymentTransferResponse
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    payments: baseApi.data,
    
    // Methods
    getPayments,
    createPayment,
    getPayment,
    updatePayment,
    partialUpdatePayment,
    deletePayment,
    confirmPayment,
    transferPayment,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}