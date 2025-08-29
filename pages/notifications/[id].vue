<template>
  <div class="notification-detail-page">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <button class="btn btn-outline-secondary mb-2" @click="$router.back()">
          <Icon name="heroicons:arrow-left" size="16" class="me-2" />
          Назад
        </button>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Уведомление
        </h1>
      </div>
      <div class="d-flex gap-2">
        <button 
          v-if="notification && !notification.is_read"
          class="btn btn-outline-primary"
          @click="markAsRead"
          :disabled="loading"
        >
          <Icon name="heroicons:check" size="16" class="me-2" />
          Отметить как прочитанное
        </button>
        <button 
          class="btn btn-outline-danger"
          @click="deleteNotification"
          :disabled="loading"
        >
          <Icon name="heroicons:trash" size="16" class="me-2" />
          Удалить
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Загрузка...</span>
      </div>
    </div>

    <!-- Not Found -->
    <div v-else-if="!notification" class="text-center py-5">
      <Icon name="heroicons:exclamation-triangle" size="64" class="text-muted mb-3" />
      <h5 class="text-muted">Уведомление не найдено</h5>
      <p class="text-muted">Возможно, оно было удалено или не существует</p>
      <button class="btn btn-primary" @click="$router.push('/notifications')">
        Вернуться к списку
      </button>
    </div>

    <!-- Notification Detail -->
    <div v-else>
      <AppCard customClass="border-0 shadow-sm">
        <div class="card-body p-4">
          <div class="d-flex align-items-start mb-4">
            <div class="flex-shrink-0 me-4">
              <div 
                class="rounded-circle d-flex align-items-center justify-content-center"
                :class="getNotificationIconClass(notification.type)"
                style="width: 64px; height: 64px;"
              >
                <Icon :name="getNotificationIcon(notification.type)" size="32" class="text-white" />
              </div>
            </div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h2 class="h4 mb-2 fw-semibold" style="font-family: var(--font-inter);">
                  {{ notification.title }}
                </h2>
                <span 
                  v-if="!notification.is_read" 
                  class="badge bg-warning fs-6"
                >
                  Непрочитанное
                </span>
                <span 
                  v-else 
                  class="badge bg-success fs-6"
                >
                  Прочитанное
                </span>
              </div>
              <div class="d-flex align-items-center text-muted mb-3">
                <Icon name="heroicons:clock" size="16" class="me-2" />
                <span>{{ formatDateTime(notification.created_at) }}</span>
                <span class="mx-2">•</span>
                <span>{{ getRelativeTime(notification.created_at) }}</span>
              </div>
            </div>
          </div>

          <!-- Message -->
          <div class="mb-4">
            <h5 class="mb-3" style="font-family: var(--font-inter);">Сообщение</h5>
            <div class="bg-light p-3 rounded-3">
              <p class="mb-0" style="line-height: 1.6;">{{ notification.message }}</p>
            </div>
          </div>

          <!-- Additional Data -->
          <div v-if="notification.data" class="mb-4">
            <h5 class="mb-3" style="font-family: var(--font-inter);">Дополнительные данные</h5>
            <div class="bg-light p-3 rounded-3">
              <pre class="mb-0" style="font-size: 0.9rem; white-space: pre-wrap;">{{ JSON.stringify(notification.data, null, 2) }}</pre>
            </div>
          </div>

          <!-- Type Information -->
          <div class="mb-4">
            <h5 class="mb-3" style="font-family: var(--font-inter);">Информация</h5>
            <div class="row g-3">
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <Icon name="heroicons:tag" size="16" class="me-2 text-muted" />
                  <span class="text-muted me-2">Тип:</span>
                  <span class="badge" :class="getNotificationIconClass(notification.type)">
                    {{ getNotificationTypeLabel(notification.type) }}
                  </span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="d-flex align-items-center">
                  <Icon name="heroicons:user" size="16" class="me-2 text-muted" />
                  <span class="text-muted me-2">ID уведомления:</span>
                  <span class="fw-medium">{{ notification.id }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="notification.data?.action" class="mt-4">
            <h5 class="mb-3" style="font-family: var(--font-inter);">Действия</h5>
            <div class="d-flex gap-2">
              <button 
                class="btn btn-primary"
                @click="handleAction(notification.data.action)"
              >
                <Icon name="heroicons:arrow-right" size="16" class="me-2" />
                Перейти к действию
              </button>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNotificationsApi } from '~/composables/useNotificationsApi'
import { formatDateTime, getRelativeTime } from '~/utils/date'

// Meta
definePageMeta({
  middleware: 'auth'
})

// Composables
const { getNotification, markAsRead, deleteNotification, loading } = useNotificationsApi()

// State
const notification = ref(null)

// Route
const route = useRoute()
const notificationId = parseInt(route.params.id)

// Methods
const loadNotification = async () => {
  try {
    const response = await getNotification(notificationId)
    if (response) {
      notification.value = response
    }
  } catch (error) {
    console.error('Ошибка загрузки уведомления:', error)
  }
}

const markAsReadHandler = async () => {
  try {
    await markAsRead(notificationId)
    if (notification.value) {
      notification.value.is_read = true
    }
  } catch (error) {
    console.error('Ошибка отметки уведомления как прочитанного:', error)
  }
}

const deleteNotificationHandler = async () => {
  if (confirm('Вы уверены, что хотите удалить это уведомление?')) {
    try {
      await deleteNotification(notificationId)
      await navigateTo('/notifications')
    } catch (error) {
      console.error('Ошибка удаления уведомления:', error)
    }
  }
}

const handleAction = (action) => {
  if (action) {
    navigateTo(action)
  }
}

const getNotificationIcon = (type) => {
  const iconMap = {
    'info': 'heroicons:information-circle',
    'success': 'heroicons:check-circle',
    'warning': 'heroicons:exclamation-triangle',
    'error': 'heroicons:x-circle',
    'booking': 'heroicons:calendar',
    'payment': 'heroicons:banknotes',
    'message': 'heroicons:chat-bubble-left-right'
  }
  return iconMap[type] || 'heroicons:bell'
}

const getNotificationIconClass = (type) => {
  const classMap = {
    'info': 'bg-info',
    'success': 'bg-success',
    'warning': 'bg-warning',
    'error': 'bg-danger',
    'booking': 'bg-primary',
    'payment': 'bg-success',
    'message': 'bg-secondary'
  }
  return classMap[type] || 'bg-secondary'
}

const getNotificationTypeLabel = (type) => {
  const labelMap = {
    'info': 'Информация',
    'success': 'Успех',
    'warning': 'Предупреждение',
    'error': 'Ошибка',
    'booking': 'Бронирование',
    'payment': 'Платеж',
    'message': 'Сообщение'
  }
  return labelMap[type] || type
}

// Lifecycle
onMounted(() => {
  loadNotification()
})
</script>

<style scoped>
.notification-detail-page {
  padding: 2rem 0;
}

pre {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 0.375rem;
  padding: 1rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}
</style>