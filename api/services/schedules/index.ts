// ============================================================================
// Schedules API Service
// ============================================================================

import type {
  Schedule,
  ScheduleCreate,
  ScheduleUpdate,
  PaginatedResponse
} from '../../types/schedules'

import { useApi } from '~/utils/api'

export const schedulesApi = {
  /**
   * List all schedules
   */
  async getSchedules(params?: { page?: number }): Promise<PaginatedResponse<Schedule>> {
    const api = useApi()
    return await api.get('schedules/', { params })
  },

  /**
   * Create a new schedule
   */
  async createSchedule(data: ScheduleCreate): Promise<ScheduleCreate> {
    const api = useApi()
    return await api.post('schedules/', data)
  },

  /**
   * Get schedule by ID
   */
  async getSchedule(id: number): Promise<Schedule> {
    const api = useApi()
    return await api.get(`schedules/${id}/`)
  },

  /**
   * Update schedule by ID
   */
  async updateSchedule(id: number, data: ScheduleUpdate): Promise<ScheduleUpdate> {
    const api = useApi()
    return await api.put(`schedules/${id}/`, data)
  },

  /**
   * Partially update schedule by ID
   */
  async partialUpdateSchedule(id: number, data: ScheduleUpdate): Promise<ScheduleUpdate> {
    const api = useApi()
    return await api.patch(`schedules/${id}/`, data)
  },

  /**
   * Delete schedule by ID
   */
  async deleteSchedule(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`schedules/${id}/`)
  }
}