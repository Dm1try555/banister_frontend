<template>
  <div class="notifications-page">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Уведомления
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Все ваши уведомления в одном месте
        </p>
      </div>
      <div class="d-flex gap-2">
        <button 
          v-if="unreadCount > 0"
          class="btn btn-outline-primary"
          @click="markAllAsRead"
          :disabled="loading"
        >
          <Icon name="heroicons:check" size="16" class="me-2" />
          Прочитать все
        </button>
        <button 
          class="btn btn-outline-danger"
          @click="deleteAll"
          :disabled="loading"
        >
          <Icon name="heroicons:trash" size="16" class="me-2" />
          Удалить все
        </button>
        <button class="btn btn-outline-primary" @click="refreshNotifications">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:bell" size="20" />
            </div>
            <h5 class="mb-1">{{ totalCount || 0 }}</h5>
            <p class="small text-muted mb-0">Всего</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:eye-slash" size="20" />
            </div>
            <h5 class="mb-1">{{ unreadCount || 0 }}</h5>
            <p class="small text-muted mb-0">Непрочитанные</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:check-circle" size="20" />
            </div>
            <h5 class="mb-1">{{ readCount || 0 }}</h5>
            <p class="small text-muted mb-0">Прочитанные</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:clock" size="20" />
            </div>
            <h5 class="mb-1">{{ todayCount || 0 }}</h5>
            <p class="small text-muted mb-0">Сегодня</p>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Filters -->
    <AppCard customClass="border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <label class="form-label small">Поиск</label>
            <input 
              v-model="filters.search" 
              type="text" 
              class="form-control" 
              placeholder="Заголовок, сообщение..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-3">
            <label class="form-label small">Тип</label>
            <select v-model="filters.type" class="form-select" @change="loadNotifications">
              <option value="">Все типы</option>
              <option value="info">Информация</option>
              <option value="success">Успех</option>
              <option value="warning">Предупреждение</option>
              <option value="error">Ошибка</option>
              <option value="booking">Бронирование</option>
              <option value="payment">Платеж</option>
              <option value="message">Сообщение</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label small">Статус</label>
            <select v-model="filters.is_read" class="form-select" @change="loadNotifications">
              <option value="">Все</option>
              <option value="false">Непрочитанные</option>
              <option value="true">Прочитанные</option>
            </select>
          </div>
          <div class="col-md-2 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="clearFilters">
              <Icon name="heroicons:x-mark" size="16" class="me-2" />
              Очистить
            </button>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Notifications List -->
    <AppCard customClass="border-0 shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="notifications.length === 0" class="text-center py-5">
          <Icon name="heroicons:bell-slash" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Уведомления не найдены</h5>
          <p class="text-muted">Попробуйте изменить фильтры поиска</p>
        </div>
        
        <div v-else>
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            class="notification-item p-4 border-bottom"
            :class="{ 'bg-light': !notification.is_read }"
          >
            <div class="d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div 
                  class="rounded-circle d-flex align-items-center justify-content-center"
                  :class="getNotificationIconClass(notification.type)"
                  style="width: 48px; height: 48px;"
                >
                  <Icon :name="getNotificationIcon(notification.type)" size="24" class="text-white" />
                </div>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h6 class="mb-1 fw-semibold" style="font-family: var(--font-inter);">
                      {{ notification.title }}
                    </h6>
                    <small class="text-muted">
                      {{ formatDateTime(notification.created_at) }}
                    </small>
                  </div>
                  <div class="d-flex gap-2">
                    <span 
                      v-if="!notification.is_read" 
                      class="badge bg-warning"
                    >
                      Новое
                    </span>
                    <div class="dropdown">
                      <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Действия
                      </button>
                      <ul class="dropdown-menu">
                        <li v-if="!notification.is_read">
                          <a class="dropdown-item" @click="markAsRead(notification.id)">
                            <Icon name="heroicons:check" size="16" class="me-2" />
                            Отметить как прочитанное
                          </a>
                        </li>
                        <li v-if="notification.is_read">
                          <a class="dropdown-item" @click="markAsUnread(notification.id)">
                            <Icon name="heroicons:eye-slash" size="16" class="me-2" />
                            Отметить как непрочитанное
                          </a>
                        </li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" @click="deleteNotification(notification.id)">
                          <Icon name="heroicons:trash" size="16" class="me-2" />
                          Удалить
                        </a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p class="mb-2 text-muted">
                  {{ notification.message }}
                </p>
                <div v-if="notification.data" class="mt-2">
                  <small class="text-muted">
                    Дополнительные данные: {{ JSON.stringify(notification.data) }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="d-flex justify-content-center mt-4">
      <nav>
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: pagination.currentPage === 1 }">
            <button class="page-link" @click="changePage(pagination.currentPage - 1)">Предыдущая</button>
          </li>
          <li v-for="page in visiblePages" :key="page" class="page-item" :class="{ active: page === pagination.currentPage }">
            <button class="page-link" @click="changePage(page)">{{ page }}</button>
          </li>
          <li class="page-item" :class="{ disabled: pagination.currentPage === pagination.totalPages }">
            <button class="page-link" @click="changePage(pagination.currentPage + 1)">Следующая</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNotificationsApi } from '~/composables/useNotificationsApi'
import { formatDate, formatDateTime, isToday } from '~/utils/date'
import { debounced } from '~/utils/debounce'

// Meta
definePageMeta({
  middleware: 'auth'
})

// Composables
const { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  deleteAll,
  loading 
} = useNotificationsApi()

// State
const notifications = ref([])
const unreadCount = ref(0)
const totalCount = ref(0)

const filters = ref({
  search: '',
  type: '',
  is_read: ''
})

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize: 20
})

// Computed
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, pagination.value.currentPage - 2)
  const end = Math.min(pagination.value.totalPages, pagination.value.currentPage + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const readCount = computed(() => notifications.value.filter(n => n.is_read).length)
const todayCount = computed(() => notifications.value.filter(n => isToday(n.created_at)).length)

// Methods
const loadNotifications = async () => {
  try {
    const params = {
      page: pagination.value.currentPage,
      page_size: pagination.value.pageSize,
      ...filters.value
    }
    
    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (params[key] === '' || params[key] === null || params[key] === undefined) {
        delete params[key]
      }
    })
    
    const response = await getNotifications(params)
    if (response) {
      notifications.value = response.results || []
      pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
      pagination.value.totalCount = response.count
      totalCount.value = response.count
      
      // Calculate unread count
      unreadCount.value = notifications.value.filter(n => !n.is_read).length
    }
  } catch (error) {
    console.error('Ошибка загрузки уведомлений:', error)
  }
}

const debouncedSearch = debounced.search(() => {
  pagination.value.currentPage = 1
  loadNotifications()
})

const clearFilters = () => {
  filters.value = {
    search: '',
    type: '',
    is_read: ''
  }
  pagination.value.currentPage = 1
  loadNotifications()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadNotifications()
  }
}

const refreshNotifications = () => {
  loadNotifications()
}

const markAsRead = async (id) => {
  try {
    await markAsRead(id)
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.is_read = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  } catch (error) {
    console.error('Ошибка отметки уведомления как прочитанного:', error)
  }
}

const markAsUnread = async (id) => {
  try {
    // This would need to be implemented in the backend
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.is_read = false
      unreadCount.value += 1
    }
  } catch (error) {
    console.error('Ошибка отметки уведомления как непрочитанного:', error)
  }
}

const markAllAsRead = async () => {
  try {
    await markAllAsRead()
    notifications.value.forEach(n => n.is_read = true)
    unreadCount.value = 0
  } catch (error) {
    console.error('Ошибка отметки всех уведомлений как прочитанных:', error)
  }
}

const deleteNotification = async (id) => {
  try {
    await deleteNotification(id)
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      const notification = notifications.value[index]
      notifications.value.splice(index, 1)
      if (!notification.is_read) {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
      totalCount.value -= 1
    }
  } catch (error) {
    console.error('Ошибка удаления уведомления:', error)
  }
}

const deleteAll = async () => {
  if (confirm('Вы уверены, что хотите удалить все уведомления?')) {
    try {
      await deleteAll()
      notifications.value = []
      unreadCount.value = 0
      totalCount.value = 0
    } catch (error) {
      console.error('Ошибка удаления всех уведомлений:', error)
    }
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

// Lifecycle
onMounted(() => {
  loadNotifications()
})
</script>

<style scoped>
.notifications-page {
  padding: 2rem 0;
}

.notification-item {
  transition: background-color 0.2s;
}

.notification-item:hover {
  background-color: #f8f9fa !important;
}

.pagination .page-link {
  color: var(--color-primary-green);
  border-color: #dee2e6;
}

.pagination .page-item.active .page-link {
  background-color: var(--color-primary-green);
  border-color: var(--color-primary-green);
}
</style>
