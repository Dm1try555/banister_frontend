// ============================================================================
// Withdrawals API Service
// ============================================================================

import type {
  Withdrawal,
  WithdrawalCreate,
  WithdrawalUpdate,
  WithdrawalApprove,
  WithdrawalReject,
  WithdrawalActionResponse,
  PaginatedResponse
} from '../../types/withdrawals'

import { useApi } from '~/utils/api'

export const withdrawalsApi = {
  /**
   * Get all withdrawals
   */
  async getWithdrawals(params?: { page?: number; page_size?: number; search?: string; status?: string; date_from?: string; date_to?: string }): Promise<PaginatedResponse<Withdrawal>> {
    const api = useApi()
    return await api.get('withdrawals/', { params })
  },

  /**
   * Create a new withdrawal
   */
  async createWithdrawal(withdrawalData: WithdrawalCreate): Promise<WithdrawalCreate> {
    const api = useApi()
    return await api.post('withdrawals/', withdrawalData)
  },

  /**
   * Get withdrawal by ID
   */
  async getWithdrawal(id: number): Promise<Withdrawal> {
    const api = useApi()
    return await api.get(`withdrawals/${id}/`)
  },

  /**
   * Update withdrawal by ID
   */
  async updateWithdrawal(id: number, withdrawalData: WithdrawalUpdate): Promise<WithdrawalUpdate> {
    const api = useApi()
    return await api.put(`withdrawals/${id}/`, withdrawalData)
  },

  /**
   * Partially update withdrawal by ID
   */
  async partialUpdateWithdrawal(id: number, withdrawalData: WithdrawalUpdate): Promise<WithdrawalUpdate> {
    const api = useApi()
    return await api.patch(`withdrawals/${id}/`, withdrawalData)
  },

  /**
   * Delete withdrawal by ID
   */
  async deleteWithdrawal(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`withdrawals/${id}/`)
  },

  /**
   * Approve withdrawal
   */
  async approveWithdrawal(id: number, approveData: WithdrawalApprove): Promise<WithdrawalActionResponse> {
    const api = useApi()
    return await api.post(`withdrawals/${id}/approve/`, approveData)
  },

  /**
   * Reject withdrawal
   */
  async rejectWithdrawal(id: number, rejectData: WithdrawalReject): Promise<WithdrawalActionResponse> {
    const api = useApi()
    return await api.post(`withdrawals/${id}/reject/`, rejectData)
  }
}