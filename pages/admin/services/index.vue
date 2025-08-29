<template>
  <div class="admin-services">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Управление сервисами
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Модерация и управление всеми сервисами платформы
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshServices">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
        <button class="btn btn-primary" @click="showCreateModal = true">
          <Icon name="heroicons:plus" size="16" class="me-2" />
          Добавить сервис
        </button>
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
              placeholder="Название, описание..."
              @input="debouncedSearch"
            />
          </div>
          <div class="col-md-2">
            <label class="form-label small">Статус</label>
            <select v-model="filters.is_active" class="form-select" @change="loadServices">
              <option value="">Все</option>
              <option value="true">Активные</option>
              <option value="false">Неактивные</option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Провайдер</label>
            <select v-model="filters.provider" class="form-select" @change="loadServices">
              <option value="">Все</option>
              <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                {{ provider.first_name }} {{ provider.last_name }}
              </option>
            </select>
          </div>
          <div class="col-md-2">
            <label class="form-label small">Цена</label>
            <select v-model="filters.price_range" class="form-select" @change="loadServices">
              <option value="">Все</option>
              <option value="0-50">£0 - £50</option>
              <option value="50-100">£50 - £100</option>
              <option value="100-200">£100 - £200</option>
              <option value="200+">£200+</option>
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

    <!-- Services Table -->
    <AppCard customClass="border-0 shadow-sm">
      <div class="card-body p-0">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>
        
        <div v-else-if="services.length === 0" class="text-center py-5">
          <Icon name="heroicons:wrench-screwdriver" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Сервисы не найдены</h5>
          <p class="text-muted">Попробуйте изменить фильтры поиска</p>
        </div>
        
        <div v-else class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Сервис</th>
                <th>Провайдер</th>
                <th>Цена</th>
                <th>Статус</th>
                <th>Дата создания</th>
                <th class="text-end">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services" :key="service.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-3"
                         style="width: 40px; height: 40px;">
                      <Icon name="heroicons:wrench-screwdriver" size="20" class="text-primary" />
                    </div>
                    <div>
                      <div class="fw-semibold" style="font-family: var(--font-inter);">
                        {{ service.title }}
                      </div>
                      <div class="small text-muted">{{ service.description?.substring(0, 50) }}...</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div v-if="service.provider">
                    <div class="fw-semibold">{{ service.provider.first_name }} {{ service.provider.last_name }}</div>
                    <div class="small text-muted">{{ service.provider.email }}</div>
                  </div>
                  <div v-else class="text-muted">Не назначен</div>
                </td>
                <td>
                  <div class="fw-semibold text-success">£{{ service.price }}</div>
                </td>
                <td>
                  <span class="badge" :class="service.is_active ? 'bg-success' : 'bg-danger'">
                    {{ service.is_active ? 'Активен' : 'Неактивен' }}
                  </span>
                </td>
                <td>
                  <div class="small">{{ formatDate(service.created_at) }}</div>
                </td>
                <td class="text-end">
                  <div class="dropdown">
                    <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      Действия
                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" @click="viewService(service)"><Icon name="heroicons:eye" size="16" class="me-2" />Просмотр</a></li>
                      <li><a class="dropdown-item" @click="editService(service)"><Icon name="heroicons:pencil" size="16" class="me-2" />Редактировать</a></li>
                      <li><a class="dropdown-item" @click="toggleServiceStatus(service)">
                        <Icon name="heroicons:power" size="16" class="me-2" />
                        {{ service.is_active ? 'Деактивировать' : 'Активировать' }}
                      </a></li>
                      <li><hr class="dropdown-divider"></li>
                      <li><a class="dropdown-item text-danger" @click="deleteService(service)"><Icon name="heroicons:trash" size="16" class="me-2" />Удалить</a></li>
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

    <!-- Create/Edit Service Modal -->
    <div v-if="showCreateModal || showEditModal" class="modal show d-block" tabindex="-1" style="background-color: rgba(0,0,0,0.5);">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ showCreateModal ? 'Добавить сервис' : 'Редактировать сервис' }}
            </h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveService">
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Название сервиса *</label>
                  <input v-model="serviceForm.title" type="text" class="form-control" required />
                </div>
                <div class="col-12">
                  <label class="form-label">Описание *</label>
                  <textarea v-model="serviceForm.description" class="form-control" rows="4" required></textarea>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Цена (£) *</label>
                  <input v-model="serviceForm.price" type="number" step="0.01" min="0" class="form-control" required />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Провайдер</label>
                  <select v-model="serviceForm.provider" class="form-select">
                    <option value="">Выберите провайдера</option>
                    <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                      {{ provider.first_name }} {{ provider.last_name }}
                    </option>
                  </select>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="serviceForm.is_active" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Активный сервис</label>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn-primary" @click="saveService" :disabled="saving">
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
import { useServicesApi } from '~/composables/useServicesApi'
import { useAdminApi } from '~/composables/useAdminApi'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// Composables
const { getServices, createService, updateService, deleteService: deleteServiceApi } = useServicesApi()
const { getUsers } = useAdminApi()

// State
const loading = ref(false)
const saving = ref(false)
const services = ref([])
const providers = ref([])
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedService = ref(null)

const filters = ref({
  search: '',
  is_active: '',
  provider: '',
  price_range: ''
})

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalCount: 0,
  pageSize: 20
})

const serviceForm = ref({
  title: '',
  description: '',
  price: '',
  provider: '',
  is_active: true
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
const loadServices = async () => {
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
    
    const response = await getServices(params)
    services.value = response.results || []
    pagination.value.totalPages = Math.ceil(response.count / pagination.value.pageSize)
    pagination.value.totalCount = response.count
  } catch (error) {
    console.error('Ошибка загрузки сервисов:', error)
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

const debouncedSearch = debounce(() => {
  pagination.value.currentPage = 1
  loadServices()
}, 500)

const clearFilters = () => {
  filters.value = {
    search: '',
    is_active: '',
    provider: '',
    price_range: ''
  }
  pagination.value.currentPage = 1
  loadServices()
}

const changePage = (page) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    pagination.value.currentPage = page
    loadServices()
  }
}

const refreshServices = () => {
  loadServices()
}

const viewService = (service) => {
  // Navigate to service detail page
  navigateTo(`/admin/services/${service.id}`)
}

const editService = (service) => {
  selectedService.value = service
  serviceForm.value = {
    title: service.title,
    description: service.description,
    price: service.price,
    provider: service.provider?.id || '',
    is_active: service.is_active
  }
  showEditModal.value = true
}

const saveService = async () => {
  saving.value = true
  try {
    const serviceData = { ...serviceForm.value }
    
    if (showCreateModal.value) {
      await createService(serviceData)
    } else {
      await updateService(selectedService.value.id, serviceData)
    }
    
    closeModal()
    loadServices()
  } catch (error) {
    console.error('Ошибка сохранения сервиса:', error)
  } finally {
    saving.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  selectedService.value = null
  serviceForm.value = {
    title: '',
    description: '',
    price: '',
    provider: '',
    is_active: true
  }
}

const toggleServiceStatus = async (service) => {
  try {
    await updateService(service.id, { is_active: !service.is_active })
    loadServices()
  } catch (error) {
    console.error('Ошибка изменения статуса сервиса:', error)
  }
}

const deleteService = async (service) => {
  if (confirm(`Вы уверены, что хотите удалить сервис "${service.title}"?`)) {
    try {
      await deleteServiceApi(service.id)
      loadServices()
    } catch (error) {
      console.error('Ошибка удаления сервиса:', error)
    }
  }
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
  loadServices()
  loadProviders()
})
</script>

<style scoped>
.admin-services {
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
