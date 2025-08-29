<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h1 class="mb-0" style="font-family: var(--font-inter);">Управление администраторами</h1>
          <button 
            class="btn btn-primary"
            @click="createAdmin"
            v-if="canCreate"
          >
            <Icon name="heroicons:plus" size="16" class="me-2" />
            Добавить администратора
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
                <select v-model="filters.role" class="form-select" @change="loadAdmins">
                  <option value="">Все роли</option>
                  <option value="admin">Администратор</option>
                  <option value="super_admin">Супер администратор</option>
                  <option value="hr">HR</option>
                  <option value="supervisor">Супервайзер</option>
                </select>
              </div>
              <div class="col-md-3">
                <label class="form-label">Статус</label>
                <select v-model="filters.is_active" class="form-select" @change="loadAdmins">
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

    <!-- Admins Table -->
    <div class="row">
      <div class="col-lg-12">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body p-0">
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
            </div>
            
            <div v-else-if="admins.length === 0" class="text-center py-5">
              <Icon name="heroicons:users" size="64" class="text-muted mb-3" />
              <h5 class="text-muted">Администраторы не найдены</h5>
              <p class="text-muted">Добавьте первого администратора</p>
            </div>
            
            <div v-else class="table-responsive">
              <table class="table table-hover mb-0">
                <thead class="table-light">
                  <tr>
                    <th>Администратор</th>
                    <th>Роль</th>
                    <th>Email</th>
                    <th>Телефон</th>
                    <th>Статус</th>
                    <th>Последний вход</th>
                    <th>Доступы</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="admin in admins" :key="admin.id">
                    <td>
                      <div class="d-flex align-items-center">
                        <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white me-3"
                             style="width: 40px; height: 40px;">
                          {{ getInitials(admin) }}
                        </div>
                        <div>
                          <div class="fw-semibold">{{ admin.first_name }} {{ admin.last_name }}</div>
                          <small class="text-muted">ID: {{ admin.id }}</small>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge" :class="getRoleBadgeClass(admin.role)">
                        {{ getRoleName(admin.role) }}
                      </span>
                    </td>
                    <td>
                      <div class="d-flex align-items-center">
                        {{ admin.email }}
                        <Icon 
                          v-if="admin.is_email_verified" 
                          name="heroicons:check-circle" 
                          size="16" 
                          class="text-success ms-2" 
                          title="Email подтвержден"
                        />
                      </div>
                    </td>
                    <td>{{ admin.phone_number || 'Не указан' }}</td>
                    <td>
                      <span class="badge" :class="admin.is_active ? 'bg-success' : 'bg-danger'">
                        {{ admin.is_active ? 'Активен' : 'Неактивен' }}
                      </span>
                    </td>
                    <td>{{ formatDate(admin.last_login) }}</td>
                    <td>
                      <button 
                        class="btn btn-sm btn-outline-primary"
                        @click="managePermissions(admin)"
                        v-if="canManagePermissions"
                      >
                        <Icon name="heroicons:key" size="14" class="me-1" />
                        Доступы
                      </button>
                    </td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                          <Icon name="heroicons:ellipsis-vertical" size="14" />
                        </button>
                        <ul class="dropdown-menu">
                          <li v-if="canEdit">
                            <a class="dropdown-item" @click="editAdmin(admin)">
                              <Icon name="heroicons:pencil" size="14" class="me-2" />
                              Редактировать
                            </a>
                          </li>
                          <li v-if="canDelete && admin.id !== currentUserId">
                            <a class="dropdown-item text-danger" @click="deleteAdmin(admin)">
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
const admins = ref([])
const searchQuery = ref('')

// Computed
const currentUserId = computed(() => {
  const user = getItem('user')
  return user ? JSON.parse(user).id : null
})

const canCreate = computed(() => {
  const userRole = getItem('user_role')
  return userRole === 'super_admin'
})

const canEdit = computed(() => {
  const userRole = getItem('user_role')
  return ['super_admin', 'admin'].includes(userRole)
})

const canDelete = computed(() => {
  const userRole = getItem('user_role')
  return userRole === 'super_admin'
})

const canManagePermissions = computed(() => {
  const userRole = getItem('user_role')
  return userRole === 'super_admin'
})

// Methods
const loadAdmins = async () => {
  try {
    const response = await getUsers({
      page: pagination.pagination.value.currentPage,
      page_size: pagination.pagination.value.pageSize,
      role: 'admin,super_admin,hr,supervisor',
      ...filters.createParams()
    })
    
    if (response) {
      admins.value = response.results || []
      pagination.updateFromResponse(response)
    }
  } catch (error) {
    console.error('Error loading admins:', error)
  }
}

const debouncedSearch = debounced.search(() => {
  filters.updateFilter('search', searchQuery.value)
  loadAdmins()
})

const clearFilters = () => {
  filters.clear()
  searchQuery.value = ''
  loadAdmins()
}

const createAdmin = () => {
  navigateTo('/admin/admins/create')
}

const editAdmin = (admin) => {
  navigateTo(`/admin/admins/edit/${admin.id}`)
}

const deleteAdmin = async (admin) => {
  if (confirm(`Вы уверены, что хотите удалить администратора ${admin.first_name} ${admin.last_name}?`)) {
    try {
      await deleteUser(admin.id)
      await loadAdmins()
    } catch (error) {
      console.error('Error deleting admin:', error)
    }
  }
}

const managePermissions = (admin) => {
  navigateTo(`/admin/admins/permissions/${admin.id}`)
}

const getInitials = (admin) => {
  return `${admin.first_name[0]}${admin.last_name[0]}`.toUpperCase()
}

const getRoleName = (role) => {
  const roleNames = {
    'admin': 'Администратор',
    'super_admin': 'Супер администратор',
    'hr': 'HR',
    'supervisor': 'Супервайзер'
  }
  return roleNames[role] || role
}

const getRoleBadgeClass = (role) => {
  const classes = {
    'admin': 'bg-primary',
    'super_admin': 'bg-danger',
    'hr': 'bg-info',
    'supervisor': 'bg-warning'
  }
  return classes[role] || 'bg-secondary'
}

// Lifecycle
onMounted(() => {
  loadAdmins()
})
</script>
