<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '~/utils/api'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import AppButton from '@/components/common/AppButton.vue'

const activeTab = ref('client')
const selectTab = (tab) => { activeTab.value = tab }

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
})
const loading = ref(false)
const error = ref('')
const errorMessages = ref([])

const router = useRouter()
const { post } = useApi()

const onSubmit = async (e) => {
  e.preventDefault()
  error.value = ''
  errorMessages.value = []
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match'
    return
  }
  loading.value = true
  try {
    let endpoint = ''
    if (activeTab.value === 'client') endpoint = 'auth/register/customer/'
    else if (activeTab.value === 'provider') endpoint = 'auth/register/provider/'
    else throw new Error('Unknown role')
    await post(endpoint, {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password,
      confirm_password: form.value.confirmPassword,
    })
    // After successful registration, redirect to registration success page
    router.push({
      path: '/registration-success',
      query: {
        email: form.value.email,
        role: activeTab.value
      }
    })
    return
  } catch (e) {
    errorMessages.value = [e.message || e]
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 500px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Quick Sign Up
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Create your account</p>
          </div>
          <div class="d-flex toggle-tabs rounded-3 p-1 mb-4">
            <AppButton
              variant="btn flex-fill rounded-2 py-2 me-1"
              :customClass="{ 'active-tab': activeTab === 'client' }"
              @click="selectTab('client')"
            >Client</AppButton>
            <AppButton
              variant="btn flex-fill rounded-2 py-2 ms-1"
              :customClass="{ 'active-tab': activeTab === 'provider' }"
              @click="selectTab('provider')"
            >Provider</AppButton>
          </div>
          <form @submit="onSubmit">
            <div class="row mb-3">
              <div class="col-md-6">
                <AppInputGroup label="First Name" type="text" placeholder="John" v-model="form.first_name" required />
              </div>
              <div class="col-md-6">
                <AppInputGroup label="Last Name" type="text" placeholder="Doe" v-model="form.last_name" required />
              </div>
            </div>
            <AppInputGroup label="Email" type="email" placeholder="Enter your email" v-model="form.email" icon="bi:envelope" required />
            <AppInputGroup label="Phone Number" type="tel" placeholder="Enter your phone" v-model="form.phone" icon="bi:phone" required />
            <AppInputGroup label="Password" type="password" placeholder="Create a password" v-model="form.password" icon="bi:lock" required />
            <AppInputGroup label="Confirm Password" type="password" placeholder="Confirm your password" v-model="form.confirmPassword" icon="bi:lock" required />
            <div v-if="errorMessages.length" class="alert alert-danger">
              <ul class="mb-0 ps-3">
                <li v-for="(msg, idx) in errorMessages" :key="idx">{{ msg }}</li>
              </ul>
            </div>
            <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="d-grid mb-4">
              <AppButton :disabled="loading" variant="btn btn-primary-green py-3" customStyle="font-family: var(--font-inter); font-weight: 500;" type="submit">
                <span v-if="loading">Registering...</span>
                <span v-else>Create Account</span>
              </AppButton>
            </div>
          </form>
          <div class="text-center mt-2">
            <NuxtLink to="/join" class="text-decoration-none d-inline-flex align-items-center" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:arrow-left" class="me-2" />
              Back to signup options
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.toggle-tabs {
  background-color: #f0f0f0;
  border-radius: 12px;
}
.toggle-tabs .btn {
  font-family: var(--font-inter);
  font-weight: 500;
  border: none;
  transition: background-color 0.3s, color 0.3s;
  color: var(--color-text-muted);
  background-color: transparent;
}
.toggle-tabs .btn.active-tab {
  background-color: white;
  color: var(--color-primary-green);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
</style>
