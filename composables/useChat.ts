// ============================================================================
// Chat Management Composable
// ============================================================================

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useChatApi } from './useChatApi'
import { useWebSocket } from './useWebSocket'
import { usePagination } from './usePagination'
import { useFilters } from './useFilters'
import { formatDateTime, getRelativeTime } from '~/utils/date'
import { debounced } from '~/utils/debounce'
import type { 
  ChatMessage, 
  ChatConversation, 
  ChatMessageCreate,
  ChatMessageUpdate,
  ChatOnlineStatus,
  ChatTypingStatus
} from '~/api/types/chat'

export function useChat() {
  const chatApi = useChatApi()
  const { 
    isConnected, 
    sendChatMessage, 
    sendTypingStatus, 
    joinConversation, 
    leaveConversation,
    on,
    off
  } = useWebSocket()
  
  const pagination = usePagination({ pageSize: 50 })
  const filters = useFilters({
    initialFilters: {
      search: '',
      message_type: '',
      is_read: ''
    }
  })

  // State
  const conversations = ref<ChatConversation[]>([])
  const currentConversation = ref<ChatConversation | null>(null)
  const messages = ref<ChatMessage[]>([])
  const onlineUsers = ref<ChatOnlineStatus[]>([])
  const typingUsers = ref<Map<number, ChatTypingStatus>>(new Map())
  const selectedMessages = ref<ChatMessage[]>([])
  const isTyping = ref(false)
  const typingTimeout = ref<NodeJS.Timeout | null>(null)

  // Computed
  const hasMessages = computed(() => messages.value.length > 0)
  const unreadCount = computed(() => 
    conversations.value.reduce((total, conv) => total + conv.unread_count, 0)
  )
  const currentConversationId = computed(() => currentConversation.value?.id)
  const isCurrentConversationActive = computed(() => 
    currentConversation.value && !currentConversation.value.is_archived
  )

  // Methods
  const loadConversations = async () => {
    try {
      const response = await chatApi.getConversations({
        page: pagination.pagination.value.currentPage,
        page_size: pagination.pagination.value.pageSize
      })
      
      if (response) {
        conversations.value = response.results || []
        pagination.updateFromResponse(response)
      }
    } catch (error) {
      console.error('Error loading conversations:', error)
    }
  }

  const loadMessages = async (conversationId: number) => {
    try {
      const response = await chatApi.getMessages(conversationId, {
        page: pagination.pagination.value.currentPage,
        page_size: pagination.pagination.value.pageSize,
        ...filters.createParams()
      })
      
      if (response) {
        messages.value = response.results || []
        pagination.updateFromResponse(response)
      }
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const sendMessage = async (messageData: ChatMessageCreate) => {
    if (!currentConversation.value) {
      throw new Error('No active conversation')
    }

    try {
      // Send via API
      const newMessage = await chatApi.sendMessage(currentConversation.value.id, messageData)
      
      if (newMessage) {
        // Add to local messages
        messages.value.push(newMessage)
        
        // Send via WebSocket for real-time delivery
        sendChatMessage(
          currentConversation.value.id,
          messageData.message,
          messageData.message_type || 'text'
        )
        
        return newMessage
      }
    } catch (error) {
      console.error('Error sending message:', error)
      throw error
    }
  }

  const updateMessage = async (messageId: number, data: ChatMessageUpdate) => {
    if (!currentConversation.value) {
      throw new Error('No active conversation')
    }

    try {
      const updatedMessage = await chatApi.updateMessage(
        currentConversation.value.id,
        messageId,
        data
      )
      
      if (updatedMessage) {
        const index = messages.value.findIndex(m => m.id === messageId)
        if (index > -1) {
          messages.value[index] = updatedMessage
        }
        return updatedMessage
      }
    } catch (error) {
      console.error('Error updating message:', error)
      throw error
    }
  }

  const deleteMessage = async (messageId: number) => {
    if (!currentConversation.value) {
      throw new Error('No active conversation')
    }

    try {
      await chatApi.deleteMessage(currentConversation.value.id, messageId)
      messages.value = messages.value.filter(m => m.id !== messageId)
    } catch (error) {
      console.error('Error deleting message:', error)
      throw error
    }
  }

  const markMessageAsRead = async (messageId: number) => {
    if (!currentConversation.value) {
      return
    }

    try {
      await chatApi.markMessageAsRead(currentConversation.value.id, messageId)
      const message = messages.value.find(m => m.id === messageId)
      if (message) {
        message.is_read = true
      }
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const markAllMessagesAsRead = async () => {
    if (!currentConversation.value) {
      return
    }

    try {
      await chatApi.markAllMessagesAsRead(currentConversation.value.id)
      messages.value.forEach(message => {
        message.is_read = true
      })
      
      // Update conversation unread count
      if (currentConversation.value) {
        currentConversation.value.unread_count = 0
      }
    } catch (error) {
      console.error('Error marking all messages as read:', error)
    }
  }

  const selectConversation = async (conversation: ChatConversation) => {
    // Leave previous conversation
    if (currentConversation.value) {
      leaveConversation(currentConversation.value.id)
    }
    
    currentConversation.value = conversation
    
    // Join new conversation
    if (isConnected.value) {
      joinConversation(conversation.id)
    }
    
    // Load messages
    await loadMessages(conversation.id)
    
    // Mark all messages as read
    await markAllMessagesAsRead()
  }

  const createConversation = async (participantIds: number[], initialMessage?: string) => {
    try {
      const conversation = await chatApi.createConversation({
        participant_ids: participantIds,
        initial_message: initialMessage
      })
      
      if (conversation) {
        conversations.value.unshift(conversation)
        return conversation
      }
    } catch (error) {
      console.error('Error creating conversation:', error)
      throw error
    }
  }

  const archiveConversation = async (conversationId: number) => {
    try {
      const conversation = await chatApi.archiveConversation(conversationId)
      if (conversation) {
        const index = conversations.value.findIndex(c => c.id === conversationId)
        if (index > -1) {
          conversations.value[index] = conversation
        }
      }
    } catch (error) {
      console.error('Error archiving conversation:', error)
    }
  }

  const muteConversation = async (conversationId: number) => {
    try {
      const conversation = await chatApi.muteConversation(conversationId)
      if (conversation) {
        const index = conversations.value.findIndex(c => c.id === conversationId)
        if (index > -1) {
          conversations.value[index] = conversation
        }
      }
    } catch (error) {
      console.error('Error muting conversation:', error)
    }
  }

  const handleTyping = debounced.input(() => {
    if (!currentConversation.value || !isConnected.value) {
      return
    }

    if (!isTyping.value) {
      isTyping.value = true
      sendTypingStatus(currentConversation.value.id, true)
    }

    // Clear existing timeout
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }

    // Set timeout to stop typing
    typingTimeout.value = setTimeout(() => {
      isTyping.value = false
      if (currentConversation.value) {
        sendTypingStatus(currentConversation.value.id, false)
      }
    }, 2000)
  })

  const loadOnlineUsers = async () => {
    try {
      const users = await chatApi.getOnlineUsers()
      onlineUsers.value = users || []
    } catch (error) {
      console.error('Error loading online users:', error)
    }
  }

  // WebSocket event handlers
  const handleNewMessage = (data: any) => {
    // Add message to current conversation if it matches
    if (currentConversation.value && data.conversation_id === currentConversation.value.id) {
      // Convert ChatMessageData to ChatMessage format
      const message: ChatMessage = {
        id: data.id,
        sender: { id: data.sender_id, first_name: '', last_name: '', email: '' },
        recipient: { id: 0, first_name: '', last_name: '', email: '' },
        message: data.message,
        message_type: data.message_type as any,
        is_read: false,
        created_at: data.created_at,
        updated_at: data.created_at
      }
      messages.value.push(message)
    }
    
    // Update conversation list
    const conversation = conversations.value.find(c => c.id === data.conversation_id)
    if (conversation) {
      // Update last message
      const message: ChatMessage = {
        id: data.id,
        sender: { id: data.sender_id, first_name: '', last_name: '', email: '' },
        recipient: { id: 0, first_name: '', last_name: '', email: '' },
        message: data.message,
        message_type: data.message_type as any,
        is_read: false,
        created_at: data.created_at,
        updated_at: data.created_at
      }
      conversation.last_message = message
      if (data.conversation_id !== currentConversation.value?.id) {
        conversation.unread_count++
      }
    }
  }

  const handleTypingStatus = (data: ChatTypingStatus) => {
    if (data.is_typing) {
      typingUsers.value.set(data.user_id, data)
    } else {
      typingUsers.value.delete(data.user_id)
    }
  }

  const handleOnlineStatus = (data: ChatOnlineStatus) => {
    const index = onlineUsers.value.findIndex(u => u.user_id === data.user_id)
    if (index > -1) {
      onlineUsers.value[index] = data
    } else {
      onlineUsers.value.push(data)
    }
  }

  // Lifecycle
  onMounted(() => {
    // Register WebSocket handlers
    on('message', handleNewMessage)
    on('typing', handleTypingStatus)
    on('online_status', handleOnlineStatus)
    
    // Load initial data
    loadConversations()
    loadOnlineUsers()
  })

  onUnmounted(() => {
    // Unregister WebSocket handlers
    off('message', handleNewMessage)
    off('typing', handleTypingStatus)
    off('online_status', handleOnlineStatus)
    
    // Clean up typing timeout
    if (typingTimeout.value) {
      clearTimeout(typingTimeout.value)
    }
  })

  return {
    // State
    conversations: readonly(conversations),
    currentConversation: readonly(currentConversation),
    messages: readonly(messages),
    onlineUsers: readonly(onlineUsers),
    typingUsers: readonly(typingUsers),
    selectedMessages: readonly(selectedMessages),
    isTyping: readonly(isTyping),
    
    // Computed
    hasMessages,
    unreadCount,
    currentConversationId,
    isCurrentConversationActive,
    
    // Pagination
    pagination: pagination.pagination,
    visiblePages: pagination.visiblePages,
    canGoNext: pagination.canGoNext,
    canGoPrevious: pagination.canGoPrevious,
    
    // Filters
    filters: filters.filters,
    
    // Methods
    loadConversations,
    loadMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
    markMessageAsRead,
    markAllMessagesAsRead,
    selectConversation,
    createConversation,
    archiveConversation,
    muteConversation,
    handleTyping,
    loadOnlineUsers,
    
    // Pagination methods
    changePage: pagination.changePage,
    
    // Filter methods
    clearFilters: filters.clear,
    
    // Utility functions
    formatDateTime,
    getRelativeTime
  }
}