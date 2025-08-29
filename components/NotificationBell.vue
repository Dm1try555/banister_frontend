<template>
  <div class="notification-bell position-relative">
    <!-- Bell Icon with Badge -->
    <button 
      class="btn btn-link p-0 position-relative"
      @click="toggleDropdown"
      :disabled="loading"
    >
      <Icon name="heroicons:bell" size="24" class="text-muted" />
      <span 
        v-if="unreadCount > 0" 
        class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style="font-size: 0.6rem; min-width: 18px; height: 18px; line-height: 18px;"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-if="showDropdown" 
      class="notification-dropdown position-absolute end-0 mt-2 shadow-lg border-0 rounded-3"
      style="width: 400px; max-height: 500px; z-index: 1050; background: white;"
    >
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <h6 class="mb-0 fw-semibold" style="font-family: var(--font-inter);">
          Уведомления
        </h6>
        <div class="d-flex gap-2">
          <button 
            v-if="unreadCount > 0"
            class="btn btn-sm btn-outline-primary"
            @click="markAllAsRead"
            :disabled="loading"
          >
            <Icon name="heroicons:check" size="14" class="me-1" />
            Прочитать все
          </button>
          <button 
            class="btn btn-sm btn-outline-danger"
            @click="deleteAll"
            :disabled="loading"
          >
            <Icon name="heroicons:trash" size="14" class="me-1" />
            Удалить все
          </button>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="notifications-list" style="max-height: 350px; overflow-y: auto;">
        <div v-if="loading" class="text-center py-4">
          <div class="spinner-border spinner-border-sm text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="notifications.length === 0" class="text-center py-4">
          <Icon name="heroicons:bell-slash" size="48" class="text-muted mb-2" />
          <p class="text-muted mb-0">Нет уведомлений</p>
        </div>
        
        <div v-else>
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            class="notification-item p-3 border-bottom"
            :class="{ 'bg-light': !notification.is_read }"
            @click="handleNotificationClick(notification)"
            style="cursor: pointer; transition: background-color 0.2s;"
          >
            <div class="d-flex align-items-start">
              <div class="flex-shrink-0 me-3">
                <div 
                  class="rounded-circle d-flex align-items-center justify-content-center"
                  :class="getNotificationIconClass(notification.type)"
                  style="width: 40px; height: 40px;"
                >
                  <Icon :name="getNotificationIcon(notification.type)" size="20" class="text-white" />
                </div>
              </div>
              <div class="flex-grow-1">
                <div class="d-flex justify-content-between align-items-start mb-1">
                  <h6 class="mb-0 fw-semibold" style="font-size: 0.9rem; font-family: var(--font-inter);">
                    {{ notification.title }}
                  </h6>
                  <div class="d-flex gap-1">
                    <button 
                      v-if="!notification.is_read"
                      class="btn btn-sm btn-outline-primary"
                      @click.stop="markAsRead(notification.id)"
                      :disabled="loading"
                    >
                      <Icon name="heroicons:check" size="12" />
                    </button>
                    <button 
                      class="btn btn-sm btn-outline-danger"
                      @click.stop="deleteNotification(notification.id)"
                      :disabled="loading"
                    >
                      <Icon name="heroicons:trash" size="12" />
                    </button>
                  </div>
                </div>
                <p class="mb-1 text-muted" style="font-size: 0.85rem; line-height: 1.3;">
                  {{ notification.message }}
                </p>
                <small class="text-muted">
                  {{ formatRelativeTime(notification.created_at) }}
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-3 border-top text-center">
        <button 
          class="btn btn-outline-primary btn-sm"
          @click="viewAllNotifications"
        >
          <Icon name="heroicons:eye" size="14" class="me-1" />
          Просмотреть все
        </button>
      </div>
    </div>

    <!-- Backdrop -->
    <div 
      v-if="showDropdown" 
      class="position-fixed top-0 start-0 w-100 h-100"
      style="z-index: 1040;"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useNotificationsApi } from '~/composables/useNotificationsApi'
import { formatDate, getRelativeTime } from '~/utils/date'

// Props
const props = defineProps({
  autoRefresh: {
    type: Boolean,
    default: true
  },
  refreshInterval: {
    type: Number,
    default: 30000 // 30 seconds
  }
})

// Composables
const { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification, 
  deleteAll, 
  getUnreadCount,
  loading 
} = useNotificationsApi()

// State
const showDropdown = ref(false)
const notifications = ref([])
const unreadCount = ref(0)
const refreshTimer = ref(null)

// Computed
const hasUnread = computed(() => unreadCount.value > 0)

// Methods
const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
  if (showDropdown.value) {
    loadNotifications()
  }
}

const closeDropdown = () => {
  showDropdown.value = false
}

const loadNotifications = async () => {
  try {
    const response = await getNotifications({ page_size: 10 })
    if (response) {
      notifications.value = response.results || []
    }
  } catch (error) {
    console.error('Error loading notifications:', error)
  }
}

const loadUnreadCount = async () => {
  try {
    const response = await getUnreadCount()
    if (response) {
      unreadCount.value = response.count || 0
    }
  } catch (error) {
    console.error('Error loading unread count:', error)
  }
}

const handleNotificationClick = async (notification) => {
  if (!notification.is_read) {
    await markAsRead(notification.id)
    unreadCount.value = Math.max(0, unreadCount.value - 1)
  }
  
  // Handle notification action based on type
  if (notification.data?.action) {
    // Navigate to specific page based on notification data
    navigateTo(notification.data.action)
  }
  
  closeDropdown()
}

const markAsReadHandler = async (id) => {
  try {
    await markAsRead(id)
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.is_read = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  } catch (error) {
    console.error('Error marking notification as read:', error)
  }
}

const markAllAsReadHandler = async () => {
  try {
    await markAllAsRead()
    notifications.value.forEach(n => n.is_read = true)
    unreadCount.value = 0
  } catch (error) {
    console.error('Error marking all notifications as read:', error)
  }
}

const deleteNotificationHandler = async (id) => {
  try {
    await deleteNotification(id)
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      const notification = notifications.value[index]
      notifications.value.splice(index, 1)
      if (!notification.is_read) {
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    }
  } catch (error) {
    console.error('Error deleting notification:', error)
  }
}

const deleteAllHandler = async () => {
  try {
    await deleteAll()
    notifications.value = []
    unreadCount.value = 0
  } catch (error) {
    console.error('Error deleting all notifications:', error)
  }
}

const viewAllNotifications = () => {
  closeDropdown()
  navigateTo('/notifications')
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

const formatRelativeTime = (dateString) => {
  return getRelativeTime(dateString)
}

const startAutoRefresh = () => {
  if (props.autoRefresh && props.refreshInterval > 0) {
    refreshTimer.value = setInterval(() => {
      loadUnreadCount()
    }, props.refreshInterval)
  }
}

const stopAutoRefresh = () => {
  if (refreshTimer.value) {
    clearInterval(refreshTimer.value)
    refreshTimer.value = null
  }
}

// Lifecycle
onMounted(() => {
  loadUnreadCount()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})

// Listen for new notifications from service worker
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    if (event.data?.type === 'NOTIFICATION_CLICKED') {
      // Handle notification click from service worker
      const notificationId = event.data.notificationId
      if (notificationId) {
        navigateTo(`/notifications/${notificationId}`)
      }
    }
  })
}
</script>

<style scoped>
.notification-bell {
  z-index: 1050;
}

.notification-dropdown {
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.notification-item:hover {
  background-color: #f8f9fa !important;
}

.notifications-list::-webkit-scrollbar {
  width: 6px;
}

.notifications-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.notifications-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.notifications-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>