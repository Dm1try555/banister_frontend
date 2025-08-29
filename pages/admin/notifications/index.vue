<template>
  <div class="admin-notifications">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Управление уведомлениями
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Создание и управление системными уведомлениями
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshNotifications">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
        <button class="btn btn-primary" @click="showCreateModal = true">
          <Icon name="heroicons:plus" size="16" class="me-2" />
          Создать уведомление
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:bell" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.total || 0 }}</h5>
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
            <h5 class="mb-1">{{ stats.unread || 0 }}</h5>
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
            <h5 class="mb-1">{{ stats.read || 0 }}</h5>
            <p class="small text-muted mb-0">Прочитанные</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:users" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.users || 0 }}</h5>
            <p class="small text-muted mb-0">Пользователей</p>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Filters -->
    <AppCard customClass="border-0 shadow-sm mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-3">
            <label class="form-label small">Поиск</label>
            <input 
              v-model="filters.search" 
              type="text" 
              class="form-control" 
              placeholder="Заголовок, сообщение..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Тип</label>
            <select v-model="filters.type" class="form-select" @change="loadNotifications">
              <option value="">Все</option>
              <option value="info">Информация</option>
              <option value="success">Успех</option>
              <option value="warning">Предупреждение</option>
              <option value="error">Ошибка</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Статус</label>
            <select v-model="filters.is_read" class="form-select" @change="loadNotifications">
              <option value="">Все</option>
              <option value="false">Непрочитанные</option>
              <option value="true">Прочитанные</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата от</label>
            <input v-model="filters.date_from" type="date" class="form-control" @change="loadNotifications" />
          </div>
          <div class="col-md-3 d-flex align-items-end">
            <button class="btn btn-outline-secondary w-100" @click="clearFilters">
              <Icon name="heroicons:x-mark" size="16" class="me-2" />
              Очистить фильтры
            </button>
          </div>
        </div>
      </div>
    </AppCard>

    <!-- Notifications Table -->
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
        
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Уведомление</th>
                <th>Тип</th>
                <th>Пользователь</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th class="text-end">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="notification in notifications" :key="notification.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:bell" size="20" class="text-primary" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">
                        {{ notification.title }}
                      </div>
                      <div class="small text-muted">{{ notification.message?.substring(0, 50) }}...</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge" :class="getNotificationTypeClass(notification.type)">
                    {{ getNotificationTypeText(notification.type) }}
                  </span>
                </td>
                <td>
                  <div v-if="notification.user">
                    <div class="fw-semibold">{{ notification.user.first_name }} {{ notification.user.last_name }}</div>
                    <div class="small text-muted">{{ notification.user.email }}</div>
                  </div>
                  <div v-else class="text-muted">Системное</div>
                </td>
                <td>
                  <span class="badge" :class="notification.is_read ? 'bg-success' : 'bg-warning'">
                    {{ notification.is_read ? 'Прочитано' : 'Непрочитано' }}
                  </span>
                </td>
                <td>
                  <div class="small">{{ formatDate(notification.created_at) }}</div>
                </td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Действия
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="viewNotification(notification)"><Icon name="heroicons:eye" size="16" class="me-2" />Просмотр</a></li>
                      <li><a class="dropdown-item" @click="editNotification(notification)"><Icon name="heroicons:pencil" size="16" class="me-2" />Редактировать</a></li>
                      <li><a class="dropdown-item" @click="toggleReadStatus(notification)">
                        <Icon name="heroicons:eye" size="16" class="me-2" />
                        {{ notification.is_read ? 'Отметить как непрочитанное' : 'Отметить как прочитанное' }}
                      </a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" @click="deleteNotification(notification)"><Icon name="heroicons:trash" size="16" class="me-2" />Удалить</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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

    <!-- Create/Edit Notification Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ showCreateModal ? 'Создать уведомление' : 'Редактировать уведомление' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveNotification">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Заголовок *</label>
                  <input v-model="notificationForm.title" type="text" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Сообщение *</label>
                  <textarea v-model="notificationForm.message" class="form-control" rows="4" required></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Тип *</label>
                  <select v-model="notificationForm.type" class="form-select" required>
                    <option value="info">Информация</option>
                    <option value="success">Успех</option>
                    <option value="warning">Предупреждение</option>
                    <option value="error">Ошибка</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Пользователь</label>
                  <select v-model="notificationForm.user" class="form-select">
                    <option value="">Все пользователи</option>
                    <option v-for="user in users" :key="user.id" :value="user.id">
                      {{ user.first_name }} {{ user.last_name }} ({{ user.email }})
                    </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn-primary" @click="saveNotification" :disabled="saving">
              <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
              {{ showCreateModal ? 'Создать' : 'Сохранить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useNotificationsApi } from '~/composables/useNotificationsApi'
import { useAdminApi } from '~/composables/useAdminApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { getNotifications, createNotification, updateNotification, deleteNotification: deleteNotificationApi } = useNotificationsApi()
const { getUsers } = useAdminApi()

// State
const loading = ref(false)
const saving = ref(false)
const notifications = ref([])
const users = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedNotification = ref(null)

const stats = ref({
  total: 0,
  unread: 0,
  read: 0,
  users: 0
})

const filters = ref({
  search: '',
  type: '',
  is_read: '',
  date_from: ''
})

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize: 20
})

const notificationForm = ref({
  title: '',
  message: '',
  type: 'info',
  user: ''
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

// Methods
const loadNotifications = async () => {
  loading.value = true
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
    notifications.value = response.results || []
    pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
    pagination.value.totalCount = response.count
    
    // Calculate stats
    calculateStats()
  } catch (error) {
    console.error('Ошибка загрузки уведомлений:', error)
  } finally {
    loading.value = false
  }
}

const loadUsers = async () => {
  try {
    const response = await getUsers({ page_size: 100 })
    users.value = response.results || []
  } catch (error) {
    console.error('Ошибка загрузки пользователей:', error)
  }
}

const calculateStats = () => {
  stats.value = {
    total: notifications.value.length,
    unread: notifications.value.filter(n => !n.is_read).length,
    read: notifications.value.filter(n => n.is_read).length,
    users: new Set(notifications.value.map(n => n.user)).size
  }
}

const debouncedSearch = debounce(() => {
  pagination.value.currentPage = 1
  loadNotifications()
}, 500)

const clearFilters = () => {
  filters.value = {
    search: '',
    type: '',
    is_read: '',
    date_from: ''
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

const viewNotification = (notification) => {
  // Navigate to notification detail page
  navigateTo(`/admin/notifications/${notification.id}`)
}

const editNotification = (notification) => {
  selectedNotification.value = notification
  notificationForm.value = {
    title: notification.title,
    message: notification.message,
    type: notification.type,
    user: notification.user?.id || ''
  }
  showEditModal.value = true
}

const saveNotification = async () => {
  saving.value = true
  try {
    const notificationData = { ...notificationForm.value }
    
    if (showCreateModal.value) {
      await createNotification(notificationData)
    } else {
      await updateNotification(selectedNotification.value.id, notificationData)
    }
    
    closeModal()
    loadNotifications()
  } catch (error) {
    console.error('Ошибка сохранения уведомления:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedNotification.value = null
  notificationForm.value = {
    title: '',
    message: '',
    type: 'info',
    user: ''
  }
}

const toggleReadStatus = async (notification) => {
  try {
    await updateNotification(notification.id, { is_read: !notification.is_read })
    loadNotifications()
  } catch (error) {
    console.error('Ошибка изменения статуса уведомления:', error)
  }
}

const deleteNotification = async (notification) => {
  if (confirm(`Вы уверены, что хотите удалить уведомление "${notification.title}"?`)) {
    try {
      await deleteNotificationApi(notification.id)
      loadNotifications()
    } catch (error) {
      console.error('Ошибка удаления уведомления:', error)
    }
  }
}

const getNotificationTypeClass = (type) => {
  const typeMap = {
    'info': 'bg-info',
    'success': 'bg-success',
    'warning': 'bg-warning',
    'error': 'bg-danger'
  }
  return typeMap[type] || 'bg-secondary'
}

const getNotificationTypeText = (type) => {
  const typeMap = {
    'info': 'Информация',
    'success': 'Успех',
    'warning': 'Предупреждение',
    'error': 'Ошибка'
  }
  return typeMap[type] || type
}

const formatDate = (dateString) => {
  if (!dateString) return 'Неизвестно'
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Debounce utility
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Lifecycle
onMounted(() => {
  loadNotifications()
  loadUsers()
})
</script>

<style scoped>
.admin-notifications {
  padding: 2rem 0;
}

.table th {
  border-top: none;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--color-text-dark);
}

.table td {
  vertical-align: middle;
  border-top: 1px solid #dee2e6;
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}

.pagination .page-link {
  color: var(--color-primary-green);
  border-color: #dee2e6;
}

.pagination .page-item.active .page-link {
  background-color: var(--color-primary-green);
  border-color: var(--color-primary-green);
}

.modal {
  z-index: 1055;
}
</style>
