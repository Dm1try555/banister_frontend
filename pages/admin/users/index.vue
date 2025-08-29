<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mb-0" style="font-family: var(--font-inter);">Управление пользователями</h1>
          <button 
            class="btn btn-primary"
            @click="createUser"
            v-if="canCreate"
          >
            <Icon name="heroicons:plus" size="16" class="me-2" />
            Добавить пользователя
          </button>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="row mb-4">
      <div class="col-lg-12">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">Поиск</label>
                <input 
                  v-model="searchQuery"
                  type="text" 
                  class="form-control"
                  placeholder="Поиск по имени, email..."
                  @input="debouncedSearch"
                />
              </div>
              <div class="col-md-3">
                <label class="form-label">Роль</label>
                <select v-model="filters.role" class="form-select" @change="loadUsers">
                  <option value="">Все роли</option>
                  <option value="customer">Клиент</option>
                  <option value="service_provider">Поставщик услуг</option>
                  <option value="management">Менеджер</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Статус</label>
                <select v-model="filters.is_active" class="form-select" @change="loadUsers">
                  <option value="">Все статусы</option>
                  <option value="true">Активные</option>
                  <option value="false">Неактивные</option>
                </select>
              </div>
              <div class="col-md-2">
                <label class="form-label">&nbsp;</label>
                <button class="btn btn-outline-secondary w-100" @click="clearFilters">
                  <Icon name="heroicons:x-mark" size="16" class="me-1" />
                  Очистить
                </button>
              </div>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Users Table -->
    <div class="row">
      <div class="col-lg-12">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body p-0">
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
            </div>
            
            <div v-else-if="users.length === 0" class="text-center py-5">
              <Icon name="heroicons:users" size="64" class="text-muted mb-3" />
              <h5 class="text-muted">Пользователи не найдены</h5>
              <p class="text-muted">Добавьте первого пользователя</p>
            </div>
            
            <div v-else class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Пользователь</th>
                    <th>Роль</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Статус</th>
                    <th>Верификация</th>
                    <th>Последний вход</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white me-3"
                             style="width: 40px; height: 40px;">
                          {{ getInitials(user) }}
                        </div>
                        <div>
                          <div class="fw-semibold">{{ user.first_name }} {{ user.last_name }}</div>
                          <small class="text-muted">ID: {{ user.id }}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge" :class="getRoleBadgeClass(user.role)">
                        {{ getRoleName(user.role) }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        {{ user.email }}
                        <Icon 
                          v-if="user.is_email_verified" 
                          name="heroicons:check-circle" 
                          size="16" 
                          class="text-success ms-2" 
                          title="Email подтвержден"
                        />
                      </div>
                    </td>
                    <td>{{ user.phone_number || 'Не указан' }}</td>
                    <td>
                      <span class="badge" :class="user.is_active ? 'bg-success' : 'bg-danger'">
                        {{ user.is_active ? 'Активен' : 'Неактивен' }}
                      </span>
                    </td>
                    <td>
                      <span class="badge" :class="user.is_verified ? 'bg-success' : 'bg-warning'">
                        {{ user.is_verified ? 'Верифицирован' : 'Не верифицирован' }}
                      </span>
                    </td>
                    <td>{{ formatDate(user.last_login) }}</td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          <Icon name="heroicons:ellipsis-vertical" size="14" />
                        </button>
                        <ul class="dropdown-menu">
                          <li v-if="canEdit">
                            <a class="dropdown-item" @click="editUser(user)">
                              <Icon name="heroicons:pencil" size="14" class="me-2" />
                              Редактировать
                            </a>
                          </li>
                          <li v-if="canDelete">
                            <a class="dropdown-item text-danger" @click="deleteUser(user)">
                              <Icon name="heroicons:trash" size="14" class="me-2" />
                              Удалить
                            </a>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Pagination -->
    <div class="row mt-4" v-if="showPagination">
      <div class="col-lg-12">
        <nav aria-label="Page navigation">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: !canGoPrevious }">
              <button class="page-link" @click="previousPage" :disabled="!canGoPrevious">
                <Icon name="heroicons:chevron-left" size="16" />
              </button>
            </li>
            <li 
              v-for="page in visiblePages" 
              :key="page"
              class="page-item"
              :class="{ active: page === pagination.currentPage }"
            >
              <button class="page-link" @click="changePage(page)">{{ page }}</button>
            </li>
            <li class="page-item" :class="{ disabled: !canGoNext }">
              <button class="page-link" @click="nextPage" :disabled="!canGoNext">
                <Icon name="heroicons:chevron-right" size="16" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminApi } from '~/composables/useAdminApi'
import { usePagination } from '~/composables/usePagination'
import { useFilters } from '~/composables/useFilters'
import { useStorage } from '~/composables/useStorage'
import { formatDate } from '~/utils/date'
import { debounced } from '~/utils/debounce'

// Применяем middleware для проверки доступа
definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin', 'access']
})

// Composables
const { getUsers, deleteUser, loading } = useAdminApi()
const { getItem } = useStorage()
const pagination = usePagination({ pageSize: 20 })
const filters = useFilters({
  initialFilters: {
    search: '',
    role: '',
    is_active: ''
  }
})

// State
const users = ref([])
const searchQuery = ref('')

// Computed
const canCreate = computed(() => {
  const userPermissions = JSON.parse(getItem('user_permissions') || '[]')
  return userPermissions.includes('users.create')
})

const canEdit = computed(() => {
  const userPermissions = JSON.parse(getItem('user_permissions') || '[]')
  return userPermissions.includes('users.edit')
})

const canDelete = computed(() => {
  const userPermissions = JSON.parse(getItem('user_permissions') || '[]')
  return userPermissions.includes('users.delete')
})

// Methods
const loadUsers = async () => {
  try {
    const response = await getUsers({
      page: pagination.pagination.value.currentPage,
      page_size: pagination.pagination.value.pageSize,
      ...filters.createParams()
    })
    
    if (response) {
      users.value = response.results || []
      pagination.updateFromResponse(response)
    }
  } catch (error) {
    console.error('Error loading users:', error)
  }
}

const debouncedSearch = debounced.search(() => {
  filters.updateFilter('search', searchQuery.value)
  loadUsers()
})

const clearFilters = () => {
  filters.clear()
  searchQuery.value = ''
  loadUsers()
}

const createUser = () => {
  navigateTo('/admin/users/create')
}

const editUser = (user) => {
  navigateTo(`/admin/users/edit/${user.id}`)
}

const deleteUserHandler = async (user) => {
  if (confirm(`Вы уверены, что хотите удалить пользователя ${user.first_name} ${user.last_name}?`)) {
    try {
      await deleteUser(user.id)
      await loadUsers()
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

const getInitials = (user) => {
  return `${user.first_name[0]}${user.last_name[0]}`.toUpperCase()
}

const getRoleName = (role) => {
  const roleNames = {
    'customer': 'Клиент',
    'service_provider': 'Поставщик услуг',
    'management': 'Менеджер',
    'admin': 'Администратор',
    'super_admin': 'Супер администратор',
    'hr': 'HR',
    'supervisor': 'Супервайзер'
  }
  return roleNames[role] || role
}

const getRoleBadgeClass = (role) => {
  const classes = {
    'customer': 'bg-primary',
    'service_provider': 'bg-info',
    'management': 'bg-warning',
    'admin': 'bg-secondary',
    'super_admin': 'bg-danger',
    'hr': 'bg-success',
    'supervisor': 'bg-dark'
  }
  return classes[role] || 'bg-secondary'
}

// Lifecycle
onMounted(() => {
  loadUsers()
})
</script>
