<template>
  <div class="chat-list">
    <!-- Header -->
    <div class="chat-list-header p-3 border-bottom bg-white">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0 fw-semibold" style="font-family: var(--font-inter);">
          Чаты
        </h5>
        <button class="btn btn-primary btn-sm" @click="createNewChat">
          <Icon name="heroicons:plus" size="16" class="me-1" />
          Новый чат
        </button>
      </div>
      
      <!-- Search -->
      <div class="position-relative">
        <input 
          v-model="searchQuery"
          type="text" 
          class="form-control form-control-sm"
          placeholder="Поиск чатов..."
          @input="debouncedSearch"
        />
        <Icon name="heroicons:magnifying-glass" size="16" class="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
      </div>
    </div>

    <!-- Online Users -->
    <div v-if="onlineUsers.length > 0" class="online-users p-3 border-bottom bg-light">
      <h6 class="mb-2 small text-muted">Онлайн</h6>
      <div class="d-flex gap-2 flex-wrap">
        <div 
          v-for="user in onlineUsers.slice(0, 8)" 
          :key="user.user_id"
          class="online-user d-flex align-items-center"
          @click="startChatWithUser(user.user_id)"
        >
          <div class="position-relative">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                 style="width: 32px; height: 32px; font-size: 0.8rem;">
              {{ getUserInitials(user) }}
            </div>
            <div class="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white"
                 style="width: 10px; height: 10px;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conversations List -->
    <div class="conversations-list">
      <div v-if="loading" class="text-center py-4">
        <div class="spinner-border spinner-border-sm text-primary" role="status">
          <span class="visually-hidden">Загрузка...</span>
        </div>
      </div>
      
      <div v-else-if="conversations.length === 0" class="text-center py-4">
        <Icon name="heroicons:chat-bubble-left-right" size="48" class="text-muted mb-2" />
        <p class="text-muted mb-0">Нет активных чатов</p>
      </div>
      
      <div v-else>
        <div 
          v-for="conversation in conversations" 
          :key="conversation.id"
          class="conversation-item p-3 border-bottom"
          :class="{ 'active': currentConversation?.id === conversation.id }"
          @click="selectConversation(conversation)"
        >
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0 me-3">
              <div class="position-relative">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary text-white"
                     style="width: 48px; height: 48px;">
                  {{ getConversationInitials(conversation) }}
                </div>
                <div v-if="conversation.unread_count > 0" 
                     class="position-absolute top-0 end-0 bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                     style="width: 20px; height: 20px; font-size: 0.7rem; min-width: 20px;">
                  {{ conversation.unread_count > 99 ? '99+' : conversation.unread_count }}
                </div>
              </div>
            </div>
            <div class="flex-grow-1 min-width-0">
              <div class="d-flex justify-content-between align-items-start mb-1">
                <h6 class="mb-0 fw-semibold text-truncate" style="font-family: var(--font-inter);">
                  {{ getConversationTitle(conversation) }}
                </h6>
                <div class="d-flex align-items-center gap-1">
                  <span v-if="conversation.is_muted" class="text-muted">
                    <Icon name="heroicons:speaker-x-mark" size="14" />
                  </span>
                  <span v-if="conversation.is_archived" class="text-muted">
                    <Icon name="heroicons:archive-box" size="14" />
                  </span>
                  <small class="text-muted">
                    {{ getRelativeTime(conversation.last_message?.created_at || conversation.updated_at) }}
                  </small>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <p class="mb-0 text-muted text-truncate" style="font-size: 0.9rem;">
                  {{ getLastMessagePreview(conversation) }}
                </p>
                <div class="d-flex align-items-center gap-1">
                  <span v-if="conversation.last_message && !conversation.last_message.is_read" 
                        class="bg-primary rounded-circle"
                        style="width: 8px; height: 8px;"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="chat-stats p-3 border-top bg-light">
      <div class="row g-2 text-center">
        <div class="col-4">
          <div class="small text-muted">Всего</div>
          <div class="fw-semibold">{{ conversations.length }}</div>
        </div>
        <div class="col-4">
          <div class="small text-muted">Непрочитанных</div>
          <div class="fw-semibold text-warning">{{ unreadCount }}</div>
        </div>
        <div class="col-4">
          <div class="small text-muted">Онлайн</div>
          <div class="fw-semibold text-success">{{ onlineUsers.length }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useChat } from '~/composables/useChat'
import { getRelativeTime } from '~/utils/date'
import { debounced } from '~/utils/debounce'

// Composables
const {
  conversations,
  currentConversation,
  onlineUsers,
  unreadCount,
  loading,
  selectConversation,
  createConversation,
  loadConversations
} = useChat()

// State
const searchQuery = ref('')

// Methods
const debouncedSearch = debounced.search(() => {
  loadConversations()
})

const createNewChat = () => {
  // Implement new chat creation
  }

const startChatWithUser = async (userId) => {
  try {
    // Check if conversation already exists
    const existingConversation = conversations.value.find(conv => 
      conv.participants.some(p => p.id === userId)
    )
    
    if (existingConversation) {
      selectConversation(existingConversation)
    } else {
      // Create new conversation
      const newConversation = await createConversation([userId])
      if (newConversation) {
        selectConversation(newConversation)
      }
    }
  } catch (error) {
    console.error('Error starting chat with user:', error)
  }
}

const getConversationTitle = (conversation) => {
  if (conversation.participants.length === 1) {
    const participant = conversation.participants[0]
    return `${participant.first_name} ${participant.last_name}`
  } else if (conversation.participants.length === 2) {
    const otherParticipant = conversation.participants.find(p => p.id !== 1) // Replace with current user ID
    return otherParticipant ? `${otherParticipant.first_name} ${otherParticipant.last_name}` : 'Групповой чат'
  } else {
    return `Групповой чат (${conversation.participants.length})`
  }
}

const getConversationInitials = (conversation) => {
  if (conversation.participants.length === 1) {
    const participant = conversation.participants[0]
    return `${participant.first_name[0]}${participant.last_name[0]}`.toUpperCase()
  } else if (conversation.participants.length === 2) {
    const otherParticipant = conversation.participants.find(p => p.id !== 1) // Replace with current user ID
    if (otherParticipant) {
      return `${otherParticipant.first_name[0]}${otherParticipant.last_name[0]}`.toUpperCase()
    }
  }
  return 'Г'
}

const getLastMessagePreview = (conversation) => {
  if (!conversation.last_message) {
    return 'Нет сообщений'
  }
  
  const message = conversation.last_message
  const maxLength = 50
  
  if (message.message.length > maxLength) {
    return message.message.substring(0, maxLength) + '...'
  }
  
  return message.message
}

const getUserInitials = (user) => {
  // This should get user data from onlineUsers
  return 'U' // Simplified
}
</script>

<style scoped>
.chat-list {
  height: 600px;
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background: white;
  display: flex;
  flex-direction: column;
}

.conversations-list {
  flex-grow: 1;
  overflow-y: auto;
}

.conversation-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.conversation-item:hover {
  background-color: #f8f9fa;
}

.conversation-item.active {
  background-color: #e3f2fd;
  border-left: 3px solid var(--color-primary-green);
}

.online-user {
  cursor: pointer;
  transition: transform 0.2s;
}

.online-user:hover {
  transform: scale(1.05);
}

.min-width-0 {
  min-width: 0;
}

.conversations-list::-webkit-scrollbar {
  width: 6px;
}

.conversations-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.conversations-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.conversations-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>