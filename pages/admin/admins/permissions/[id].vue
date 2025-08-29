<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="d-flex align-items-center mb-4">
          <NuxtLink to="/admin/admins" class="btn btn-outline-secondary me-3">
            <Icon name="heroicons:arrow-left" size="16" class="me-2" />
            Назад
          </NuxtLink>
          <h1 class="mb-0" style="font-family: var(--font-inter);">
            Управление доступами
          </h1>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Загрузка...</span>
          </div>
        </div>

        <div v-else-if="admin">
          <!-- Admin Info -->
          <AppCard customClass="border-0 shadow-sm mb-4">
            <div class="card-body">
              <div class="d-flex align-items-center">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white me-3"
                     style="width: 60px; height: 60px;">
                  {{ getInitials(admin) }}
                </div>
                <div>
                  <h5 class="mb-1 fw-semibold" style="font-family: var(--font-inter);">
                    {{ admin.first_name }} {{ admin.last_name }}
                  </h5>
                  <p class="text-muted mb-0">{{ admin.email }}</p>
                  <span class="badge" :class="getRoleBadgeClass(admin.role)">
                    {{ getRoleName(admin.role) }}
                  </span>
                </div>
              </div>
            </div>
          </AppCard>

          <!-- Permissions -->
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-body">
              <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                <Icon name="heroicons:key" size="20" class="me-2" />
                Разрешения
              </h5>
              
              <form @submit.prevent="savePermissions">
                <div class="row g-3">
                  <div class="col-12" v-for="category in permissionCategories" :key="category.name">
                    <div class="card border">
                      <div class="card-header bg-light">
                        <h6 class="mb-0 fw-semibold">
                          <Icon :name="category.icon" size="18" class="me-2" />
                          {{ category.name }}
                        </h6>
                        <small class="text-muted">{{ category.description }}</small>
                      </div>
                      <div class="card-body">
                        <div class="row g-3">
                          <div class="col-md-6" v-for="permission in category.permissions" :key="permission.id">
                            <div class="form-check">
                              <input 
                                :id="`permission-${permission.id}`"
                                v-model="selectedPermissions"
                                :value="permission.id"
                                type="checkbox" 
                                class="form-check-input"
                              />
                              <label :for="`permission-${permission.id}`" class="form-check-label">
                                <strong>{{ permission.name }}</strong>
                                <br>
                                <small class="text-muted">{{ permission.description }}</small>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Error Messages -->
                  <div v-if="errorMessages.length" class="col-12">
                    <div class="alert alert-danger">
                      <ul class="mb-0 ps-3">
                        <li v-for="(msg, idx) in errorMessages" :key="idx">{{ msg }}</li>
                      </ul>
                    </div>
                  </div>
                  <div v-else-if="error" class="col-12">
                    <div class="alert alert-danger">{{ error }}</div>
                  </div>

                  <!-- Actions -->
                  <div class="col-12 mt-4">
                    <div class="d-flex gap-2">
                      <button 
                        type="submit" 
                        class="btn btn-primary"
                        :disabled="saving"
                      >
                        <Icon v-if="saving" name="heroicons:arrow-path" size="16" class="me-2" />
                        <Icon v-else name="heroicons:check" size="16" class="me-2" />
                        {{ saving ? 'Сохранение...' : 'Сохранить разрешения' }}
                      </button>
                      
                      <NuxtLink to="/admin/admins" class="btn btn-secondary">
                        Отмена
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </AppCard>
        </div>

        <div v-else class="text-center py-5">
          <Icon name="heroicons:exclamation-triangle" size="64" class="text-muted mb-3" />
          <h5 class="text-muted">Администратор не найден</h5>
          <NuxtLink to="/admin/admins" class="btn btn-primary">
            Вернуться к списку
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminApi } from '~/composables/useAdminApi'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin', 'access']
})

const route = useRoute()
const router = useRouter()
const { getUser, updateUserPermissions, getPermissionsList, loading, error } = useAdminApi()

// State
const admin = ref(null)
const selectedPermissions = ref([])
const availablePermissions = ref([])
const saving = ref(false)
const errorMessages = ref([])

// Computed
const permissionCategories = computed(() => {
  const categories = {
    'users': {
      name: 'Управление пользователями',
      description: 'Разрешения для работы с пользователями',
      icon: 'heroicons:users',
      permissions: []
    },
    'services': {
      name: 'Управление услугами',
      description: 'Разрешения для работы с услугами',
      icon: 'heroicons:wrench-screwdriver',
      permissions: []
    },
    'bookings': {
      name: 'Управление заказами',
      description: 'Разрешения для работы с заказами',
      icon: 'heroicons:calendar-days',
      permissions: []
    },
    'payments': {
      name: 'Управление платежами',
      description: 'Разрешения для работы с платежами',
      icon: 'heroicons:credit-card',
      permissions: []
    },
    'notifications': {
      name: 'Управление уведомлениями',
      description: 'Разрешения для работы с уведомлениями',
      icon: 'heroicons:bell',
      permissions: []
    },
    'system': {
      name: 'Системные разрешения',
      description: 'Разрешения для работы с системой',
      icon: 'heroicons:cog-6-tooth',
      permissions: []
    }
  }

  // Group permissions by category
  availablePermissions.value.forEach(permission => {
    const category = permission.category || 'system'
    if (categories[category]) {
      categories[category].permissions.push(permission)
    }
  })

  return Object.values(categories).filter(category => category.permissions.length > 0)
})

// Methods
const loadAdmin = async () => {
  try {
    const adminData = await getUser(route.params.id)
    admin.value = adminData
    
    // Load current permissions
    if (adminData.permissions) {
      selectedPermissions.value = adminData.permissions.map(p => p.id)
    }
  } catch (error) {
    console.error('Error loading admin:', error)
  }
}

const loadPermissions = async () => {
  try {
    const permissions = await getPermissionsList()
    availablePermissions.value = permissions || []
  } catch (error) {
    console.error('Error loading permissions:', error)
  }
}

const savePermissions = async () => {
  errorMessages.value = []
  saving.value = true
  
  try {
    await updateUserPermissions(route.params.id, {
      permissions: selectedPermissions.value
    })
    
    // Redirect to admins list
    router.push('/admin/admins')
  } catch (e) {
    console.error('Save permissions failed:', e)
    // Error is handled by useAdminApi
  } finally {
    saving.value = false
  }
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
onMounted(async () => {
  await Promise.all([
    loadAdmin(),
    loadPermissions()
  ])
})
</script>