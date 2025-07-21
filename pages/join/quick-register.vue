<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/utils/api'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import AppButton from '@/components/common/AppButton.vue'

const activeMethod = ref('phone')
const selectMethod = (method) => { activeMethod.value = method }

const form = ref({
  phone: '',
  email: '',
})
const loading = ref(false)
const error = ref('')
const router = useRouter()
const { request } = useApi()

const onSubmit = async (e) => {
  e.preventDefault()
  error.value = ''
  loading.value = true
  try {
    let endpoint = 'auth/register/quick/request'
    let payload = {}
    if (activeMethod.value === 'phone') {
      payload = { phone: form.value.phone }
    } else {
      payload = { email: form.value.email }
    }
    // Первый шаг: отправка запроса на регистрацию
    await request(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    // Здесь можно реализовать шаг верификации (например, через код)
    // Для простоты сразу редиректим на главную
    router.push('/')
  } catch (e) {
    error.value = e.message || 'Quick registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 450px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Quick Register
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Sign up in seconds</p>
          </div>
          <div class="d-flex toggle-tabs rounded-3 p-1 mb-4">
            <AppButton
              variant="btn flex-fill rounded-2 py-2 me-1"
              :customClass="{ 'active-tab': activeMethod === 'phone' }"
              @click="selectMethod('phone')"
            >Phone Number</AppButton>
            <AppButton
              variant="btn flex-fill rounded-2 py-2 ms-1"
              :customClass="{ 'active-tab': activeMethod === 'email' }"
              @click="selectMethod('email')"
            >Email</AppButton>
          </div>
          <form @submit="onSubmit">
            <div class="mb-4">
              <AppInputGroup
                v-if="activeMethod === 'phone'"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
                v-model="form.phone"
                icon="bi:phone"
              />
              <AppInputGroup
                v-else
                label="Email Address"
                type="email"
                placeholder="Enter your email address"
                v-model="form.email"
                icon="bi:envelope"
              />
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="d-grid mb-4">
              <AppButton :disabled="loading" variant="btn btn-primary-green py-3" customStyle="font-family: var(--font-inter); font-weight: 500;" type="submit">
                <span v-if="loading">Registering...</span>
                <span v-else>Continue</span>
              </AppButton>
            </div>
          </form>
          <div class="d-flex align-items-center my-4">
            <hr class="flex-grow-1" style="border-top: 1px solid var(--color-border);" />
            <span class="mx-3 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">OR</span>
            <hr class="flex-grow-1" style="border-top: 1px solid var(--color-border);" />
          </div>
          <div class="d-grid gap-3 mb-4">
            <AppButton variant="btn btn-outline-secondary py-3 d-flex align-items-center justify-content-center" customStyle="font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:google" size="20" class="me-2" style="color: var(--color-primary-green);" />
              Continue with Google
            </AppButton>
            <AppButton variant="btn btn-outline-secondary py-3 d-flex align-items-center justify-content-center" customStyle="font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:apple" size="20" class="me-2" style="color: var(--color-primary-green);" />
              Continue with Apple
            </AppButton>
          </div>
          <div class="text-center">
            <p style="color: var(--color-text-muted); font-family: var(--font-inter);">
              Already have an account? 
              <NuxtLink to="/join/sign" class="text-decoration-none" style="color: var(--color-primary-green); font-weight: 500;">
                Sign in here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

