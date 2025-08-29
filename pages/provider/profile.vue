<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import EmailVerificationBanner from '~/components/EmailVerificationBanner.vue'
import { Icon } from '@iconify/vue'
import { validateFile, createFilePreview, formatFileSize } from '~/utils/fileValidation'
import { log } from '~/utils/logger'

definePageMeta({ layout: 'provider-dashboard' })

const api = useApi()
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const uploadingPhoto = ref(false)
const error = ref('')
const success = ref('')
const showDeleteConfirm = ref(false)
const showPhotoUpload = ref(false)

const profile = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  bio: '',
  experience_years: '0',
  hourly_rate: '0'
})

const profilePhoto = ref(null)
const hasProfilePhoto = ref(false)
const photoUrl = ref('')

// File input for photo upload
const fileInput = ref(null)
const selectedFile = ref(null)
const previewImage = ref(null)

onMounted(async () => {
  await loadProfile()
  await checkProfilePhoto()
})

const loadProfile = async () => {
  loading.value = true
  try {
    const response = await api.get('auth/profile/')
    log.api.response('GET', 'auth/profile', response)

         if (response && response.data) {
       const data = response.data
       
       // Set profile data with defaults
       profile.value = {
         first_name: data?.profile?.first_name || '',
         last_name: data?.profile?.last_name || '',
         email: data?.email || '',
         phone: data?.phone || '',
         bio: data?.profile?.bio || '',
         experience_years: String(data?.provider_profile?.experience_years || 0),
         hourly_rate: String(data?.provider_profile?.hourly_rate || 0)
       }
       
       log.debug('Loaded profile data:', profile.value)

       // Check if user has profile photo
       hasProfilePhoto.value = data?.has_required_profile_photo || false
       // photoUrl will be set in checkProfilePhoto function
     } else {
       throw new Error(response?.error?.error_message || 'Failed to load profile')
     }
  } catch (e) {
    error.value = 'Ошибка загрузки профиля: ' + (e.message || 'Неизвестная ошибка')
    console.error('Profile loading error:', e)
  } finally {
    loading.value = false
  }
}

const checkProfilePhoto = async () => {
  try {
    const response = await api.get('files/profile-photo/')
    log.api.response('GET', 'files/profile-photo', response)
    
         if (response && response.success && response.data) {
       hasProfilePhoto.value = !!response.data.photo_url
       photoUrl.value = response.data.photo_url || ''
     } else {
       hasProfilePhoto.value = false
       photoUrl.value = ''
     }
  } catch (e) {
    console.error('Profile photo check error:', e)
    // If 404, no photo exists
    hasProfilePhoto.value = false
    photoUrl.value = ''
  }
}

const saveProfile = async () => {
  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const response = await api.put('auth/profile/', {
      email: profile.value.email,
      phone: profile.value.phone,
      profile: {
        first_name: profile.value.first_name,
        last_name: profile.value.last_name,
        bio: profile.value.bio,
      },
      provider_profile: {
        experience_years: parseInt(profile.value.experience_years) || 0,
        hourly_rate: parseFloat(profile.value.hourly_rate) || 0
      }
    })

         if (response && response.success) {
       success.value = 'Профиль успешно обновлен'
     } else {
       throw new Error(response?.error?.error_message || 'Failed to update profile')
     }
     } catch (e) {
     console.error('Profile saving error:', e)
     
     // Handle validation errors
     if (e.message && e.message.includes('Failed to update profile:')) {
       const errorMatch = e.message.match(/\{([^}]+)\}/)
       if (errorMatch) {
         try {
           const fieldErrors = JSON.parse(errorMatch[0])
           const errorMessages = Object.entries(fieldErrors)
             .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors[0] : errors}`)
             .join(', ')
           error.value = 'Ошибка валидации: ' + errorMessages
         } catch {
           error.value = 'Ошибка сохранения профиля: ' + e.message
         }
       } else {
         error.value = 'Ошибка сохранения профиля: ' + e.message
       }
     } else {
       error.value = 'Ошибка сохранения профиля: ' + (e.message || 'Неизвестная ошибка')
     }
   } finally {
     saving.value = false
   }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    validateAndPreviewFile(file)
  }
}

const validateAndPreviewFile = async (file) => {
  // Reset states
  error.value = ''

  // Validate file
  const validation = validateFile(file)
  if (!validation.isValid) {
    error.value = validation.error || 'Invalid file'
    return
  }

  try {
    // Create preview
    previewImage.value = await createFilePreview(file)
    selectedFile.value = file
  } catch (err) {
    error.value = 'Ошибка при создании предварительного просмотра'
    log.error('File preview error:', err)
  }
}

const uploadProfilePhoto = async () => {
  if (!selectedFile.value) return

  uploadingPhoto.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('photo', selectedFile.value)

    const response = await api.post('files/profile-photo/quick-change/', formData)

              if (response && response.success) {
       success.value = 'Фото профиля успешно загружено!'
       hasProfilePhoto.value = true
       photoUrl.value = response.data?.photo_url || ''
       previewImage.value = null
       selectedFile.value = null
       showPhotoUpload.value = false

       // Reload profile photo data
       await checkProfilePhoto()

       // Clear success message after 3 seconds
       setTimeout(() => {
         success.value = ''
       }, 3000)
     } else {
       throw new Error(response?.error?.error_message || 'Upload failed')
     }
  } catch (e) {
    console.error('Photo upload error:', e)
    error.value = 'Ошибка загрузки фото: ' + (e.message || 'Попробуйте еще раз')
  } finally {
    uploadingPhoto.value = false
  }
}

const deleteProfilePhoto = async () => {
  try {
    const response = await api.delete('files/profile-photo/delete/')
    
              if (response && response.success) {
       hasProfilePhoto.value = false
       photoUrl.value = ''
       success.value = 'Фото профиля удалено'

       // Reload profile photo data
       await checkProfilePhoto()

       setTimeout(() => {
         success.value = ''
       }, 3000)
     } else {
       throw new Error(response?.error?.error_message || 'Failed to delete photo')
     }
  } catch (e) {
    console.error('Photo deletion error:', e)
    error.value = 'Ошибка удаления фото профиля: ' + (e.message || 'Неизвестная ошибка')
  }
}

const deleteProfile = async () => {
  deleting.value = true
  error.value = ''

     try {
     const response = await api.delete('auth/profile/')
     log.api.response('DELETE', 'auth/profile', response)
     
     if (response && response.success) {
       success.value = 'Профиль успешно удален'
       showDeleteConfirm.value = false

       // Redirect to logout after a short delay
       setTimeout(() => {
         window.location.href = '/logout'
       }, 2000)
     } else {
       // Check if the error is about missing profile photo
       if (response?.error?.error_message?.includes('Profile photo is required')) {
         error.value = 'Для удаления профиля необходимо загрузить фото профиля. Пожалуйста, добавьте фото профиля и попробуйте снова.'
         showPhotoUpload.value = true
       } else {
         throw new Error(response?.error?.error_message || 'Failed to delete profile')
       }
     }
  } catch (e) {
    console.error('Profile deletion error:', e)
    error.value = 'Ошибка удаления профиля: ' + (e.message || 'Неизвестная ошибка')
  } finally {
    deleting.value = false
  }
}

const confirmDelete = () => {
  if (!hasProfilePhoto.value) {
    error.value = 'Для удаления профиля необходимо загрузить фото профиля. Пожалуйста, добавьте фото профиля и попробуйте снова.'
    showPhotoUpload.value = true
    return
  }
  showDeleteConfirm.value = true
}

const cancelDelete = () => {
  showDeleteConfirm.value = false
}

const cancelPhotoUpload = () => {
  showPhotoUpload.value = false
  previewImage.value = null
  selectedFile.value = null
  error.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}
</script>

<template>
  <div class="row g-4">
    <div class="col-12">
      <h2 class="mb-4" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
        Мой профиль
      </h2>
    </div>
    
    <!-- Email Verification Banner -->
    <div class="col-12">
      <EmailVerificationBanner :user="profile" />
    </div>
    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="col-12">
      <!-- Profile Photo Section -->
      <AppCard customClass="border-0 shadow-sm mb-4" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <h5 class="card-title mb-3" style="font-family: var(--font-inter); font-weight: 600;">
            <Icon name="heroicons:camera" size="20" class="me-2" />
            Фото профиля
          </h5>

          <div class="row align-items-center">
            <div class="col-md-3 text-center">
              <div v-if="photoUrl" class="profile-photo-container">
                <img :src="photoUrl" alt="Profile Photo" class="profile-photo" />
              </div>
              <div v-else class="profile-photo-placeholder">
                <Icon name="heroicons:user" size="48" class="text-muted" />
              </div>
            </div>

            <div class="col-md-9">
              <div v-if="hasProfilePhoto" class="d-flex gap-2">
                <AppButton
                  variant="btn btn-outline-primary"
                  @click="showPhotoUpload = true"
                >
                  <Icon name="heroicons:camera" size="16" class="me-2" />
                  Изменить фото
                </AppButton>
                <AppButton
                  variant="btn btn-outline-danger"
                  @click="deleteProfilePhoto"
                >
                  <Icon name="heroicons:trash" size="16" class="me-2" />
                  Удалить фото
                </AppButton>
              </div>
              <div v-else>
                <p class="text-muted mb-2">Фото профиля обязательно для провайдеров</p>
                <AppButton
                  variant="btn btn-primary"
                  @click="showPhotoUpload = true"
                >
                  <Icon name="heroicons:camera" size="16" class="me-2" />
                  Загрузить фото
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      <!-- Profile Information Section -->
      <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <h5 class="card-title mb-3" style="font-family: var(--font-inter); font-weight: 600;">
            <Icon name="heroicons:user" size="20" class="me-2" />
            Информация профиля
          </h5>

          <form @submit.prevent="saveProfile">
            <div class="row g-3">
              <div class="col-md-6">
                <AppInputGroup
                  label="Имя"
                  type="text"
                  v-model="profile.first_name"
                  required
                />
              </div>

              <div class="col-md-6">
                <AppInputGroup
                  label="Фамилия"
                  type="text"
                  v-model="profile.last_name"
                  required
                />
              </div>

                             <div class="col-md-6">
                 <AppInputGroup
                   label="Email"
                   type="email"
                   v-model="profile.email"
                   required
                   disabled
                   readonly
                 />
               </div>

              <div class="col-md-6">
                <AppInputGroup
                  label="Телефон"
                  type="tel"
                  v-model="profile.phone"
                  required
                />
              </div>

              <div class="col-12">
                <AppInputGroup
                  label="О себе"
                  type="textarea"
                  v-model="profile.bio"
                  placeholder="Расскажите о своем опыте и специализации"
                />
              </div>

              <div class="col-md-6">
                <AppInputGroup
                  label="Опыт работы (лет)"
                  type="number"
                  v-model="profile.experience_years"
                  min="0"
                />
              </div>

              <div class="col-md-6">
                <AppInputGroup
                  label="Почасовая ставка (£)"
                  type="number"
                  v-model="profile.hourly_rate"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div v-if="error" class="alert alert-danger mt-3">
              {{ error }}
            </div>

            <div v-if="success" class="alert alert-success mt-3">
              {{ success }}
            </div>

            <div class="d-flex justify-content-between align-items-center mt-4">
              <AppButton
                type="button"
                variant="btn btn-outline-danger"
                @click="confirmDelete"
                :disabled="saving"
              >
                <Icon name="heroicons:trash" size="16" class="me-2" />
                Удалить профиль
              </AppButton>

              <AppButton
                type="submit"
                variant="btn btn-primary-green"
                :disabled="saving"
              >
                <span v-if="saving">Сохранение...</span>
                <span v-else>Сохранить изменения</span>
              </AppButton>
            </div>
          </form>
        </div>
      </AppCard>
    </div>
  </div>

  <!-- Photo Upload Modal -->
  <div v-if="showPhotoUpload" class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.5);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title" style="font-family: var(--font-inter); font-weight: 600;">
            <Icon name="heroicons:camera" size="20" class="me-2" />
            Загрузка фото профиля
          </h5>
          <button type="button" class="btn-close" @click="cancelPhotoUpload"></button>
        </div>
        <div class="modal-body pt-0">
          <div class="upload-area" @click="triggerFileInput">
            <div v-if="!previewImage" class="upload-placeholder">
              <Icon name="heroicons:arrow-up-tray" size="48" class="text-muted mb-3" />
              <p class="upload-text">Нажмите для выбора файла</p>
              <p class="upload-hint text-muted">JPG, PNG, GIF до 5MB</p>
            </div>
            <div v-else class="preview-container">
              <img :src="previewImage" alt="Preview" class="preview-image" />
            </div>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="d-none"
          />
        </div>
        <div class="modal-footer border-0 pt-0">
          <AppButton
            variant="btn btn-outline-secondary"
            @click="cancelPhotoUpload"
            :disabled="uploadingPhoto"
          >
            Отмена
          </AppButton>
          <AppButton
            variant="btn btn-primary"
            @click="uploadProfilePhoto"
            :disabled="!selectedFile || uploadingPhoto"
          >
            <span v-if="uploadingPhoto">
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Загрузка...
            </span>
            <span v-else>Загрузить фото</span>
          </AppButton>
        </div>
      </div>
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <div v-if="showDeleteConfirm" class="modal fade show d-block" style="background-color: rgba(0, 0, 0, 0.5);" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="modal-header border-0 pb-0">
          <h5 class="modal-title" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            <Icon name="heroicons:exclamation-triangle" size="20" class="me-2 text-warning" />
            Удаление профиля
          </h5>
          <button type="button" class="btn-close" @click="cancelDelete"></button>
        </div>
        <div class="modal-body pt-0">
          <p style="font-family: var(--font-inter); color: var(--color-text-dark);">
            Вы уверены, что хотите удалить свой профиль? Это действие нельзя отменить.
          </p>
          <p class="text-muted small" style="font-family: var(--font-inter);">
            Все ваши данные, включая услуги, заказы и историю, будут безвозвратно удалены.
          </p>
        </div>
        <div class="modal-footer border-0 pt-0">
          <AppButton
            variant="btn btn-outline-secondary"
            @click="cancelDelete"
            :disabled="deleting"
          >
            Отмена
          </AppButton>
          <AppButton
            variant="btn btn-danger"
            @click="deleteProfile"
            :disabled="deleting"
          >
            <span v-if="deleting">
              <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              Удаление...
            </span>
            <span v-else>
              <Icon name="heroicons:trash" size="16" class="me-2" />
              Удалить профиль
            </span>
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-photo-container {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #e5e7eb;
}
.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.profile-photo-placeholder {
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border-radius: 50%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #e5e7eb;
}
.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f9fafb;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-area:hover {
  border-color: #3b82f6;
  background: #f0f9ff;
}
.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.upload-text {
  font-weight: 600;
  color: #374151;
  margin: 0;
}
.upload-hint {
  font-size: 0.875rem;
  margin: 0;
}
.preview-container {
  width: 100%;
  height: 100%;
}
.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}
</style> 