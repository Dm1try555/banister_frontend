// ============================================================================
// Chat API Service
// ============================================================================

import type {
  ChatMessage,
  ChatMessageCreate,
  ChatMessageUpdate,
  ChatConversation,
  ChatConversationCreate,
  ChatSearchParams,
  ChatOnlineStatus,
  ChatTypingStatus,
  ChatStats,
  PaginatedResponse
} from '../../types/chat'

import { useApi } from '~/utils/api'

export const chatApi = {
  /**
   * Get all conversations
   */
  async getConversations(params?: { page?: number; page_size?: number; search?: string }): Promise<PaginatedResponse<ChatConversation>> {
    const api = useApi()
    return await api.get('chat/conversations/', params)
  },

  /**
   * Create a new conversation
   */
  async createConversation(data: ChatConversationCreate): Promise<ChatConversation> {
    const api = useApi()
    return await api.post('chat/conversations/', data)
  },

  /**
   * Get conversation by ID
   */
  async getConversation(id: number): Promise<ChatConversation> {
    const api = useApi()
    return await api.get(`chat/conversations/${id}/`)
  },

  /**
   * Update conversation
   */
  async updateConversation(id: number, data: Partial<ChatConversation>): Promise<ChatConversation> {
    const api = useApi()
    return await api.patch(`chat/conversations/${id}/`, data)
  },

  /**
   * Delete conversation
   */
  async deleteConversation(id: number): Promise<void> {
    const api = useApi()
    return await api.delete(`chat/conversations/${id}/`)
  },

  /**
   * Archive conversation
   */
  async archiveConversation(id: number): Promise<ChatConversation> {
    const api = useApi()
    return await api.patch(`chat/conversations/${id}/archive/`)
  },

  /**
   * Mute conversation
   */
  async muteConversation(id: number): Promise<ChatConversation> {
    const api = useApi()
    return await api.patch(`chat/conversations/${id}/mute/`)
  },

  /**
   * Get messages in conversation
   */
  async getMessages(conversationId: number, params?: ChatSearchParams): Promise<PaginatedResponse<ChatMessage>> {
    const api = useApi()
    return await api.get(`chat/conversations/${conversationId}/messages/`, params)
  },

  /**
   * Send a new message
   */
  async sendMessage(conversationId: number, data: ChatMessageCreate): Promise<ChatMessage> {
    const api = useApi()
    return await api.post(`chat/conversations/${conversationId}/messages/`, data)
  },

  /**
   * Get message by ID
   */
  async getMessage(conversationId: number, messageId: number): Promise<ChatMessage> {
    const api = useApi()
    return await api.get(`chat/conversations/${conversationId}/messages/${messageId}/`)
  },

  /**
   * Update message
   */
  async updateMessage(conversationId: number, messageId: number, data: ChatMessageUpdate): Promise<ChatMessage> {
    const api = useApi()
    return await api.patch(`chat/conversations/${conversationId}/messages/${messageId}/`, data)
  },

  /**
   * Delete message
   */
  async deleteMessage(conversationId: number, messageId: number): Promise<void> {
    const api = useApi()
    return await api.delete(`chat/conversations/${conversationId}/messages/${messageId}/`)
  },

  /**
   * Mark message as read
   */
  async markMessageAsRead(conversationId: number, messageId: number): Promise<ChatMessage> {
    const api = useApi()
    return await api.patch(`chat/conversations/${conversationId}/messages/${messageId}/mark-read/`)
  },

  /**
   * Mark all messages as read in conversation
   */
  async markAllMessagesAsRead(conversationId: number): Promise<any> {
    const api = useApi()
    return await api.patch(`chat/conversations/${conversationId}/mark-all-read/`)
  },

  /**
   * Get online users
   */
  async getOnlineUsers(): Promise<ChatOnlineStatus[]> {
    const api = useApi()
    return await api.get('chat/online-users/')
  },

  /**
   * Update typing status
   */
  async updateTypingStatus(conversationId: number, isTyping: boolean): Promise<ChatTypingStatus> {
    const api = useApi()
    return await api.post('chat/typing-status/', {
      conversation_id: conversationId,
      is_typing: isTyping
    })
  },

  /**
   * Get chat statistics
   */
  async getChatStats(): Promise<ChatStats> {
    const api = useApi()
    return await api.get('chat/stats/')
  },

  /**
   * Search messages
   */
  async searchMessages(params: ChatSearchParams): Promise<PaginatedResponse<ChatMessage>> {
    const api = useApi()
    return await api.get('chat/search/', params)
  },

  /**
   * Upload file attachment
   */
  async uploadAttachment(file: File): Promise<any> {
    const api = useApi()
    const formData = new FormData()
    formData.append('file', file)
    return await api.post('chat/attachments/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}