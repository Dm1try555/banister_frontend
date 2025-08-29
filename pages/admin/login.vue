<template>
  <div class="min-vh-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 500px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                 style="width: 60px; height: 60px;">
              <Icon name="heroicons:shield-check" size="30" />
            </div>
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Admin Login
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Вход в административную панель</p>
          </div>

          <form @submit.prevent="onSubmit">
            <AppInputGroup 
              label="Email" 
              type="email" 
              placeholder="admin@example.com" 
              v-model="form.email" 
              icon="bi:envelope" 
              required 
            />
            <AppInputGroup 
              label="Password" 
              type="password" 
              placeholder="Введите пароль" 
              v-model="form.password" 
              icon="bi:lock" 
              required 
            />
            
            <div v-if="errorMessages.length" class="alert alert-danger">
              <ul class="mb-0 ps-3">
                <li v-for="(msg, idx) in errorMessages" :key="idx">{{ msg }}</li>
              </ul>
            </div>
            <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

            <AppButton 
              variant="btn btn-primary-green w-100 py-3" 
              customStyle="font-family: var(--font-inter); font-weight: 600;"
              :disabled="loading"
            >
              <Icon v-if="loading" name="heroicons:arrow-path" size="16" class="me-2" />
              <Icon v-else name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />
              {{ loading ? 'Вход...' : 'Войти' }}
            </AppButton>
          </form>

          <div class="text-center mt-4">
            <p class="text-muted small mb-0">
              Обычный пользователь? 
              <NuxtLink to="/join/signin" class="text-decoration-none" style="color: var(--color-primary-green);">
                Войти как пользователь
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthApi } from '~/composables/useAuthApi'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import AppButton from '@/components/common/AppButton.vue'

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

const router = useRouter()
const { login, loading, error } = useAuthApi()

const form = ref({
  email: '',
  password: ''
})

const errorMessages = ref([])

const onSubmit = async () => {
  errorMessages.value = []
  
  // Validation
  if (!form.value.email) {
    errorMessages.value.push('Email обязателен')
  }
  if (!form.value.password) {
    errorMessages.value.push('Пароль обязателен')
  }
  if (errorMessages.value.length > 0) {
    return
  }
  
  try {
    const response = await login({
      email: form.value.email,
      password: form.value.password
    })
    
    if (response) {
      // Check if user has admin role
      const userRole = response.user?.role
      if (['admin', 'super_admin', 'hr', 'supervisor'].includes(userRole)) {
        // Redirect to admin dashboard
        router.push('/admin/dashboard')
      } else {
        // Redirect to regular user dashboard
        router.push('/')
      }
    }
  } catch (e) {
    console.error('Login failed:', e)
    // Error is handled by useAuthApi
  }
}

// SEO
useHead({
  title: 'Admin Login - Banister',
  meta: [
    { name: 'description', content: 'Вход в административную панель Banister' }
  ]
})
</script>
