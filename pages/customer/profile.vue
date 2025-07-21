<script setup>
import { ref, onMounted } from 'vue'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
definePageMeta({ layout: 'customer-dashboard' })
const token = ref('')
const api = useApi()
const profile = ref({})
const loading = ref(true)
const error = ref('')

async function updateProfile(newData) {
  loading.value = true
  try {
    profile.value = await api.put('auth/profile/', newData)
  } catch (e) {
    error.value = 'Ошибка обновления профиля'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  token.value = localStorage.getItem('access_token') || ''
  try {
    profile.value = await api.get('auth/profile/')
  } catch (e) {
    error.value = 'Ошибка загрузки профиля'
  } finally {
    loading.value = false
  }
})
</script>
  

<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- Personal Information Card -->
    <AppCard customClass="mb-4" :customStyle="'background-color: white; border-radius: 16px;'">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Personal Information
          </h2>
          <AppButton variant="btn btn-primary-green btn-sm px-4 py-2" customStyle="font-family: var(--font-inter); font-weight: 500;">
            Edit
          </AppButton>
        </div>
        <!-- Временно всегда показываем инпуты -->
        <div class="row g-3">
          <div class="col-md-6">
            <AppInputGroup label="First Name" :inputStyle="'font-family: var(--font-inter);'" :readonly="true" :modelValue="profile.profile?.first_name || ''" />
          </div>
          <div class="col-md-6">
            <AppInputGroup label="Last Name" :inputStyle="'font-family: var(--font-inter);'" :readonly="true" :modelValue="profile.profile?.last_name || ''" />
          </div>
          <div class="col-md-6">
            <AppInputGroup label="Email" :inputStyle="'font-family: var(--font-inter);'" :readonly="true" :modelValue="profile.email || ''" />
          </div>
          <div class="col-md-6">
            <AppInputGroup label="Mobile Number" :inputStyle="'font-family: var(--font-inter);'" :readonly="true" :modelValue="profile.phone || ''" />
          </div>
          <div class="col-12">
            <AppInputGroup label="Bio" :inputStyle="'font-family: var(--font-inter);'" :readonly="true" :modelValue="profile.profile?.bio || ''" />
          </div>
        </div>
      </div>
    </AppCard>
    <!-- Payment Methods Card -->
    <AppCard :customStyle="'background-color: white; border-radius: 16px;'">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Payment Methods
          </h2>
          <AppButton variant="btn btn-primary-green btn-sm px-3 py-2 d-flex align-items-center" customStyle="font-family: var(--font-inter); font-weight: 500;">
            <Icon name="heroicons:plus" size="16" class="me-1" />
            Add Card
          </AppButton>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Automatic Payments</h6>
            <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">Automatically charge your default payment method for services</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="automaticPaymentsSwitch" checked style="width: 40px; height: 20px;">
            <label class="form-check-label" for="automaticPaymentsSwitch" style="display: none;"></label>
          </div>
        </div>
      </div>
    </AppCard>
    <div v-if="token" class="mt-4">
      <label class="form-label">Authorization Bearer Token:</label>
      <div class="input-group">
        <input type="text" class="form-control" :value="token" readonly>
        <button class="btn btn-outline-secondary" type="button" @click="navigator.clipboard.writeText(token)">Copy</button>
      </div>
    </div>
  </div>
</template>


 
  