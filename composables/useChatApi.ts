// ============================================================================
// Chat API Composable
// ============================================================================

import { chatApi } from '~/api/services/chat'
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
} from '~/api/types/chat'
import { useBaseApi } from './useBaseApi'

export function useChatApi() {
  const baseApi = useBaseApi<ChatMessage>()

  /**
   * Get all conversations
   */
  const getConversations = async (params?: { page?: number; page_size?: number; search?: string }): Promise<PaginatedResponse<ChatConversation>> => {
    return await baseApi.executeApiCall(
      () => chatApi.getConversations(params),
      'Get Conversations'
    ) as PaginatedResponse<ChatConversation>
  }

  /**
   * Create a new conversation
   */
  const createConversation = async (data: ChatConversationCreate): Promise<ChatConversation | null> => {
    return await baseApi.createItem(
      chatApi.createConversation,
      data,
      'Create Conversation'
    )
  }

  /**
   * Get conversation by ID
   */
  const getConversation = async (id: number): Promise<ChatConversation | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.getConversation(id),
      'Get Conversation'
    ) as ChatConversation
  }

  /**
   * Update conversation
   */
  const updateConversation = async (id: number, data: Partial<ChatConversation>): Promise<ChatConversation | null> => {
    return await baseApi.updateItem(
      chatApi.updateConversation,
      id,
      data,
      'Update Conversation'
    )
  }

  /**
   * Delete conversation
   */
  const deleteConversation = async (id: number): Promise<void> => {
    await baseApi.executeApiCall(
      () => chatApi.deleteConversation(id),
      'Delete Conversation'
    )
  }

  /**
   * Archive conversation
   */
  const archiveConversation = async (id: number): Promise<ChatConversation | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.archiveConversation(id),
      'Archive Conversation'
    ) as ChatConversation
  }

  /**
   * Mute conversation
   */
  const muteConversation = async (id: number): Promise<ChatConversation | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.muteConversation(id),
      'Mute Conversation'
    ) as ChatConversation
  }

  /**
   * Get messages in conversation
   */
  const getMessages = async (conversationId: number, params?: ChatSearchParams): Promise<PaginatedResponse<ChatMessage>> => {
    return await baseApi.executeApiCall(
      () => chatApi.getMessages(conversationId, params),
      'Get Messages'
    ) as PaginatedResponse<ChatMessage>
  }

  /**
   * Send a new message
   */
  const sendMessage = async (conversationId: number, data: ChatMessageCreate): Promise<ChatMessage | null> => {
    return await baseApi.createItem(
      (messageData) => chatApi.sendMessage(conversationId, messageData),
      data,
      'Send Message'
    )
  }

  /**
   * Get message by ID
   */
  const getMessage = async (conversationId: number, messageId: number): Promise<ChatMessage | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.getMessage(conversationId, messageId),
      'Get Message'
    ) as ChatMessage
  }

  /**
   * Update message
   */
  const updateMessage = async (conversationId: number, messageId: number, data: ChatMessageUpdate): Promise<ChatMessage | null> => {
    return await baseApi.updateItem(
      (id, messageData) => chatApi.updateMessage(conversationId, id, messageData),
      messageId,
      data,
      'Update Message'
    )
  }

  /**
   * Delete message
   */
  const deleteMessage = async (conversationId: number, messageId: number): Promise<void> => {
    await baseApi.executeApiCall(
      () => chatApi.deleteMessage(conversationId, messageId),
      'Delete Message'
    )
  }

  /**
   * Mark message as read
   */
  const markMessageAsRead = async (conversationId: number, messageId: number): Promise<ChatMessage | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.markMessageAsRead(conversationId, messageId),
      'Mark Message as Read'
    ) as ChatMessage
  }

  /**
   * Mark all messages as read in conversation
   */
  const markAllMessagesAsRead = async (conversationId: number): Promise<any> => {
    return await baseApi.executeApiCall(
      () => chatApi.markAllMessagesAsRead(conversationId),
      'Mark All Messages as Read'
    )
  }

  /**
   * Get online users
   */
  const getOnlineUsers = async (): Promise<ChatOnlineStatus[]> => {
    return await baseApi.executeApiCall(
      () => chatApi.getOnlineUsers(),
      'Get Online Users'
    ) as ChatOnlineStatus[]
  }

  /**
   * Update typing status
   */
  const updateTypingStatus = async (conversationId: number, isTyping: boolean): Promise<ChatTypingStatus | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.updateTypingStatus(conversationId, isTyping),
      'Update Typing Status'
    ) as ChatTypingStatus
  }

  /**
   * Get chat statistics
   */
  const getChatStats = async (): Promise<ChatStats | null> => {
    return await baseApi.executeApiCall(
      () => chatApi.getChatStats(),
      'Get Chat Stats'
    ) as ChatStats
  }

  /**
   * Search messages
   */
  const searchMessages = async (params: ChatSearchParams): Promise<PaginatedResponse<ChatMessage>> => {
    return await baseApi.executeApiCall(
      () => chatApi.searchMessages(params),
      'Search Messages'
    ) as PaginatedResponse<ChatMessage>
  }

  /**
   * Upload file attachment
   */
  const uploadAttachment = async (file: File): Promise<any> => {
    return await baseApi.executeApiCall(
      () => chatApi.uploadAttachment(file),
      'Upload Attachment'
    )
  }

  return {
    // State
    loading: baseApi.loading,
    error: baseApi.error,
    data: baseApi.data,
    
    // Conversation methods
    getConversations,
    createConversation,
    getConversation,
    updateConversation,
    deleteConversation,
    archiveConversation,
    muteConversation,
    
    // Message methods
    getMessages,
    sendMessage,
    getMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    markAllMessagesAsRead,
    
    // Status methods
    getOnlineUsers,
    updateTypingStatus,
    
    // Utility methods
    getChatStats,
    searchMessages,
    uploadAttachment,
    
    // Base API methods
    clearError: baseApi.clearError,
    resetState: baseApi.resetState
  }
}