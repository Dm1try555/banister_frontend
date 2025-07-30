<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

definePageMeta({ layout: 'provider-dashboard' })

const api = useApi()
const loading = ref(true)
const error = ref('')
const conversations = ref([])
const selectedConversation = ref(null)
const newMessage = ref('')

onMounted(async () => {
  await loadConversations()
})

const loadConversations = async () => {
  loading.value = true
  try {
    const data = await api.get('message/')
    console.log('Messages API response:', data)
    
    // Handle different response formats
    let conversationsData = []
    if (Array.isArray(data)) {
      conversationsData = data
    } else if (data && Array.isArray(data.results)) {
      conversationsData = data.results
    } else if (data && Array.isArray(data.data)) {
      conversationsData = data.data
    } else if (data && typeof data === 'object') {
      conversationsData = Object.values(data).find(val => Array.isArray(val)) || []
    }
    
    conversations.value = conversationsData
    if (conversationsData.length > 0) {
      selectedConversation.value = conversationsData[0]
    }
  } catch (e) {
    error.value = 'Ошибка загрузки сообщений'
    console.error('Messages loading error:', e)
    conversations.value = []
  } finally {
    loading.value = false
  }
}

const sendMessage = async () => {
  if (!newMessage.value.trim() || !selectedConversation.value) return
  
  try {
    await api.post('message/send/', {
      conversation_id: selectedConversation.value.id,
      message: newMessage.value
    })
    newMessage.value = ''
    // Обновляем сообщения в выбранном разговоре
    await loadConversations()
  } catch (e) {
    error.value = 'Ошибка отправки сообщения'
    console.error('Send message error:', e)
  }
}
</script>

<template>
  <div class="row g-4">
    <div class="col-12">
      <h2 class="mb-4" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
        Сообщения
      </h2>
    </div>

    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="col-12">
      <div class="alert alert-danger">{{ error }}</div>
    </div>

    <div v-else-if="conversations.length === 0" class="col-12 text-center py-5">
      <Icon name="heroicons:chat-bubble-left-right" size="64" class="text-muted mb-3" />
      <h4 class="mb-2" style="font-family: var(--font-inter); color: var(--color-text-dark);">
        Сообщений пока нет
      </h4>
      <p class="text-muted" style="font-family: var(--font-inter);">
        Когда появятся новые сообщения, они отобразятся здесь
      </p>
    </div>

    <div v-else class="col-12">
      <div class="row">
        <!-- Список разговоров -->
        <div class="col-md-4">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px; height: 600px;'">
            <div class="card-body">
              <h5 class="mb-3" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Разговоры
              </h5>
              
              <div class="conversations-list">
                <div
                  v-for="conversation in conversations"
                  :key="conversation.id"
                  class="conversation-item p-3 rounded mb-2"
                  :class="{ 'conversation-active': selectedConversation?.id === conversation.id }"
                  @click="selectedConversation = conversation"
                >
                  <div class="d-flex align-items-center">
                    <div class="me-3">
                      <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                           style="width: 40px; height: 40px;">
                        <Icon name="heroicons:user" size="16" />
                      </div>
                    </div>
                    <div class="flex-grow-1">
                      <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                        {{ conversation.customerName }}
                      </h6>
                      <p class="mb-0 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">
                        {{ conversation.lastMessage }}
                      </p>
                    </div>
                    <div v-if="conversation.unreadCount > 0" class="ms-2">
                      <span class="badge bg-danger rounded-pill">{{ conversation.unreadCount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Чат -->
        <div class="col-md-8">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px; height: 600px;'">
            <div class="card-body d-flex flex-column">
              <div v-if="selectedConversation" class="flex-grow-1">
                <!-- Заголовок чата -->
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div class="me-3">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:user" size="16" />
                    </div>
                  </div>
                  <div>
                    <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                      {{ selectedConversation.customerName }}
                    </h6>
                    <p class="mb-0 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">
                      {{ selectedConversation.serviceName }}
                    </p>
                  </div>
                </div>

                <!-- Сообщения -->
                <div class="messages-container flex-grow-1 mb-3" style="height: 400px; overflow-y: auto;">
                  <div v-for="message in selectedConversation.messages" :key="message.id" 
                       class="message-item mb-3"
                       :class="{ 'message-outgoing': message.isOutgoing, 'message-incoming': !message.isOutgoing }">
                    <div class="message-bubble p-3 rounded">
                      <p class="mb-1" style="font-family: var(--font-inter);">{{ message.text }}</p>
                      <small class="text-muted" style="font-family: var(--font-inter); font-size: 0.8rem;">
                        {{ message.timestamp }}
                      </small>
                    </div>
                  </div>
                </div>

                <!-- Поле ввода -->
                <div class="message-input">
                  <div class="input-group">
                    <input
                      v-model="newMessage"
                      type="text"
                      class="form-control"
                      placeholder="Введите сообщение..."
                      @keyup.enter="sendMessage"
                      style="font-family: var(--font-inter);"
                    />
                    <AppButton
                      variant="btn btn-primary-green"
                      @click="sendMessage"
                      :disabled="!newMessage.trim()"
                    >
                      <Icon name="heroicons:paper-airplane" size="16" />
                    </AppButton>
                  </div>
                </div>
              </div>

              <div v-else class="d-flex align-items-center justify-content-center h-100">
                <div class="text-center">
                  <Icon name="heroicons:chat-bubble-left-right" size="48" class="text-muted mb-3" />
                  <p class="text-muted" style="font-family: var(--font-inter);">
                    Выберите разговор для начала общения
                  </p>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.conversations-list {
  max-height: 500px;
  overflow-y: auto;
}

.conversation-item {
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
}

.conversation-item:hover {
  background-color: rgba(34, 197, 94, 0.1);
  border-color: var(--color-primary-green);
}

.conversation-active {
  background-color: rgba(34, 197, 94, 0.1);
  border-color: var(--color-primary-green);
}

.messages-container {
  border: 1px solid #e9ecef;
  border-radius: 8px;
  padding: 1rem;
}

.message-item {
  display: flex;
}

.message-outgoing {
  justify-content: flex-end;
}

.message-incoming {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 70%;
}

.message-outgoing .message-bubble {
  background-color: var(--color-primary-green);
  color: white;
}

.message-incoming .message-bubble {
  background-color: #f8f9fa;
  color: var(--color-text-dark);
}

.message-input {
  border-top: 1px solid #e9ecef;
  padding-top: 1rem;
}
</style> 