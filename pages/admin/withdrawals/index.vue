<template>
  <div class="admin-withdrawals">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Управление выводами средств
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Просмотр и управление заявками на вывод средств
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshWithdrawals">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
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
            <h5 class="mb-1">{{ stats.approved || 0 }}</h5>
            <p class="small text-muted mb-0">Одобрены</p>
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
            <h5 class="mb-1">{{ stats.rejected || 0 }}</h5>
            <p class="small text-muted mb-0">Отклонены</p>
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
              placeholder="ID, пользователь..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Статус</label>
            <select v-model="filters.status" class="form-select" @change="loadWithdrawals">
              <option value="">Все</option>
              <option value="pending">Ожидают</option>
              <option value="approved">Одобрены</option>
              <option value="rejected">Отклонены</option>
              <option value="completed">Завершены</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата от</label>
            <input v-model="filters.date_from" type="date" class="form-control" @change="loadWithdrawals" />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Дата до</label>
            <input v-model="filters.date_to" type="date" class="form-control" @change="loadWithdrawals" />
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

    <!-- Withdrawals Table -->
    <AppCard customClass="border-0 shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="withdrawals.length === 0" class="text-center py-5">
          <Icon name="heroicons:banknotes" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Заявки на вывод не найдены</h5>
          <p class="text-muted">Попробуйте изменить фильтры поиска</p>
        </div>
        
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Заявка</th>
                <th>Пользователь</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th class="text-end">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="withdrawal in withdrawals" :key="withdrawal.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:banknotes" size="20" class="text-primary" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">
                        #{{ withdrawal.id }}
                      </div>
                      <div class="small text-muted">{{ withdrawal.stripe_account_id }}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div v-if="withdrawal.user">
                    <div class="fw-semibold">{{ withdrawal.user.first_name }} {{ withdrawal.user.last_name }}</div>
                    <div class="small text-muted">{{ withdrawal.user.email }}</div>
                  </div>
                  <div v-else class="text-muted">Неизвестно</div>
                </td>
                <td>
                  <div class="fw-semibold text-success">£{{ withdrawal.amount }}</div>
                </td>
                <td>
                  <span class="badge" :class="getWithdrawalStatusClass(withdrawal.status)">
                    {{ getWithdrawalStatusText(withdrawal.status) }}
                  </span>
                </td>
                <td>
                  <div class="small">{{ formatDate(withdrawal.created_at) }}</div>
                </td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Действия
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="viewWithdrawal(withdrawal)"><Icon name="heroicons:eye" size="16" class="me-2" />Просмотр</a></li>
                      <li v-if="withdrawal.status === 'pending'">
                        <a class="dropdown-item text-success" @click="approveWithdrawal(withdrawal)">
                          <Icon name="heroicons:check" size="16" class="me-2" />
                          Одобрить
                        </a>
                      </li>
                      <li v-if="withdrawal.status === 'pending'">
                        <a class="dropdown-item text-danger" @click="rejectWithdrawal(withdrawal)">
                          <Icon name="heroicons:x-mark" size="16" class="me-2" />
                          Отклонить
                        </a>
                      </li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item" @click="downloadReceipt(withdrawal)">
                        <Icon name="heroicons:document-arrow-down" size="16" class="me-2" />
                        Скачать документы
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

    <!-- Approve/Reject Modal -->
    <div v-if="showActionModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ actionType === 'approve' ? 'Одобрить заявку' : 'Отклонить заявку' }}
            </h5>
            <button type="button" class="btn-close" @click="closeActionModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="processAction">
              <div class="mb-3">
                <label class="form-label">Примечание</label>
                <textarea v-model="actionForm.notes" class="form-control" rows="3" :placeholder="actionType === 'approve' ? 'Дополнительная информация...' : 'Причина отклонения...'"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeActionModal">Отмена</button>
            <button type="button" class="btn" :class="actionType === 'approve' ? 'btn-success' : 'btn-danger'" @click="processAction" :disabled="processing">
              <span v-if="processing" class="spinner-border spinner-border-sm me-2"></span>
              {{ actionType === 'approve' ? 'Одобрить' : 'Отклонить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useWithdrawalsApi } from '~/composables/useWithdrawalsApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { getWithdrawals, approveWithdrawal: approveWithdrawalApi, rejectWithdrawal: rejectWithdrawalApi } = useWithdrawalsApi()

// State
const loading = ref(false)
const processing = ref(false)
const withdrawals = ref([])
const showActionModal = ref(false)
const actionType = ref('')
const selectedWithdrawal = ref(null)

const stats = ref({
  pending: 0,
  approved: 0,
  rejected: 0,
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

const actionForm = ref({
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
const loadWithdrawals = async () => {
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
    
    const response = await getWithdrawals(params)
    withdrawals.value = response.results || []
    pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
    pagination.value.totalCount = response.count
    
    // Calculate stats
    calculateStats()
  } catch (error) {
    console.error('Ошибка загрузки заявок на вывод:', error)
  } finally {
    loading.value = false
  }
}

const calculateStats = () => {
  stats.value = {
    pending: withdrawals.value.filter(w => w.status === 'pending').length,
    approved: withdrawals.value.filter(w => w.status === 'approved').length,
    rejected: withdrawals.value.filter(w => w.status === 'rejected').length,
    totalAmount: withdrawals.value.reduce((sum, w) => sum + parseFloat(w.amount || 0), 0)
  }
}

const debouncedSearch = debounce(() => {
  pagination.value.currentPage = 1
  loadWithdrawals()
}, 500)

const clearFilters = () => {
  filters.value = {
    search: '',
    status: '',
    date_from: '',
    date_to: ''
  }
  pagination.value.currentPage = 1
  loadWithdrawals()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadWithdrawals()
  }
}

const refreshWithdrawals = () => {
  loadWithdrawals()
}

const viewWithdrawal = (withdrawal) => {
  // Navigate to withdrawal detail page
  navigateTo(`/admin/withdrawals/${withdrawal.id}`)
}

const approveWithdrawal = (withdrawal) => {
  selectedWithdrawal.value = withdrawal
  actionType.value = 'approve'
  actionForm.value.notes = ''
  showActionModal.value = true
}

const rejectWithdrawal = (withdrawal) => {
  selectedWithdrawal.value = withdrawal
  actionType.value = 'reject'
  actionForm.value.notes = ''
  showActionModal.value = true
}

const processAction = async () => {
  processing.value = true
  try {
    if (actionType.value === 'approve') {
      await approveWithdrawalApi(selectedWithdrawal.value.id, { notes: actionForm.value.notes })
    } else {
      await rejectWithdrawalApi(selectedWithdrawal.value.id, { reason: actionForm.value.notes })
    }
    
    closeActionModal()
    loadWithdrawals()
  } catch (error) {
    console.error('Ошибка обработки заявки:', error)
  } finally {
    processing.value = false
  }
}

const closeActionModal = () => {
  showActionModal.value = false
  actionType.value = ''
  selectedWithdrawal.value = null
  actionForm.value.notes = ''
}

const downloadReceipt = (withdrawal) => {
  // This would generate and download withdrawal documents
  
}

const getWithdrawalStatusClass = (status) => {
  const statusMap = {
    'pending': 'bg-warning',
    'approved': 'bg-success',
    'rejected': 'bg-danger',
    'completed': 'bg-info'
  }
  return statusMap[status] || 'bg-secondary'
}

const getWithdrawalStatusText = (status) => {
  const statusMap = {
    'pending': 'Ожидает',
    'approved': 'Одобрена',
    'rejected': 'Отклонена',
    'completed': 'Завершена'
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
  loadWithdrawals()
})
</script>

<style scoped>
.admin-withdrawals {
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
