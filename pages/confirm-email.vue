<template>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="text-center">
          <!-- Loading State -->
          <div v-if="loading" class="py-5">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-4"
                 style="width: 80px; height: 80px;">
              <div class="spinner-border text-white" role="status">
                <span class="visually-hidden">Загрузка...</span>
              </div>
            </div>
            <h2 class="mb-3 fw-bold" style="font-family: var(--font-inter);">
              Подтверждение email...
            </h2>
            <p class="text-muted">Пожалуйста, подождите</p>
          </div>

          <!-- Success State -->
          <div v-else-if="success" class="py-5">
            <div class="mb-4">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white"
                   style="width: 80px; height: 80px;">
                <Icon name="heroicons:check" size="40" />
              </div>
            </div>

            <h1 class="h2 mb-3 fw-bold text-success" style="font-family: var(--font-inter);">
              Email подтвержден!
            </h1>
            
            <p class="lead text-muted mb-4">
              Ваш email адрес успешно подтвержден. Теперь вы можете войти в свой аккаунт.
            </p>

            <!-- User Info -->
            <div v-if="userInfo" class="alert alert-info mb-4">
              <Icon name="heroicons:user" size="20" class="me-2" />
              <strong>Добро пожаловать, {{ userInfo.first_name }}!</strong>
            </div>

            <!-- Actions -->
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <NuxtLink to="/login" class="btn btn-success">
                <Icon name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />
                Войти в аккаунт
              </NuxtLink>
              
              <NuxtLink to="/" class="btn btn-outline-primary">
                <Icon name="heroicons:home" size="16" class="me-2" />
                На главную
              </NuxtLink>
            </div>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="py-5">
            <div class="mb-4">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                   style="width: 80px; height: 80px;">
                <Icon name="heroicons:x-mark" size="40" />
              </div>
            </div>

            <h1 class="h2 mb-3 fw-bold text-danger" style="font-family: var(--font-inter);">
              Ошибка подтверждения
            </h1>
            
            <p class="lead text-muted mb-4">
              {{ error }}
            </p>

            <!-- Actions -->
            <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              <button 
                class="btn btn-primary"
                @click="resendConfirmation"
                :disabled="resendLoading"
              >
                <Icon name="heroicons:arrow-path" size="16" class="me-2" />
                {{ resendLoading ? 'Отправка...' : 'Отправить повторно' }}
              </button>
              
              <NuxtLink to="/login" class="btn btn-outline-secondary">
                <Icon name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />
                Войти в аккаунт
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'

// Composables
const route = useRoute()
const router = useRouter()
const { verifyEmail, resendConfirmationEmail } = useAuthApi()

// State
const loading = ref(true)
const success = ref(false)
const error = ref('')
const resendLoading = ref(false)
const userInfo = ref(null)

// Get query parameters
const token = route.query.token
const email = route.query.email

// Methods
const confirmEmail = async () => {
  if (!token) {
    error.value = 'Неверная ссылка подтверждения'
    loading.value = false
    return
  }

  try {
    const response = await verifyEmail(token)
    
    if (response) {
      success.value = true
      userInfo.value = response.user || null
      
      // Redirect to registration success page with confirmed status
      setTimeout(() => {
        router.push({
          path: '/registration-success',
          query: {
            email: email || response.user?.email,
            role: response.user?.role || 'client',
            confirmed: 'true'
          }
        })
      }, 2000)
    }
  } catch (err) {
    console.error('Email confirmation error:', err)
    error.value = err.message || 'Ошибка при подтверждении email. Ссылка может быть недействительной или устаревшей.'
  } finally {
    loading.value = false
  }
}

const resendConfirmation = async () => {
  if (!email) {
    error.value = 'Email адрес не найден'
    return
  }

  resendLoading.value = true
  try {
    await resendConfirmationEmail(email)
    error.value = 'Письмо с подтверждением отправлено повторно. Проверьте вашу почту.'
  } catch (err) {
    console.error('Resend confirmation error:', err)
    error.value = 'Ошибка при отправке письма. Попробуйте позже.'
  } finally {
    resendLoading.value = false
  }
}

// Lifecycle
onMounted(() => {
  confirmEmail()
})

// SEO
useHead({
  title: 'Подтверждение email - Banister',
  meta: [
    { name: 'description', content: 'Подтверждение email адреса в Banister' }
  ]
})
</script>

<style scoped>
.alert {
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
