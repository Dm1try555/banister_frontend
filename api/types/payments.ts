// ============================================================================
// Payments Types
// ============================================================================

export interface Payment {
  id: number
  booking: number
  amount: string
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method: string
  stripe_payment_intent_id?: string
  created_at: string
  updated_at: string
}

export interface PaymentCreate {
  booking: number
  amount: string
  payment_method?: string
}

export interface PaymentUpdate {
  booking?: number
  amount?: string
  status?: 'pending' | 'completed' | 'failed' | 'refunded'
  payment_method?: string
  stripe_payment_intent_id?: string
}

export interface PaymentConfirm {
  payment_intent_id: string
}

export interface PaymentTransfer {
  provider_stripe_account: string
  amount: string
  notes?: string
}

export interface PaymentConfirmResponse {
  success: boolean
  message: string
}

export interface PaymentTransferResponse {
  success: boolean
  transfer_id: string
  message: string
}

export interface PaginatedResponse<T> {
  count: number
  next?: string
  previous?: string
  results: T[]
}