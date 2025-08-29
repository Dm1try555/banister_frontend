<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="mb-4" style="font-family: var(--font-inter);">Информация об аккаунте</h1>
      </div>
    </div>

    <!-- Email Verification Banner -->
    <EmailVerificationBanner :user="user" />

    <!-- Account Information Card -->
    <div class="row">
      <div class="col-lg-8">
        <AppCard customClass="border-0 shadow-sm">
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
            </div>
            
            <div v-else-if="user" class="account-info">
              <!-- Personal Information -->
              <div class="mb-4">
                <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                  <Icon name="heroicons:user" size="20" class="me-2" />
                  Личная информация
                </h5>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label text-muted">Имя</label>
                    <div class="form-control-plaintext fw-medium">{{ user.first_name || 'Не указано' }}</div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Фамилия</label>
                    <div class="form-control-plaintext fw-medium">{{ user.last_name || 'Не указано' }}</div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Email</label>
                    <div class="d-flex align-items-center">
                      <div class="form-control-plaintext fw-medium me-2">{{ user.email }}</div>
                      <Icon 
                        v-if="user.is_email_verified" 
                        name="heroicons:check-circle" 
                        size="20" 
                        class="text-success" 
                        title="Email подтвержден"
                      />
                      <Icon 
                        v-else 
                        name="heroicons:exclamation-triangle" 
                        size="20" 
                        class="text-warning" 
                        title="Email не подтвержден"
                      />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Телефон</label>
                    <div class="form-control-plaintext fw-medium">{{ user.phone_number || 'Не указан' }}</div>
                  </div>
                </div>
              </div>

              <!-- Account Status -->
              <div class="mb-4">
                <h5 class="mb-3 fw-semibold" style="font-family: var(--font-inter);">
                  <Icon name="heroicons:shield-check" size="20" class="me-2" />
                  Статус аккаунта
                </h5>
                <div class="row g-3">
                  <div class="col-md-6">
                    <label class="form-label text-muted">Роль</label>
                    <div class="form-control-plaintext fw-medium">
                      <span class="badge bg-primary">{{ getUserRoleName(user.role) }}</span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Статус</label>
                    <div class="form-control-plaintext fw-medium">
                      <span class="badge" :class="user.is_active ? 'bg-success' : 'bg-danger'">
                        {{ user.is_active ? 'Активен' : 'Неактивен' }}
                      </span>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Дата регистрации</label>
                    <div class="form-control-plaintext fw-medium">{{ formatDate(user.date_joined) }}</div>
                  </div>
                  <div class="col-md-6">
                    <label class="form-label text-muted">Последний вход</label>
                    <div class="form-control-plaintext fw-medium">{{ formatDate(user.last_login) }}</div>
                  </div>
                </div>
              </div>

              <!-- Actions -->
              <div class="d-flex gap-2">
                <button class="btn btn-primary">
                  <Icon name="heroicons:pencil" size="16" class="me-2" />
                  Редактировать профиль
                </button>
                <button class="btn btn-outline-secondary">
                  <Icon name="heroicons:key" size="16" class="me-2" />
                  Изменить пароль
                </button>
              </div>
            </div>
            
            <div v-else class="text-center py-4">
              <Icon name="heroicons:exclamation-triangle" size="48" class="text-muted mb-3" />
              <h5 class="text-muted">Не удалось загрузить информацию об аккаунте</h5>
              <button class="btn btn-primary" @click="loadProfile">
                <Icon name="heroicons:arrow-path" size="16" class="me-2" />
                Попробовать снова
              </button>
            </div>
          </div>
        </AppCard>
      </div>
      
      <!-- Sidebar -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <h6 class="card-title mb-3 fw-semibold" style="font-family: var(--font-inter);">
              <Icon name="heroicons:information-circle" size="18" class="me-2" />
              Быстрые действия
            </h6>
            <div class="d-grid gap-2">
              <button class="btn btn-outline-primary btn-sm">
                <Icon name="heroicons:envelope" size="14" class="me-2" />
                Подтвердить email
              </button>
              <button class="btn btn-outline-secondary btn-sm">
                <Icon name="heroicons:bell" size="14" class="me-2" />
                Настройки уведомлений
              </button>
              <button class="btn btn-outline-secondary btn-sm">
                <Icon name="heroicons:shield-check" size="14" class="me-2" />
                Безопасность
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthApi } from '~/composables/useAuthApi'
import { formatDate } from '~/utils/date'
import EmailVerificationBanner from '~/components/EmailVerificationBanner.vue'

definePageMeta({ 
  layout: 'management-dashboard',
  middleware: 'auth'
})

// Composables
const { getProfile, loading } = useAuthApi()

// State
const user = ref(null)

// Methods
const loadProfile = async () => {
  try {
    const profile = await getProfile()
    user.value = profile
  } catch (error) {
    console.error('Error loading profile:', error)
  }
}

const getUserRoleName = (role) => {
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

// Lifecycle
onMounted(() => {
  loadProfile()
})
</script>
  
