<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useApi } from '~/utils/api'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import AppButton from '@/components/common/AppButton.vue'

const activeAccountType = ref('client')
const selectAccountType = (type) => { activeAccountType.value = type }

const route = useRoute()
const form = ref({
  email: route.query.email || '',
  password: route.query.password || '',
})
const loading = ref(false)
const error = ref('')
const router = useRouter()
const api = useApi()

async function login() {
  error.value = ''
  loading.value = true
  try {
    const res = await api.post('auth/login/', form.value)
    localStorage.setItem('access_token', res.access)
    const profile = await api.get('auth/profile/')
    // Проверка роли
    let expectedRole = ''
    if (activeAccountType.value === 'client') expectedRole = 'customer'
    else if (activeAccountType.value === 'service-provider') expectedRole = 'provider'
    else if (activeAccountType.value === 'management-support') expectedRole = 'management'
    if (profile.role !== expectedRole) {
      error.value = 'Пользователь не зарегистрирован под такой ролью'
      localStorage.removeItem('access_token')
      return
    }
    // Редирект по роли
    if (profile.role === 'customer') {
      router.push('/customer')
    } else if (profile.role === 'provider') {
      router.push('/provider')
    } else if (profile.role === 'management') {
      router.push('/management')
    } else {
      router.push('/')
    }
  } catch (e) {
    error.value = e.message
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
              Sign In
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Choose your account type</p>
          </div>
          <div class="d-flex flex-column gap-2 mb-4">
            <AppButton @click="selectAccountType('client')" :customClass="{ 'active-account-type': activeAccountType === 'client' }" variant="btn account-type-btn py-3 rounded-3">Client</AppButton>
            <AppButton @click="selectAccountType('service-provider')" :customClass="{ 'active-account-type': activeAccountType === 'service-provider' }" variant="btn account-type-btn py-3 rounded-3">Service Provider</AppButton>
            <AppButton @click="selectAccountType('management-support')" :customClass="{ 'active-account-type': activeAccountType === 'management-support' }" variant="btn account-type-btn py-3 rounded-3">Management & Support</AppButton>
          </div>
          <form @submit.prevent="login">
            <AppInputGroup
              id="emailAddress"
              label="Email"
              icon="heroicons:user"
              type="email"
              placeholder="Enter your email"
              v-model="form.email"
              :inputStyle="{ fontFamily: 'var(--font-inter)' }"
            />
            <AppInputGroup
              id="password"
              label="Password"
              icon="heroicons:lock-closed"
              type="password"
              placeholder="Enter your password"
              v-model="form.password"
              :inputStyle="{ fontFamily: 'var(--font-inter)' }"
            />
            <div class="text-end mb-4">
              <a href="#" class="text-decoration-none" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 500; font-size: 0.9rem;">
                Forgot password?
              </a>
            </div>
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="d-grid mb-4">
              <AppButton :disabled="loading" type="submit" variant="btn btn-primary-green py-3" customStyle="font-family: var(--font-inter); font-weight: 500;">
                <span v-if="loading">Signing in...</span>
                <span v-else>Sign In</span>
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
              Don't have an account? 
              <NuxtLink to="/join/sign" class="text-decoration-none" style="color: var(--color-primary-green); font-weight: 500;">
                Sign up here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

