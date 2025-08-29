<template>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="text-center">
          <!-- Success Icon -->
          <div class="mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                 style="width: 80px; height: 80px;">
              <Icon name="heroicons:check" size="40" />
            </div>
          </div>

          <!-- Success Message -->
          <h1 class="h2 mb-3 fw-bold text-success" style="font-family: var(--font-inter);">
            Регистрация успешна!
          </h1>
          
          <p class="lead text-muted mb-4">
            Спасибо за регистрацию в Banister! Мы отправили письмо с подтверждением на ваш email.
          </p>

          <!-- Email Info -->
          <div v-if="email" class="alert alert-info mb-4">
            <Icon name="heroicons:envelope" size="20" class="me-2" />
            <strong>Email:</strong> {{ email }}
          </div>

          <!-- Role Info -->
          <div v-if="role" class="alert alert-light mb-4">
            <Icon name="heroicons:user" size="20" class="me-2" />
            <strong>Тип аккаунта:</strong> 
            <span v-if="role === 'client'">Клиент</span>
            <span v-else-if="role === 'provider'">Поставщик услуг</span>
            <span v-else>{{ role }}</span>
          </div>

          <!-- Instructions -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body">
              <h5 class="card-title mb-3">
                <Icon name="heroicons:information-circle" size="20" class="me-2 text-primary" />
                Что делать дальше?
              </h5>
              <ol class="list-unstyled mb-0">
                <li class="mb-2">
                  <Icon name="heroicons:envelope-open" size="16" class="me-2 text-primary" />
                  Проверьте свою почту и нажмите на ссылку подтверждения
                </li>
                <li class="mb-2">
                  <Icon name="heroicons:clock" size="16" class="me-2 text-primary" />
                  Подтверждение может занять несколько минут
                </li>
                <li class="mb-2">
                  <Icon name="heroicons:arrow-right" size="16" class="me-2 text-primary" />
                  После подтверждения вы сможете войти в систему
                </li>
              </ol>
            </div>
          </div>

          <!-- Actions -->
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <button 
              class="btn btn-outline-primary"
              @click="resendConfirmation"
              :disabled="resendLoading"
            >
              <Icon name="heroicons:arrow-path" size="16" class="me-2" />
              {{ resendLoading ? 'Отправка...' : 'Отправить повторно' }}
            </button>
            
            <NuxtLink to="/login" class="btn btn-primary">
              <Icon name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />
              Перейти к входу
            </NuxtLink>
          </div>

          <!-- Additional Info for Email Confirmation -->
          <div v-if="isEmailConfirmed" class="mt-4">
            <div class="alert alert-success">
              <Icon name="heroicons:check-circle" size="20" class="me-2" />
              <strong>Email подтвержден!</strong> Теперь вы можете войти в свой профиль.
            </div>
            
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <NuxtLink :to="getProfileLink()" class="btn btn-success">
                <Icon name="heroicons:user" size="16" class="me-2" />
                Перейти к профилю
              </NuxtLink>
            </div>
          </div>

          <!-- Help -->
          <div class="mt-4">
            <p class="text-muted small mb-0">
              Не получили письмо? Проверьте папку "Спам" или 
              <a href="#" @click="contactSupport" class="text-decoration-none">свяжитесь с поддержкой</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthApi } from '~/composables/useAuthApi'
import { log } from '~/utils/logger'

// Get query parameters
const route = useRoute()
const email = ref(route.query.email || '')
const role = ref(route.query.role || '')
const isEmailConfirmed = ref(route.query.confirmed === 'true')

// State
const resendLoading = ref(false)

// Composables
const { resendConfirmationEmail } = useAuthApi()

// Methods
const resendConfirmation = async () => {
  if (!email.value) {
    return
  }

  resendLoading.value = true
  try {
    await resendConfirmationEmail(email.value)
    // Show success message
    log.info('Confirmation email resent successfully')
  } catch (error) {
    console.error('Error resending confirmation email:', error)
  } finally {
    resendLoading.value = false
  }
}

const contactSupport = () => {
  // Implement contact support functionality
  log.info('Contact support')
}

const getProfileLink = () => {
  const userRole = role.value || 'client'
  
  switch (userRole) {
    case 'provider':
      return '/provider/profile'
    case 'management':
      return '/management/account-information'
    case 'admin':
    case 'super_admin':
    case 'hr':
    case 'supervisor':
      return '/admin/users'
    default:
      return '/customer/profile'
  }
}

// SEO
useHead({
  title: 'Регистрация успешна - Banister',
  meta: [
    { name: 'description', content: 'Регистрация в Banister прошла успешно. Проверьте email для подтверждения аккаунта.' }
  ]
})
</script>

<style scoped>
.alert {
  border-left: 4px solid var(--color-primary-green);
}

.card {
  border-left: 4px solid var(--color-primary-green);
}

.btn {
  min-width: 160px;
}

@media (max-width: 576px) {
  .d-flex.flex-sm-row {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
