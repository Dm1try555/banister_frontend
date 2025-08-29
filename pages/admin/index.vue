<template>
  <div class="admin-dashboard">
    <!-- Header -->
    <div class="admin-header mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
            Админ панель
          </h1>
          <p class="text-muted mb-0" style="font-family: var(--font-inter);">
            Добро пожаловать, {{ user?.first_name || 'Администратор' }}!
          </p>
        </div>
        <div class="d-flex align-items-center gap-3">
          <div class="text-end">
            <div class="small text-muted">Роль</div>
            <div class="fw-bold text-primary">{{ getUserRoleDisplay(user?.role) }}</div>
          </div>
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <Icon name="heroicons:user-circle" size="20" class="me-2" />
              {{ user?.first_name || 'Админ' }}
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/admin/settings"><Icon name="heroicons:cog-6-tooth" size="16" class="me-2" />Настройки</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="/logout"><Icon name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />Выйти</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                 style="width: 60px; height: 60px;">
              <Icon name="heroicons:users" size="24" />
            </div>
            <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
              {{ stats.totalUsers || 0 }}
            </h4>
            <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Всего пользователей</p>
          </div>
        </AppCard>
      </div>
      
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-3"
                 style="width: 60px; height: 60px;">
              <Icon name="heroicons:wrench-screwdriver" size="24" />
            </div>
            <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
              {{ stats.totalServices || 0 }}
            </h4>
            <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Активных сервисов</p>
          </div>
        </AppCard>
      </div>
      
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-3"
                 style="width: 60px; height: 60px;">
              <Icon name="heroicons:calendar-days" size="24" />
            </div>
            <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
              {{ stats.totalBookings || 0 }}
            </h4>
            <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Бронирований</p>
          </div>
        </AppCard>
      </div>
      
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-3"
                 style="width: 60px; height: 60px;">
              <Icon name="heroicons:banknotes" size="24" />
            </div>
            <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
              £{{ (stats.totalRevenue || 0).toFixed(2) }}
            </h4>
            <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Общий доход</p>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="row g-4 mb-4">
      <div class="col-12">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-header bg-transparent border-0 pb-0">
            <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Быстрые действия
            </h5>
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-3">
                <NuxtLink to="/admin/users" class="text-decoration-none">
                  <div class="d-flex align-items-center p-3 rounded-3 border" style="background-color: #f8f9fa; transition: all 0.2s;" 
                       @mouseover="$event.target.style.backgroundColor = '#e9ecef'" 
                       @mouseout="$event.target.style.backgroundColor = '#f8f9fa'">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:users" size="20" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">Управление пользователями</div>
                      <div class="small text-muted">Просмотр и редактирование</div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              
              <div class="col-md-3">
                <NuxtLink to="/admin/services" class="text-decoration-none">
                  <div class="d-flex align-items-center p-3 rounded-3 border" style="background-color: #f8f9fa; transition: all 0.2s;" 
                       @mouseover="$event.target.style.backgroundColor = '#e9ecef'" 
                       @mouseout="$event.target.style.backgroundColor = '#f8f9fa'">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:wrench-screwdriver" size="20" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">Управление сервисами</div>
                      <div class="small text-muted">Создание и модерация</div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              
              <div class="col-md-3">
                <NuxtLink to="/admin/bookings" class="text-decoration-none">
                  <div class="d-flex align-items-center p-3 rounded-3 border" style="background-color: #f8f9fa; transition: all 0.2s;" 
                       @mouseover="$event.target.style.backgroundColor = '#e9ecef'" 
                       @mouseout="$event.target.style.backgroundColor = '#f8f9fa'">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:calendar-days" size="20" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">Управление бронированиями</div>
                      <div class="small text-muted">Просмотр и управление</div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
              
              <div class="col-md-3">
                <NuxtLink to="/admin/payments" class="text-decoration-none">
                  <div class="d-flex align-items-center p-3 rounded-3 border" style="background-color: #f8f9fa; transition: all 0.2s;" 
                       @mouseover="$event.target.style.backgroundColor = '#e9ecef'" 
                       @mouseout="$event.target.style.backgroundColor = '#f8f9fa'">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:banknotes" size="20" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">Управление платежами</div>
                      <div class="small text-muted">Финансовые операции</div>
                    </div>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="row g-4">
      <div class="col-md-8">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-header bg-transparent border-0 pb-0">
            <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Последние бронирования
            </h5>
          </div>
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
            </div>
            
            <div v-else-if="recentBookings.length === 0" class="text-center py-4">
              <Icon name="heroicons:calendar-x-mark" size="48" class="text-muted mb-3" />
              <p class="text-muted">Нет недавних бронирований</p>
            </div>
            
            <div v-else>
              <div v-for="booking in recentBookings" :key="booking.id" 
                   class="d-flex align-items-center p-3 border-bottom">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                     style="width: 40px; height: 40px;">
                  <Icon name="heroicons:calendar-days" size="20" class="text-primary" />
                </div>
                <div class="flex-grow-1">
                  <div class="fw-semibold" style="font-family: var(--font-inter);">
                    {{ booking.service?.title || 'Неизвестный сервис' }}
                  </div>
                  <div class="small text-muted">
                    {{ booking.customer?.first_name }} {{ booking.customer?.last_name }} • 
                    {{ formatDate(booking.created_at) }}
                  </div>
                </div>
                <div class="text-end">
                  <span class="badge" :class="getBookingStatusClass(booking.status)">
                    {{ getBookingStatusText(booking.status) }}
                  </span>
                  <div class="small text-muted mt-1">£{{ booking.service?.price || '0' }}</div>
                </div>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
      
      <div class="col-md-4">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-header bg-transparent border-0 pb-0">
            <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Системные уведомления
            </h5>
          </div>
          <div class="card-body">
            <div v-if="notifications.length === 0" class="text-center py-4">
              <Icon name="heroicons:bell-slash" size="48" class="text-muted mb-3" />
              <p class="text-muted">Нет уведомлений</p>
            </div>
            
            <div v-else>
              <div v-for="notification in notifications" :key="notification.id" 
                   class="d-flex align-items-start p-3 border-bottom">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                     style="width: 32px; height: 32px;">
                  <Icon name="heroicons:bell" size="16" class="text-warning" />
                </div>
                <div class="flex-grow-1">
                  <div class="small fw-semibold" style="font-family: var(--font-inter);">
                    {{ notification.title }}
                  </div>
                  <div class="small text-muted">
                    {{ notification.message }}
                  </div>
                  <div class="small text-muted mt-1">
                    {{ formatDate(notification.created_at) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useAuthApi } from '~/composables/useAuthApi'
import { useAdminApi } from '~/composables/useAdminApi'
import { useBookingsApi } from '~/composables/useBookingsApi'
import { useNotificationsApi } from '~/composables/useNotificationsApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { user } = useAuthApi()
const { getDashboardStats } = useAdminApi()
const { getBookings } = useBookingsApi()
const { getNotifications } = useNotificationsApi()

// State
const loading = ref(false)
const stats = ref({
  totalUsers: 0,
  totalServices: 0,
  totalBookings: 0,
  totalRevenue: 0
})
const recentBookings = ref([])
const notifications = ref([])

// Computed
const getUserRoleDisplay = (role) => {
  const roleMap = {
    'super_admin': 'Супер Админ',
    'admin': 'Администратор',
    'hr': 'HR Менеджер',
    'supervisor': 'Супервайзер'
  }
  return roleMap[role] || role
}

// Methods
const loadDashboardData = async () => {
  loading.value = true
  try {
    // Load stats
    const statsData = await getDashboardStats()
    stats.value = statsData
    
    // Load recent bookings
    const bookingsData = await getBookings({ page_size: 5 })
    recentBookings.value = bookingsData.results || []
    
    // Load notifications
    const notificationsData = await getNotifications({ page_size: 5 })
    notifications.value = notificationsData.results || []
  } catch (error) {
    console.error('Ошибка загрузки данных дашборда:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getBookingStatusClass = (status) => {
  const statusMap = {
    'pending': 'bg-warning',
    'confirmed': 'bg-success',
    'cancelled': 'bg-danger',
    'completed': 'bg-info'
  }
  return statusMap[status] || 'bg-secondary'
}

const getBookingStatusText = (status) => {
  const statusMap = {
    'pending': 'Ожидает',
    'confirmed': 'Подтверждено',
    'cancelled': 'Отменено',
    'completed': 'Завершено'
  }
  return statusMap[status] || status
}

// Lifecycle
onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem 0;
}

.admin-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}

.badge {
  font-size: 0.75rem;
  padding: 0.375rem 0.75rem;
}
</style>
