// ============================================================================
// Withdrawals Types
// ============================================================================

export interface Withdrawal {
  id: number
  user: number
  amount: string
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  stripe_account_id: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface WithdrawalCreate {
  amount: string
  stripe_account_id: string
  notes?: string
}

export interface WithdrawalUpdate {
  amount?: string
  status?: 'pending' | 'approved' | 'rejected' | 'completed'
  stripe_account_id?: string
  notes?: string
}

export interface WithdrawalApprove {
  notes?: string
}

export interface WithdrawalReject {
  reason: string
}

export interface WithdrawalActionResponse {
  success: boolean
  message: string
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}