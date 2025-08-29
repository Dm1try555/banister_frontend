// ============================================================================
// Documents API Service
// ============================================================================

import type {
  Document,
  DocumentCreate,
  DocumentUpdate,
  PaginatedResponse
} from '../../types/documents'

import { useApi } from '~/utils/api'

export const documentsApi = {
  /**
   * List all documents
   */
  async getDocuments(params?: { page?: number }): Promise<PaginatedResponse<Document>> {
    const api = useApi()
    return await api.get('documents/', { params })
  },

  /**
   * Create a new document
   */
  async createDocument(data: DocumentCreate): Promise<DocumentCreate> {
    const api = useApi()
    return await api.post('documents/', data)
  },

  /**
   * Get document by ID
   */
  async getDocument(id: number): Promise<Document> {
    const api = useApi()
    return await api.get(`documents/${id}/`)
  },

  /**
   * Update document by ID
   */
  async updateDocument(id: number, data: DocumentUpdate): Promise<DocumentUpdate> {
    const api = useApi()
    return await api.put(`documents/${id}/`, data)
  },

  /**
   * Partially update document by ID
   */
  async partialUpdateDocument(id: number, data: DocumentUpdate): Promise<DocumentUpdate> {
    const api = useApi()
    return await api.patch(`documents/${id}/`, data)
  },

  /**
   * Delete document by ID
   */
  async deleteDocument(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`documents/${id}/`)
  }
}