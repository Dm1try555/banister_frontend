// ============================================================================
// WebSocket Composable for Real-time Chat
// ============================================================================

import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useStorage } from './useStorage'

export interface WebSocketMessage {
  type: 'message' | 'typing' | 'online_status' | 'notification' | 'error'
  data: any
  timestamp: string
}

export interface ChatMessageData {
  id: number
  conversation_id: number
  sender_id: number
  message: string
  message_type: string
  created_at: string
}

export interface TypingData {
  user_id: number
  conversation_id: number
  is_typing: boolean
}

export interface OnlineStatusData {
  user_id: number
  is_online: boolean
  last_seen: string
}

export function useWebSocket() {
  const { getItem } = useStorage()
  
  const socket = ref<WebSocket | null>(null)
  const isConnected = ref(false)
  const isConnecting = ref(false)
  const reconnectAttempts = ref(0)
  const maxReconnectAttempts = 5
  const reconnectDelay = ref(1000)
  
  // Message handlers
  const messageHandlers = ref<Map<string, Function[]>>(new Map())
  
  // Connection status
  const connectionStatus = computed(() => {
    if (isConnecting.value) return 'connecting'
    if (isConnected.value) return 'connected'
    return 'disconnected'
  })

  /**
   * Connect to WebSocket
   */
  const connect = async () => {
    if (socket.value?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      isConnecting.value = true
      
      const accessToken = getItem('access_token')
      if (!accessToken) {
        throw new Error('No access token available')
      }

      // WebSocket URL with authentication
      const wsUrl = `ws://localhost:8000/ws/chat/?token=${accessToken}`
      socket.value = new WebSocket(wsUrl)

      socket.value.onopen = () => {
        console.log('WebSocket connected')
        isConnected.value = true
        isConnecting.value = false
        reconnectAttempts.value = 0
        reconnectDelay.value = 1000
        emit('connection_status', { status: 'connected' })
      }

      socket.value.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          handleMessage(message)
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      socket.value.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        isConnected.value = false
        isConnecting.value = false
        emit('connection_status', { status: 'disconnected' })
        
        // Attempt to reconnect if not a normal closure
        if (event.code !== 1000 && reconnectAttempts.value < maxReconnectAttempts) {
          setTimeout(() => {
            reconnectAttempts.value++
            reconnectDelay.value *= 2
            connect()
          }, reconnectDelay.value)
        }
      }

      socket.value.onerror = (error) => {
        console.error('WebSocket error:', error)
        isConnecting.value = false
        emit('connection_status', { status: 'error', error })
      }

    } catch (error) {
      console.error('Error connecting to WebSocket:', error)
      isConnecting.value = false
      throw error
    }
  }

  /**
   * Disconnect from WebSocket
   */
  const disconnect = () => {
    if (socket.value) {
      socket.value.close(1000, 'Normal closure')
      socket.value = null
    }
    isConnected.value = false
    isConnecting.value = false
  }

  /**
   * Send message through WebSocket
   */
  const sendMessage = (type: string, data: any) => {
    if (!socket.value || socket.value.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket is not connected')
      return false
    }

    try {
      const message: WebSocketMessage = {
        type: type as any,
        data,
        timestamp: new Date().toISOString()
      }
      
      socket.value.send(JSON.stringify(message))
      return true
    } catch (error) {
      console.error('Error sending WebSocket message:', error)
      return false
    }
  }

  /**
   * Handle incoming messages
   */
  const handleMessage = (message: WebSocketMessage) => {
    console.log('Received WebSocket message:', message)
    
    // Emit to specific handlers
    const handlers = messageHandlers.value.get(message.type) || []
    handlers.forEach(handler => {
      try {
        handler(message.data)
      } catch (error) {
        console.error('Error in message handler:', error)
      }
    })
    
    // Emit to general handler
    emit('message', message)
  }

  /**
   * Register message handler
   */
  const on = (type: string, handler: Function) => {
    if (!messageHandlers.value.has(type)) {
      messageHandlers.value.set(type, [])
    }
    messageHandlers.value.get(type)!.push(handler)
  }

  /**
   * Unregister message handler
   */
  const off = (type: string, handler: Function) => {
    const handlers = messageHandlers.value.get(type)
    if (handlers) {
      const index = handlers.indexOf(handler)
      if (index > -1) {
        handlers.splice(index, 1)
      }
    }
  }

  /**
   * Emit event (for compatibility)
   */
  const emit = (event: string, data: any) => {
    // This can be extended to use an event emitter if needed
    console.log(`Event: ${event}`, data)
  }

  /**
   * Send chat message
   */
  const sendChatMessage = (conversationId: number, message: string, messageType: string = 'text') => {
    return sendMessage('message', {
      conversation_id: conversationId,
      message,
      message_type: messageType
    })
  }

  /**
   * Send typing status
   */
  const sendTypingStatus = (conversationId: number, isTyping: boolean) => {
    return sendMessage('typing', {
      conversation_id: conversationId,
      is_typing: isTyping
    })
  }

  /**
   * Join conversation
   */
  const joinConversation = (conversationId: number) => {
    return sendMessage('join_conversation', {
      conversation_id: conversationId
    })
  }

  /**
   * Leave conversation
   */
  const leaveConversation = (conversationId: number) => {
    return sendMessage('leave_conversation', {
      conversation_id: conversationId
    })
  }

  // Lifecycle
  onMounted(() => {
    // Auto-connect if user is authenticated
    const accessToken = getItem('access_token')
    if (accessToken) {
      connect()
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    // State
    isConnected: readonly(isConnected),
    isConnecting: readonly(isConnecting),
    connectionStatus,
    reconnectAttempts: readonly(reconnectAttempts),
    
    // Methods
    connect,
    disconnect,
    sendMessage,
    on,
    off,
    
    // Chat specific methods
    sendChatMessage,
    sendTypingStatus,
    joinConversation,
    leaveConversation
  }
}