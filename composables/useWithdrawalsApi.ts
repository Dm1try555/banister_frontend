// ============================================================================
// Withdrawals API Composable
// ============================================================================

import { withdrawalsApi } from '~/api/services/withdrawals'
import type { 
  Withdrawal, 
  WithdrawalCreate, 
  WithdrawalUpdate,
  WithdrawalApprove,
  WithdrawalReject,
  WithdrawalActionResponse,
  PaginatedResponse
} from '~/api/types/withdrawals'
import { useBaseApi } from './useBaseApi'

export function useWithdrawalsApi() {
  const baseApi = useBaseApi<Withdrawal>()

  /**
   * Get all withdrawals
   */
  const getWithdrawals = async (params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Withdrawal>> => {
    return await baseApi.executeApiCall(
      () => withdrawalsApi.getWithdrawals(params),
      'Get Withdrawals'
    ) as PaginatedResponse<Withdrawal>
  }

  /**
   * Create a new withdrawal
   */
  const createWithdrawal = async (withdrawalData: WithdrawalCreate): Promise<WithdrawalCreate | null> => {
    return await baseApi.createItem(
      withdrawalsApi.createWithdrawal,
      withdrawalData,
      'Create Withdrawal'
    )
  }

  /**
   * Get withdrawal by ID
   */
  const getWithdrawal = async (id: number): Promise<Withdrawal | null> => {
    return await baseApi.getItem(
      withdrawalsApi.getWithdrawal,
      id,
      'Get Withdrawal'
    )
  }

  /**
   * Update withdrawal by ID
   */
  const updateWithdrawal = async (id: number, withdrawalData: WithdrawalUpdate): Promise<WithdrawalUpdate | null> => {
    return await baseApi.updateItem(
      withdrawalsApi.updateWithdrawal,
      id,
      withdrawalData,
      'Update Withdrawal'
    )
  }

  /**
   * Partially update withdrawal by ID
   */
  const partialUpdateWithdrawal = async (id: number, withdrawalData: WithdrawalUpdate): Promise<WithdrawalUpdate | null> => {
    return await baseApi.updateItem(
      withdrawalsApi.partialUpdateWithdrawal,
      id,
      withdrawalData,
      'Partial Update Withdrawal'
    )
  }

  /**
   * Delete withdrawal by ID
   */
  const deleteWithdrawal = async (id: number): Promise<void> => {
    await baseApi.deleteItem(
      withdrawalsApi.deleteWithdrawal,
      id,
      'Delete Withdrawal'
    )
  }

  /**
   * Approve withdrawal
   */
  const approveWithdrawal = async (id: number, approveData: WithdrawalApprove): Promise<WithdrawalActionResponse | null> => {
    return await baseApi.executeApiCall(
      () => withdrawalsApi.approveWithdrawal(id, approveData),
      'Approve Withdrawal'
    ) as WithdrawalActionResponse
  }

  /**
   * Reject withdrawal
   */
  const rejectWithdrawal = async (id: number, rejectData: WithdrawalReject): Promise<WithdrawalActionResponse | null> => {
    return await baseApi.executeApiCall(
      () => withdrawalsApi.rejectWithdrawal(id, rejectData),
      'Reject Withdrawal'
    ) as WithdrawalActionResponse
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    withdrawals: baseApi.data,
    
    // Methods
    getWithdrawals,
    createWithdrawal,
    getWithdrawal,
    updateWithdrawal,
    partialUpdateWithdrawal,
    deleteWithdrawal,
    approveWithdrawal,
    rejectWithdrawal,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}