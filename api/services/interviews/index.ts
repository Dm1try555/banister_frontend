// ============================================================================
// Interviews API Service
// ============================================================================

import type {
  Interview,
  InterviewCreate,
  InterviewUpdate,
  PaginatedResponse
} from '../../types/interviews'

import { useApi } from '~/utils/api'

export const interviewsApi = {
  /**
   * List all interviews
   */
  async getInterviews(params?: { page?: number }): Promise<PaginatedResponse<Interview>> {
    const api = useApi()
    return await api.get('interviews/', { params })
  },

  /**
   * Create a new interview
   */
  async createInterview(data: InterviewCreate): Promise<InterviewCreate> {
    const api = useApi()
    return await api.post('interviews/', data)
  },

  /**
   * Get interview by ID
   */
  async getInterview(id: number): Promise<Interview> {
    const api = useApi()
    return await api.get(`interviews/${id}/`)
  },

  /**
   * Update interview by ID
   */
  async updateInterview(id: number, data: InterviewUpdate): Promise<InterviewUpdate> {
    const api = useApi()
    return await api.put(`interviews/${id}/`, data)
  },

  /**
   * Partially update interview by ID
   */
  async partialUpdateInterview(id: number, data: InterviewUpdate): Promise<InterviewUpdate> {
    const api = useApi()
    return await api.patch(`interviews/${id}/`, data)
  },

  /**
   * Delete interview by ID
   */
  async deleteInterview(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`interviews/${id}/`)
  }
}