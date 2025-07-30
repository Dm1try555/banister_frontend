<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import AppInputGroup from '@/components/common/AppInputGroup.vue'
import { Icon } from '@iconify/vue' // Assuming Icon component is from @iconify/vue

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
  experience_years: '0', // These will be read from and sent to provider_profile
  hourly_rate: '0'       // These will be read from and sent to provider_profile
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
    const data = await api.get('auth/profile/')
    console.log('Profile API response:', data)

    // Set profile data with defaults
    profile.value = {
      first_name: data?.profile?.first_name || '',
      last_name: data?.profile?.last_name || '',
      email: data?.email || '',
      phone: data?.phone || '',
      bio: data?.profile?.bio || '',
      // Read experience_years and hourly_rate from data.provider_profile
      experience_years: String(data?.provider_profile?.experience_years || 0),
      hourly_rate: String(data?.provider_profile?.hourly_rate || 0)
    }

    // Check if user has profile photo
    hasProfilePhoto.value = data?.has_required_profile_photo || false
    photoUrl.value = data?.profile_photo_url || ''
  } catch (e) {
    error.value = 'Ошибка загрузки профиля'
    console.error('Profile loading error:', e)
  } finally {
    loading.value = false
  }
}

const checkProfilePhoto = async () => {
  try {
    const photoData = await api.get('files/profile-photo/')
    hasProfilePhoto.value = !!photoData?.photo_url
    photoUrl.value = photoData?.photo_url || ''
  } catch (e) {
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
    await api.put('auth/profile/', {
      profile: {
        first_name: profile.value.first_name,
        last_name: profile.value.last_name,
        bio: profile.value.bio,
      },
      phone: profile.value.phone,
      // Send provider-specific fields under a new key 'provider_profile'
      provider_profile: {
        experience_years: parseInt(profile.value.experience_years) || 0,
        hourly_rate: parseFloat(profile.value.hourly_rate) || 0
      }
    })
    success.value = 'Профиль успешно обновлен'
  } catch (e) {
    error.value = 'Ошибка сохранения профиля'
    console.error('Profile saving error:', e)
    // Attempt to parse and display the specific error message from the backend
    if (e.message) {
      error.value = e.message;
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

const validateAndPreviewFile = (file) => {
  // Reset states
  error.value = ''

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    error.value = 'Пожалуйста, выберите файл изображения (JPG, PNG, GIF)'
    return
  }

  // Validate file size (5MB)
  const maxSize = 5 * 1024 * 1024 // 5MB in bytes
  if (file.size > maxSize) {
    error.value = 'Размер файла не должен превышать 5MB'
    return
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
    selectedFile.value = file
  }
  reader.readAsDataURL(file)
}

const uploadProfilePhoto = async () => {
  if (!selectedFile.value) return

  uploadingPhoto.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('photo', selectedFile.value)

    const response = await api.post('files/profile-photo/upload/', formData)

    if (response.success) {
      success.value = 'Фото профиля успешно загружено!'
      hasProfilePhoto.value = true
      photoUrl.value = response.data?.photo_url || ''
      previewImage.value = null
      selectedFile.value = null
      showPhotoUpload.value = false

      // Clear success message after 3 seconds
      setTimeout(() => {
        success.value = ''
      }, 3000)
    }
  } catch (e) {
    console.error('Photo upload error:', e)
    error.value = e.data?.error?.error_message || 'Ошибка загрузки фото. Попробуйте еще раз.'
    if (e.message) {
      error.value = e.message;
    }
  } finally {
    uploadingPhoto.value = false
  }
}

const deleteProfilePhoto = async () => {
  try {
    await api.delete('files/profile-photo/delete/')
    hasProfilePhoto.value = false
    photoUrl.value = ''
    success.value = 'Фото профиля удалено'

    setTimeout(() => {
      success.value = ''
    }, 3000)
  } catch (e) {
    console.error('Photo deletion error:', e)
    error.value = 'Ошибка удаления фото профиля'
    if (e.message) {
      error.value = e.message;
    }
  }
}

const deleteProfile = async () => {
  deleting.value = true
  error.value = ''

  try {
    // First try to delete the profile directly
    await api.delete('auth/profile/')
    success.value = 'Профиль успешно удален'
    showDeleteConfirm.value = false

    // Redirect to logout after a short delay
    setTimeout(() => {
      window.location.href = '/logout'
    }, 2000)
  } catch (e) {
    console.error('Profile deletion error:', e)

    // Check if the error is about missing profile photo
    if (e.data?.error?.error_message?.includes('Profile photo is required')) {
      error.value = 'Для удаления профиля необходимо загрузить фото профиля. Пожалуйста, добавьте фото профиля и попробуйте снова.'
      showPhotoUpload.value = true
    } else {
      error.value = 'Ошибка удаления профиля: ' + (e.data?.error?.error_message || 'Неизвестная ошибка')
    }
    if (e.message) {
      error.value = e.message;
    }
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
