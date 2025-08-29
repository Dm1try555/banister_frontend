<template>
  <div class="admin-payments">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Управление платежами
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Просмотр и управление всеми финансовыми операциями
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshPayments">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
        <button class="btn btn-success" @click="showTransferModal = true">
          <Icon name="heroicons:arrow-right-circle" size="16" class="me-2" />
          Перевод средств
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:check-circle" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.completed || 0 }}</h5>
            <p class="small text-muted mb-0">Завершены</p>
          </div>
        </AppCard>
      </div>
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
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:x-circle" size="20" />
            </div>
            <h5 class="mb-1">{{ stats.failed || 0 }}</h5>
            <p class="small text-muted mb-0">Неудачные</p>
          </div>
        </AppCard>
      </div>
      <div class="col-md-3">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body text-center">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-2"
                 style="width: 40px; height: 40px;">
              <Icon name="heroicons:banknotes" size="20" />
            </div>
            <h5 class="mb-1">£{{ (stats.totalAmount || 0).toFixed(2) }}</h5>
            <p class="small text-muted mb-0">Общая сумма</p>
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
              placeholder="ID платежа, клиент..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Статус</label>
            <select v-model="filters.status" class="form-select" @change="loadPayments">
              <option value="">Все</option>
              <option value="pending">Ожидают</option>
              <option value="completed">Завершены</option>
              <option value="failed">Неудачные</option>
              <option value="refunded">Возвращены</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата от</label>
            <input v-model="filters.date_from" type="date" class="form-control" @change="loadPayments" />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата до</label>
            <input v-model="filters.date_to" type="date" class="form-control" @change="loadPayments" />
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

    <!-- Payments Table -->
    <AppCard customClass="border-0 shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="payments.length === 0" class="text-center py-5">
          <Icon name="heroicons:credit-card" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Платежи не найдены</h5>
          <p class="text-muted">Попробуйте изменить фильтры поиска</p>
        </div>
        
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Платеж</th>
                <th>Клиент</th>
                <th>Бронирование</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Дата</th>
                <th class="text-end">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in payments" :key="payment.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:credit-card" size="20" class="text-primary" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">
                        #{{ payment.id }}
                      </div>
                      <div class="small text-muted">{{ payment.payment_method || 'Stripe' }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div v-if="payment.booking?.customer">
                    <div class="fw-semibold">{{ payment.booking.customer.first_name }} {{ payment.booking.customer.last_name }}</div>
                    <div class="small text-muted">{{ payment.booking.customer.email }}</div>
                  </div>
                  <div v-else class="text-muted">Неизвестно</div>
                </td>
                <td>
                  <div v-if="payment.booking">
                    <div class="fw-semibold">#{{ payment.booking.id }}</div>
                    <div class="small text-muted">{{ payment.booking.service?.title || 'Неизвестный сервис' }}</div>
                  </div>
                  <div v-else class="text-muted">Не привязано</div>
                </td>
                <td>
                  <div class="fw-semibold text-success">£{{ payment.amount }}</div>
                </td>
                <td>
                  <span class="badge" :class="getPaymentStatusClass(payment.status)">
                    {{ getPaymentStatusText(payment.status) }}
                  </span>
                </td>
                <td>
                  <div class="small">{{ formatDate(payment.created_at) }}</div>
                </td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Действия
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="viewPayment(payment)"><Icon name="heroicons:eye" size="16" class="me-2" />Просмотр</a></li>
                      <li v-if="payment.status === 'pending'">
                        <a class="dropdown-item" @click="confirmPayment(payment)">
                          <Icon name="heroicons:check" size="16" class="me-2" />
                          Подтвердить
                        </a>
                      </li>
                      <li v-if="payment.status === 'completed'">
                        <a class="dropdown-item text-warning" @click="refundPayment(payment)">
                          <Icon name="heroicons:arrow-uturn-left" size="16" class="me-2" />
                          Возврат
                        </a>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="downloadReceipt(payment)">
                        <Icon name="heroicons:document-arrow-down" size="16" class="me-2" />
                        Скачать чек
                      </a></li>
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

    <!-- Transfer Modal -->
    <div v-if="showTransferModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Перевод средств провайдеру</h5>
            <button type="button" class="btn-close" @click="closeTransferModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="processTransfer">
              <div class="mb-3">
                <label class="form-label">Провайдер *</label>
                <select v-model="transferForm.provider_stripe_account" class="form-select" required>
                  <option value="">Выберите провайдера</option>
                  <option v-for="provider in providers" :key="provider.id" :value="provider.stripe_account_id">
                    {{ provider.first_name }} {{ provider.last_name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label class="form-label">Сумма (£) *</label>
                <input v-model="transferForm.amount" type="number" step="0.01" min="0" class="form-control" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Примечание</label>
                <textarea v-model="transferForm.notes" class="form-control" rows="3"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeTransferModal">Отмена</button>
            <button type="button" class="btn btn-success" @click="processTransfer" :disabled="transferring">
              <span v-if="transferring" class="spinner-border spinner-border-sm me-2"></span>
              Перевести
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePaymentsApi } from '~/composables/usePaymentsApi'
import { useAdminApi } from '~/composables/useAdminApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { getPayments, confirmPayment: confirmPaymentApi, transferPayment } = usePaymentsApi()
const { getUsers } = useAdminApi()

// State
const loading = ref(false)
const transferring = ref(false)
const payments = ref([])
const providers = ref([])
const showTransferModal = ref(false)

const stats = ref({
  completed: 0,
  pending: 0,
  failed: 0,
  totalAmount: 0
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

const transferForm = ref({
  provider_stripe_account: '',
  amount: '',
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
const loadPayments = async () => {
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
    
    const response = await getPayments(params)
    payments.value = response.results || []
    pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
    pagination.value.totalCount = response.count
    
    // Calculate stats
    calculateStats()
  } catch (error) {
    console.error('Ошибка загрузки платежей:', error)
  } finally {
    loading.value = false
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
    completed: payments.value.filter(p => p.status === 'completed').length,
    pending: payments.value.filter(p => p.status === 'pending').length,
    failed: payments.value.filter(p => p.status === 'failed').length,
    totalAmount: payments.value.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0)
  }
}

const debouncedSearch = debounce(() => {
  pagination.value.currentPage = 1
  loadPayments()
}, 500)

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    date_from: '',
    date_to: ''
  }
  pagination.value.currentPage = 1
  loadPayments()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadPayments()
  }
}

const refreshPayments = () => {
  loadPayments()
}

const viewPayment = (payment) => {
  // Navigate to payment detail page
  navigateTo(`/admin/payments/${payment.id}`)
}

const confirmPayment = async (payment) => {
  try {
    await confirmPaymentApi({ payment_intent_id: payment.stripe_payment_intent_id })
    loadPayments()
  } catch (error) {
    console.error('Ошибка подтверждения платежа:', error)
  }
}

const refundPayment = async (payment) => {
  if (confirm(`Вы уверены, что хотите вернуть платеж #${payment.id} на сумму £${payment.amount}?`)) {
    try {
      // This would be a refund API call
      
      loadPayments()
    } catch (error) {
      console.error('Ошибка возврата платежа:', error)
    }
  }
}

const downloadReceipt = (payment) => {
  // This would generate and download a receipt
  
}

const processTransfer = async () => {
  transferring.value = true
  try {
    await transferPayment({
      provider_stripe_account: transferForm.value.provider_stripe_account,
      amount: transferForm.value.amount,
      notes: transferForm.value.notes
    })
    
    closeTransferModal()
    loadPayments()
  } catch (error) {
    console.error('Ошибка перевода средств:', error)
  } finally {
    transferring.value = false
  }
}

const closeTransferModal = () => {
  showTransferModal.value = false
  transferForm.value = {
    provider_stripe_account: '',
    amount: '',
    notes: ''
  }
}

const getPaymentStatusClass = (status) => {
  const statusMap = {
    'pending': 'bg-warning',
    'completed': 'bg-success',
    'failed': 'bg-danger',
    'refunded': 'bg-info'
  }
  return statusMap[status] || 'bg-secondary'
}

const getPaymentStatusText = (status) => {
  const statusMap = {
    'pending': 'Ожидает',
    'completed': 'Завершен',
    'failed': 'Неудачный',
    'refunded': 'Возвращен'
  }
  return statusMap[status] || status
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
  loadPayments()
  loadProviders()
})
</script>

<style scoped>
.admin-payments {
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
