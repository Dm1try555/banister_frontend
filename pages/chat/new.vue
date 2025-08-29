<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <h1 class="mb-4">Новый чат</h1>

        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body">
            <form @submit.prevent="createChat">
              <!-- Participants Selection -->
              <div class="mb-4">
                <label class="form-label fw-semibold">Участники</label>
                <div class="d-flex flex-wrap gap-2 mb-3">
                  <div 
                    v-for="participant in selectedParticipants" 
                    :key="participant.id"
                    class="badge bg-primary d-flex align-items-center gap-2"
                  >
                    {{ participant.first_name }} {{ participant.last_name }}
                    <button 
                      type="button" 
                      class="btn-close btn-close-white" 
                      @click="removeParticipant(participant.id)"
                    ></button>
                  </div>
                </div>
                
                <!-- User Search -->
                <div class="position-relative">
                  <input 
                    v-model="userSearch"
                    type="text" 
                    class="form-control"
                    placeholder="Поиск пользователей..."
                    @input="searchUsers"
                  />
                  <Icon name="heroicons:magnifying-glass" size="16" class="position-absolute top-50 end-0 translate-middle-y me-3 text-muted" />
                </div>
                
                <!-- Search Results -->
                <div v-if="searchResults.length > 0" class="mt-2">
                  <div class="list-group">
                    <div 
                      v-for="user in searchResults" 
                      :key="user.id"
                      class="list-group-item list-group-item-action d-flex align-items-center"
                      @click="addParticipant(user)"
                    >
                      <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-secondary text-white me-3"
                           style="width: 40px; height: 40px;">
                        {{ getUserInitials(user) }}
                      </div>
                      <div class="flex-grow-1">
                        <h6 class="mb-0">{{ user.first_name }} {{ user.last_name }}</h6>
                        <small class="text-muted">{{ user.email }}</small>
                      </div>
                      <div class="d-flex align-items-center">
                        <span class="badge bg-success me-2" v-if="user.is_online">Онлайн</span>
                        <Icon name="heroicons:plus" size="16" class="text-primary" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Initial Message -->
              <div class="mb-4">
                <label class="form-label fw-semibold">Первое сообщение (необязательно)</label>
                <textarea 
                  v-model="initialMessage"
                  class="form-control"
                  rows="3"
                  placeholder="Введите первое сообщение..."
                ></textarea>
              </div>

              <!-- Actions -->
              <div class="d-flex justify-content-end gap-2">
                <NuxtLink to="/chat" class="btn btn-secondary">
                  <Icon name="heroicons:arrow-left" size="16" class="me-2" />
                  Назад
                </NuxtLink>
                <button 
                  type="submit" 
                  class="btn btn-primary"
                  :disabled="selectedParticipants.length === 0 || loading"
                >
                  <Icon name="heroicons:chat-bubble-left-right" size="16" class="me-2" />
                  {{ loading ? 'Создание...' : 'Создать чат' }}
                </button>
              </div>
            </form>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useChat } from '~/composables/useChat'
import { useAdminApi } from '~/composables/useAdminApi'
import { debounced } from '~/utils/debounce'

definePageMeta({
  middleware: 'auth'
})

// Composables
const { createConversation } = useChat()
const { getUsers } = useAdminApi()

// State
const selectedParticipants = ref([])
const userSearch = ref('')
const searchResults = ref([])
const initialMessage = ref('')
const loading = ref(false)

// Methods
const searchUsers = debounced.search(async () => {
  if (!userSearch.value.trim()) {
    searchResults.value = []
    return
  }

  try {
    const response = await getUsers({
      search: userSearch.value,
      page_size: 10
    })
    
    if (response) {
      // Filter out already selected participants
      searchResults.value = response.results.filter(user => 
        !selectedParticipants.value.some(p => p.id === user.id)
      )
    }
  } catch (error) {
    console.error('Error searching users:', error)
    searchResults.value = []
  }
})

const addParticipant = (user) => {
  if (!selectedParticipants.value.some(p => p.id === user.id)) {
    selectedParticipants.value.push(user)
    userSearch.value = ''
    searchResults.value = []
  }
}

const removeParticipant = (userId) => {
  selectedParticipants.value = selectedParticipants.value.filter(p => p.id !== userId)
}

const createChat = async () => {
  if (selectedParticipants.value.length === 0) {
    return
  }

  loading.value = true
  try {
    const conversation = await createConversation(
      selectedParticipants.value.map(p => p.id),
      initialMessage.value || undefined
    )
    
    if (conversation) {
      // Redirect to chat
      await navigateTo('/chat')
    }
  } catch (error) {
    console.error('Error creating chat:', error)
  } finally {
    loading.value = false
  }
}

const getUserInitials = (user) => {
  return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
}

onMounted(() => {
  // Load initial users if needed
})
</script>
