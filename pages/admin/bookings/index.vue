<template>
  <div class="admin-bookings">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Управление бронированиями
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Просмотр и управление всеми бронированиями
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshBookings">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
        <button class="btn btn-primary" @click="showCreateModal = true">
          <Icon name="heroicons:plus" size="16" class="me-2" />
          Добавить бронирование
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:clock" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.pending || 0 }}</h5>
            <p class="small text-muted mb-0">Ожидают</p>
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
            <h5 class="mb-1">{{ stats.confirmed || 0 }}</h5>
            <p class="small text-muted mb-0">Подтверждены</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:check-badge" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.completed || 0 }}</h5>
            <p class="small text-muted mb-0">Завершены</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:x-circle" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.cancelled || 0 }}</h5>
            <p class="small text-muted mb-0">Отменены</p>
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
              placeholder="Клиент, сервис..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Статус</label>
            <select v-model="filters.status" class="form-select" @change="loadBookings">
              <option value="">Все</option>
              <option value="pending">Ожидают</option>
              <option value="confirmed">Подтверждены</option>
              <option value="completed">Завершены</option>
              <option value="cancelled">Отменены</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата от</label>
            <input v-model="filters.date_from" type="date" class="form-control" @change="loadBookings" />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата до</label>
            <input v-model="filters.date_to" type="date" class="form-control" @change="loadBookings" />
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

    <!-- Bookings Table -->
    <AppCard customClass="border-0 shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="bookings.length === 0" class="text-center py-5">
          <Icon name="heroicons:calendar-x-mark" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Бронирования не найдены</h5>
          <p class="text-muted">Попробуйте изменить фильтры поиска</p>
        </div>
        
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Бронирование</th>
                <th>Клиент</th>
                <th>Провайдер</th>
                <th>Дата/Время</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th class="text-end">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in bookings" :key="booking.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:calendar-days" size="20" class="text-primary" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">
                        #{{ booking.id }}
                      </div>
                      <div class="small text-muted">{{ booking.service?.title || 'Неизвестный сервис' }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div v-if="booking.customer">
                    <div class="fw-semibold">{{ booking.customer.first_name }} {{ booking.customer.last_name }}</div>
                    <div class="small text-muted">{{ booking.customer.email }}</div>
                  </div>
                  <div v-else class="text-muted">Неизвестно</div>
                </td>
                <td>
                  <div v-if="booking.provider">
                    <div class="fw-semibold">{{ booking.provider.first_name }} {{ booking.provider.last_name }}</div>
                    <div class="small text-muted">{{ booking.provider.email }}</div>
                  </div>
                  <div v-else class="text-muted">Не назначен</div>
                </td>
                <td>
                  <div v-if="booking.scheduled_datetime">
                    <div class="fw-semibold">{{ formatDateTime(booking.scheduled_datetime) }}</div>
                    <div class="small text-muted">{{ formatDate(booking.scheduled_datetime) }}</div>
                  </div>
                  <div v-else class="text-muted">Не назначено</div>
                </td>
                <td>
                  <div class="fw-semibold text-success">£{{ booking.service?.price || '0' }}</div>
                </td>
                <td>
                  <span class="badge" :class="getBookingStatusClass(booking.status)">
                    {{ getBookingStatusText(booking.status) }}
                  </span>
                </td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Действия
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="viewBooking(booking)"><Icon name="heroicons:eye" size="16" class="me-2" />Просмотр</a></li>
                      <li><a class="dropdown-item" @click="editBooking(booking)"><Icon name="heroicons:pencil" size="16" class="me-2" />Редактировать</a></li>
                      <li v-if="booking.status === 'pending'">
                        <a class="dropdown-item" @click="updateBookingStatus(booking, 'confirmed')">
                          <Icon name="heroicons:check" size="16" class="me-2" />
                          Подтвердить
                        </a>
                      </li>
                      <li v-if="booking.status === 'confirmed'">
                        <a class="dropdown-item" @click="updateBookingStatus(booking, 'completed')">
                          <Icon name="heroicons:check-badge" size="16" class="me-2" />
                          Завершить
                        </a>
                      </li>
                      <li v-if="['pending', 'confirmed'].includes(booking.status)">
                        <a class="dropdown-item text-danger" @click="updateBookingStatus(booking, 'cancelled')">
                          <Icon name="heroicons:x-mark" size="16" class="me-2" />
                          Отменить
                        </a>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" @click="deleteBooking(booking)"><Icon name="heroicons:trash" size="16" class="me-2" />Удалить</a></li>
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

    <!-- Create/Edit Booking Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ showCreateModal ? 'Добавить бронирование' : 'Редактировать бронирование' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveBooking">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Клиент *</label>
                  <select v-model="bookingForm.customer" class="form-select" required>
                    <option value="">Выберите клиента</option>
                    <option v-for="customer in customers" :key="customer.id" :value="customer.id">
                      {{ customer.first_name }} {{ customer.last_name }} ({{ customer.email }})
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Сервис *</label>
                  <select v-model="bookingForm.service" class="form-select" required>
                    <option value="">Выберите сервис</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">
                      {{ service.title }} - £{{ service.price }}
                    </option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Дата *</label>
                  <input v-model="bookingForm.preferred_date" type="date" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Время *</label>
                  <input v-model="bookingForm.preferred_time" type="time" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Статус</label>
                  <select v-model="bookingForm.status" class="form-select">
                    <option value="pending">Ожидает</option>
                    <option value="confirmed">Подтверждено</option>
                    <option value="completed">Завершено</option>
                    <option value="cancelled">Отменено</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Провайдер</label>
                  <select v-model="bookingForm.provider" class="form-select">
                    <option value="">Выберите провайдера</option>
                    <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                      {{ provider.first_name }} {{ provider.last_name }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Примечания</label>
                  <textarea v-model="bookingForm.notes" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn-primary" @click="saveBooking" :disabled="saving">
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
import { useBookingsApi } from '~/composables/useBookingsApi'
import { useServicesApi } from '~/composables/useServicesApi'
import { useAdminApi } from '~/composables/useAdminApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { getBookings, createBooking, updateBooking, deleteBooking: deleteBookingApi } = useBookingsApi()
const { getServices } = useServicesApi()
const { getUsers } = useAdminApi()

// State
const loading = ref(false)
const saving = ref(false)
const bookings = ref([])
const services = ref([])
const customers = ref([])
const providers = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedBooking = ref(null)

const stats = ref({
  pending: 0,
  confirmed: 0,
  completed: 0,
  cancelled: 0
})

const filters = ref({
  search: '',
  status: '',
  date_from: '',
  date_to: ''
})

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize: 20
})

const bookingForm = ref({
  customer: '',
  service: '',
  preferred_date: '',
  preferred_time: '',
  status: 'pending',
  provider: '',
  notes: ''
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
const loadBookings = async () => {
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
    
    const response = await getBookings(params)
    bookings.value = response.results || []
    pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
    pagination.value.totalCount = response.count
    
    // Calculate stats
    calculateStats()
  } catch (error) {
    console.error('Ошибка загрузки бронирований:', error)
  } finally {
    loading.value = false
  }
}

const loadServices = async () => {
  try {
    const response = await getServices({ page_size: 100 })
    services.value = response.results || []
  } catch (error) {
    console.error('Ошибка загрузки сервисов:', error)
  }
}

const loadCustomers = async () => {
  try {
    const response = await getUsers({ role: 'customer', page_size: 100 })
    customers.value = response.results || []
  } catch (error) {
    console.error('Ошибка загрузки клиентов:', error)
  }
}

const loadProviders = async () => {
  try {
    const response = await getUsers({ role: 'service_provider', page_size: 100 })
    providers.value = response.results || []
  } catch (error) {
    console.error('Ошибка загрузки провайдеров:', error)
  }
}

const calculateStats = () => {
  stats.value = {
    pending: bookings.value.filter(b => b.status === 'pending').length,
    confirmed: bookings.value.filter(b => b.status === 'confirmed').length,
    completed: bookings.value.filter(b => b.status === 'completed').length,
    cancelled: bookings.value.filter(b => b.status === 'cancelled').length
  }
}

const debouncedSearch = debounce(() => {
  pagination.value.currentPage = 1
  loadBookings()
}, 500)

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    date_from: '',
    date_to: ''
  }
  pagination.value.currentPage = 1
  loadBookings()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadBookings()
  }
}

const refreshBookings = () => {
  loadBookings()
}

const viewBooking = (booking) => {
  // Navigate to booking detail page
  navigateTo(`/admin/bookings/${booking.id}`)
}

const editBooking = (booking) => {
  selectedBooking.value = booking
  bookingForm.value = {
    customer: booking.customer?.id || '',
    service: booking.service?.id || '',
    preferred_date: booking.preferred_date || '',
    preferred_time: booking.preferred_time || '',
    status: booking.status,
    provider: booking.provider?.id || '',
    notes: booking.notes || ''
  }
  showEditModal.value = true
}

const saveBooking = async () => {
  saving.value = true
  try {
    const bookingData = { ...bookingForm.value }
    
    if (showCreateModal.value) {
      await createBooking(bookingData)
    } else {
      await updateBooking(selectedBooking.value.id, bookingData)
    }
    
    closeModal()
    loadBookings()
  } catch (error) {
    console.error('Ошибка сохранения бронирования:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedBooking.value = null
  bookingForm.value = {
    customer: '',
    service: '',
    preferred_date: '',
    preferred_time: '',
    status: 'pending',
    provider: '',
    notes: ''
  }
}

const updateBookingStatus = async (booking, newStatus) => {
  try {
    await updateBooking(booking.id, { status: newStatus })
    loadBookings()
  } catch (error) {
    console.error('Ошибка изменения статуса бронирования:', error)
  }
}

const deleteBooking = async (booking) => {
  if (confirm(`Вы уверены, что хотите удалить бронирование #${booking.id}?`)) {
    try {
      await deleteBookingApi(booking.id)
      loadBookings()
    } catch (error) {
      console.error('Ошибка удаления бронирования:', error)
    }
  }
}

const getBookingStatusClass = (status) => {
  const statusMap = {
    'pending': 'bg-warning',
    'confirmed': 'bg-success',
    'completed': 'bg-info',
    'cancelled': 'bg-danger'
  }
  return statusMap[status] || 'bg-secondary'
}

const getBookingStatusText = (status) => {
  const statusMap = {
    'pending': 'Ожидает',
    'confirmed': 'Подтверждено',
    'completed': 'Завершено',
    'cancelled': 'Отменено'
  }
  return statusMap[status] || status
}

const formatDate = (dateString) => {
  if (!dateString) return 'Неизвестно'
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}

const formatDateTime = (dateString) => {
  if (!dateString) return 'Неизвестно'
  const date = new Date(dateString)
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
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
  loadBookings()
  loadServices()
  loadCustomers()
  loadProviders()
})
</script>

<style scoped>
.admin-bookings {
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
