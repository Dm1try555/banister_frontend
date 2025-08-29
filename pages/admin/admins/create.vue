<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <div class="d-flex align-items-center mb-4">
          <NuxtLink to="/admin/admins" class="btn btn-outline-secondary me-3">
            <Icon name="heroicons:arrow-left" size="16" class="me-2" />
            Назад
          </NuxtLink>
          <h1 class="mb-0" style="font-family: var(--font-inter);">Создать администратора</h1>
        </div>

        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body">
            <form @submit.prevent="createAdmin">
              <div class="row g-3">
                <!-- Personal Information -->
                <div class="col-12">
                  <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                    <Icon name="heroicons:user" size="20" class="me-2" />
                    Личная информация
                  </h5>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Имя *</label>
                  <input 
                    v-model="form.first_name"
                    type="text" 
                    class="form-control"
                    placeholder="Введите имя"
                    required
                  />
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Фамилия *</label>
                  <input 
                    v-model="form.last_name"
                    type="text" 
                    class="form-control"
                    placeholder="Введите фамилию"
                    required
                  />
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Email *</label>
                  <input 
                    v-model="form.email"
                    type="email" 
                    class="form-control"
                    placeholder="admin@example.com"
                    required
                  />
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Телефон</label>
                  <input 
                    v-model="form.phone_number"
                    type="tel" 
                    class="form-control"
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>

                <!-- Account Settings -->
                <div class="col-12 mt-4">
                  <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                    <Icon name="heroicons:shield-check" size="20" class="me-2" />
                    Настройки аккаунта
                  </h5>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Роль *</label>
                  <select v-model="form.role" class="form-select" required>
                    <option value="">Выберите роль</option>
                    <option value="admin">Администратор</option>
                    <option value="super_admin">Супер администратор</option>
                    <option value="hr">HR</option>
                    <option value="supervisor">Супервайзер</option>
                  </select>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Статус</label>
                  <select v-model="form.is_active" class="form-select">
                    <option value="true">Активен</option>
                    <option value="false">Неактивен</option>
                  </select>
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Пароль *</label>
                  <input 
                    v-model="form.password"
                    type="password" 
                    class="form-control"
                    placeholder="Минимум 8 символов"
                    required
                  />
                </div>
                
                <div class="col-md-6">
                  <label class="form-label">Подтверждение пароля *</label>
                  <input 
                    v-model="form.password_confirm"
                    type="password" 
                    class="form-control"
                    placeholder="Повторите пароль"
                    required
                  />
                </div>

                <!-- Permissions -->
                <div class="col-12 mt-4">
                  <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                    <Icon name="heroicons:key" size="20" class="me-2" />
                    Разрешения
                  </h5>
                  <p class="text-muted">Выберите разрешения для нового администратора</p>
                </div>
                
                <div class="col-12">
                  <div class="row g-3">
                    <div class="col-md-6" v-for="permission in availablePermissions" :key="permission.id">
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
                      :disabled="loading"
                    >
                      <Icon v-if="loading" name="heroicons:arrow-path" size="16" class="me-2" />
                      <Icon v-else name="heroicons:plus" size="16" class="me-2" />
                      {{ loading ? 'Создание...' : 'Создать администратора' }}
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAdminApi } from '~/composables/useAdminApi'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: ['admin', 'access']
})

const router = useRouter()
const { createUser, getPermissionsList, loading, error } = useAdminApi()

// State
const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  role: '',
  is_active: 'true',
  password: '',
  password_confirm: ''
})

const selectedPermissions = ref([])
const availablePermissions = ref([])
const errorMessages = ref([])

// Methods
const createAdmin = async () => {
  errorMessages.value = []
  
  // Validation
  if (!form.value.first_name) {
    errorMessages.value.push('Имя обязательно')
  }
  if (!form.value.last_name) {
    errorMessages.value.push('Фамилия обязательна')
  }
  if (!form.value.email) {
    errorMessages.value.push('Email обязателен')
  }
  if (!form.value.role) {
    errorMessages.value.push('Роль обязательна')
  }
  if (!form.value.password) {
    errorMessages.value.push('Пароль обязателен')
  }
  if (form.value.password.length < 8) {
    errorMessages.value.push('Пароль должен содержать минимум 8 символов')
  }
  if (form.value.password !== form.value.password_confirm) {
    errorMessages.value.push('Пароли не совпадают')
  }
  
  if (errorMessages.value.length > 0) {
    return
  }
  
  try {
    const adminData = {
      username: form.value.email,
      email: form.value.email,
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      phone_number: form.value.phone_number,
      password: form.value.password,
      password_confirm: form.value.password_confirm,
      role: form.value.role,
      is_active: form.value.is_active === 'true',
      permissions: selectedPermissions.value
    }
    
    const response = await createUser(adminData)
    
    if (response) {
      // Redirect to admins list
      router.push('/admin/admins')
    }
  } catch (e) {
    console.error('Create admin failed:', e)
    // Error is handled by useAdminApi
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

// Lifecycle
onMounted(() => {
  loadPermissions()
})
</script>
