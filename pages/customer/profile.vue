<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppCard from '@/components/common/AppCard.vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
definePageMeta({ layout: 'customer-dashboard' })
const router = useRouter()
const token = ref('')
const api = useApi()
const profile = ref({})
const loading = ref(true)
const error = ref('')
const showDeleteConfirmation = ref(false)
const deletingProfile = ref(false)

async function updateProfile(newData) {
  loading.value = true
  try {
    profile.value = await api.put('auth/profile/', newData)
  } catch (e) {
    error.value = 'Profile update error'
  } finally {
    loading.value = false
  }
}

async function deleteProfile() {
  if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
    return
  }
  deletingProfile.value = true
  try {
    await api.delete('auth/profile/')
    // Clear localStorage and redirect to home page
    localStorage.clear()
    router.push('/')
    alert('Profile deleted successfully')
  } catch (e) {
    console.error('Error deleting profile:', e)
    error.value = 'Profile deletion error: ' + (e.message || 'Unknown error')
    alert('Error deleting profile: ' + (e.message || 'Unknown error'))
  } finally {
    deletingProfile.value = false
    showDeleteConfirmation.value = false
  }
}

onMounted(async () => {
  token.value = localStorage.getItem('access_token') || ''
  
  if (!token.value) {
    // Если нет токена, перенаправляем на логин
    router.push('/join/signin')
    return
  }
  
  try {
    profile.value = await api.get('auth/profile/')
  } catch (e) {
    error.value = 'Profile loading error'
    // Если ошибка авторизации, перенаправляем на логин
    if (e.response?.status === 401) {
      router.push('/join/signin')
    }
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
    
    <!-- Danger Zone Card -->
    <AppCard :customStyle="'background-color: white; border-radius: 16px; border: 1px solid #dc3545;'">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: #dc3545;">
            Danger Zone
          </h2>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Delete Account</h6>
                <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
              </div>
              <AppButton 
                variant="btn btn-danger btn-sm px-4 py-2" 
                customStyle="font-family: var(--font-inter); font-weight: 500;"
                :disabled="deletingProfile"
                @click="deleteProfile"
              >
                <span v-if="deletingProfile">
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Удаляем...
                </span>
                <span v-else>
                  <Icon name="heroicons:trash" size="16" class="me-1" />
                  Delete Account
                </span>
              </AppButton>
            </div>
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


 
  