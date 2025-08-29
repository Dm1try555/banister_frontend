<template>
  <div class="chat-window d-flex flex-column h-100">
    <!-- Header -->
    <div class="chat-header d-flex align-items-center justify-content-between p-3 border-bottom bg-white">
      <div class="d-flex align-items-center">
        <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white me-3"
             style="width: 40px; height: 40px;">
          <Icon name="heroicons:chat-bubble-left-right" size="20" />
        </div>
        <div>
          <h6 class="mb-0 fw-semibold" style="font-family: var(--font-inter);">
            {{ currentConversation?.participants?.map(p => p.first_name).join(', ') || 'Выберите чат' }}
          </h6>
          <small class="text-muted">
            {{ getOnlineStatus() }}
          </small>
        </div>
      </div>
      <div class="d-flex gap-2">
        <button 
          v-if="currentConversation"
          class="btn btn-sm btn-outline-secondary"
          @click="markAllAsRead"
          :disabled="loading"
        >
          <Icon name="heroicons:check" size="14" />
        </button>
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <Icon name="heroicons:ellipsis-vertical" size="14" />
          </button>
          <ul class="dropdown-menu dropdown-menu-end">
            <li v-if="currentConversation">
              <a class="dropdown-item" @click="muteConversation(currentConversation.id)">
                <Icon name="heroicons:speaker-x-mark" size="14" class="me-2" />
                {{ currentConversation.is_muted ? 'Включить звук' : 'Отключить звук' }}
              </a>
            </li>
            <li v-if="currentConversation">
              <a class="dropdown-item" @click="archiveConversation(currentConversation.id)">
                <Icon name="heroicons:archive-box" size="14" class="me-2" />
                Архивировать
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a class="dropdown-item text-danger" @click="clearChat">
                <Icon name="heroicons:trash" size="14" class="me-2" />
                Очистить чат
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Messages Area -->
    <div class="chat-messages flex-grow-1 p-3" ref="messagesContainer">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border spinner-border-sm text-primary" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>
      
      <div v-else-if="!hasMessages" class="text-center py-5">
        <Icon name="heroicons:chat-bubble-left-right" size="64" class="text-muted mb-3" />
        <h5 class="text-muted">Начните общение</h5>
        <p class="text-muted">Отправьте первое сообщение</p>
      </div>
      
      <div v-else class="messages-list">
        <div 
          v-for="message in messages" 
          :key="message.id"
          class="message-item mb-3"
          :class="{ 'message-own': isOwnMessage(message) }"
        >
          <div class="d-flex" :class="{ 'justify-content-end': isOwnMessage(message) }">
            <div class="message-content" :class="{ 'message-own-content': isOwnMessage(message) }">
              <div v-if="!isOwnMessage(message)" class="message-sender mb-1">
                <small class="text-muted fw-medium">
                  {{ message.sender.first_name }} {{ message.sender.last_name }}
                </small>
              </div>
              <div class="message-bubble p-3 rounded-3" :class="getMessageBubbleClass(message)">
                <div class="message-text">
                  {{ message.message }}
                </div>
                <div class="message-time mt-2">
                  <small class="text-muted">
                    {{ formatDateTime(message.created_at) }}
                    <Icon v-if="isOwnMessage(message)" 
                          :name="message.is_read ? 'heroicons:check-circle' : 'heroicons:check'" 
                          size="12" 
                          class="ms-1" 
                          :class="message.is_read ? 'text-primary' : 'text-muted'" />
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div v-if="typingUsers.size > 0" class="typing-indicator mb-3">
          <div class="d-flex align-items-center">
            <div class="typing-dots me-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <small class="text-muted">
              {{ getTypingText() }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div v-if="currentConversation" class="chat-input p-3 border-top bg-white">
      <div class="d-flex align-items-end gap-2">
        <div class="flex-grow-1">
          <textarea 
            v-model="newMessage"
            class="form-control"
            placeholder="Введите сообщение..."
            rows="1"
            @keydown="handleKeyDown"
            @input="handleTyping"
            ref="messageInput"
          ></textarea>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary" @click="attachFile">
            <Icon name="heroicons:paper-clip" size="16" />
          </button>
          <button 
            class="btn btn-primary"
            @click="sendMessage"
            :disabled="!newMessage.trim() || loading"
          >
            <Icon name="heroicons:paper-airplane" size="16" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { useChat } from '~/composables/useChat'
import { formatDateTime } from '~/utils/date'

// Props
const props = defineProps({
  conversationId: {
    type: Number,
    default: null
  }
})

// Composables
const {
  currentConversation,
  messages,
  typingUsers,
  loading,
  hasMessages,
  sendMessage: sendChatMessage,
  markAllMessagesAsRead,
  archiveConversation,
  muteConversation,
  handleTyping,
  formatDateTime: formatDateTimeUtil
} = useChat()

// State
const newMessage = ref('')
const messageInput = ref(null)
const messagesContainer = ref(null)

// Computed
const isOwnMessage = (message) => {
  // This should be compared with current user ID
  // For now, we'll use a simple check
  return message.sender.id === 1 // Replace with actual current user ID
}

// Methods
const sendMessage = async () => {
  if (!newMessage.value.trim() || !currentConversation.value) {
    return
  }

  try {
    await sendChatMessage({
      recipient_id: currentConversation.value.participants[0].id, // Simplified
      message: newMessage.value.trim(),
      message_type: 'text'
    })
    
    newMessage.value = ''
    await nextTick()
    scrollToBottom()
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

const handleKeyDown = (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    sendMessage()
  }
}

const handleTypingInput = () => {
  handleTyping()
}

const attachFile = () => {
  // Implement file attachment
  }

const markAllAsRead = async () => {
  try {
    await markAllMessagesAsRead()
  } catch (error) {
    console.error('Error marking messages as read:', error)
  }
}

const muteConversationHandler = async (conversationId) => {
  try {
    await muteConversation(conversationId)
  } catch (error) {
    console.error('Error muting conversation:', error)
  }
}

const archiveConversationHandler = async (conversationId) => {
  try {
    await archiveConversation(conversationId)
  } catch (error) {
    console.error('Error archiving conversation:', error)
  }
}

const clearChat = () => {
  if (confirm('Вы уверены, что хотите очистить чат?')) {
    // Implement clear chat functionality
    }
}

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const getOnlineStatus = () => {
  if (!currentConversation.value) return ''
  
  const onlineCount = currentConversation.value.participants.filter(p => p.is_online).length
  if (onlineCount > 0) {
    return `${onlineCount} онлайн`
  }
  return 'Офлайн'
}

const getTypingText = () => {
  const typingCount = typingUsers.size
  if (typingCount === 1) {
    return 'печатает...'
  } else if (typingCount > 1) {
    return `${typingCount} печатают...`
  }
  return ''
}

const getMessageBubbleClass = (message) => {
  if (isOwnMessage(message)) {
    return 'bg-primary text-white'
  }
  return 'bg-light'
}

// Lifecycle
onMounted(() => {
  // Auto-scroll to bottom when messages change
  const observer = new MutationObserver(() => {
    scrollToBottom()
  })
  
  if (messagesContainer.value) {
    observer.observe(messagesContainer.value, { childList: true, subtree: true })
  }
  
  // Focus message input
  if (messageInput.value) {
    messageInput.value.focus()
  }
})

onUnmounted(() => {
  // Cleanup observer if needed
})
</script>

<style scoped>
.chat-window {
  height: 600px;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
}

.chat-messages {
  overflow-y: auto;
  max-height: 400px;
}

.message-content {
  max-width: 70%;
}

.message-own-content {
  max-width: 70%;
}

.message-bubble {
  word-wrap: break-word;
  position: relative;
}

.message-own .message-bubble {
  background-color: var(--color-primary-green) !important;
  color: white !important;
}

.typing-indicator {
  padding: 0.5rem 1rem;
}

.typing-dots {
  display: flex;
  gap: 0.25rem;
}

.typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #6c757d;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.typing-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-messages::-webkit-scrollbar {
  width: 6px;
}

.chat-messages::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.chat-messages::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>