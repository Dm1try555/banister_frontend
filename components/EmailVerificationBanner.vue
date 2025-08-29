<template>
  <div v-if="showBanner" class="email-verification-banner">
    <div class="alert alert-warning border-0 shadow-sm mb-4" role="alert">
      <div class="d-flex align-items-center">
        <div class="flex-shrink-0 me-3">
          <Icon name="heroicons:exclamation-triangle" size="24" class="text-warning" />
        </div>
        <div class="flex-grow-1">
          <h6 class="alert-heading mb-1 fw-semibold" style="font-family: var(--font-inter);">
            Подтвердите ваш email
          </h6>
          <p class="mb-2 text-muted">
            Для полного доступа к функциям платформы необходимо подтвердить ваш email адрес.
            <strong>Нажмите "Отправить письмо" для получения ссылки подтверждения.</strong>
          </p>
          
          <!-- Success Message -->
          <div v-if="showSuccessMessage" class="alert alert-success alert-sm mb-2">
            <Icon name="heroicons:check-circle" size="16" class="me-2" />
            <strong>Письмо отправлено!</strong> Проверьте вашу почту и перейдите по ссылке для подтверждения.
          </div>
          <div class="d-flex flex-wrap gap-2">
            <button 
              class="btn btn-warning btn-sm"
              @click="resendVerification"
              :disabled="resendLoading"
            >
              <Icon name="heroicons:envelope" size="14" class="me-1" />
              {{ resendLoading ? 'Отправка...' : 'Отправить письмо' }}
            </button>
            <button 
              class="btn btn-outline-secondary btn-sm"
              @click="dismissBanner"
            >
              <Icon name="heroicons:x-mark" size="14" class="me-1" />
              Скрыть
            </button>
          </div>
        </div>
        <div class="flex-shrink-0">
          <button 
            type="button" 
            class="btn-close" 
            @click="dismissBanner"
            aria-label="Закрыть"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthApi } from '~/composables/useAuthApi'
import { useStorage } from '~/composables/useStorage'

// Props
const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  show: {
    type: Boolean,
    default: true
  }
})

// Composables
const { resendConfirmationEmail } = useAuthApi()
const { getItem, setItem } = useStorage()

// State
const resendLoading = ref(false)
const isDismissed = ref(false)
const showSuccessMessage = ref(false)

// Computed
const showBanner = computed(() => {
  if (!props.show || isDismissed.value) return false
  if (!props.user) return false
  
  // Show banner if email is not verified
  return !props.user.is_email_verified
})

// Methods
const resendVerification = async () => {
  if (!props.user?.email) return

  resendLoading.value = true
  try {
    await resendConfirmationEmail(props.user.email)
    
    // Show success message
    showSuccessMessage.value = true
    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
    
  } catch (error) {
    console.error('Error resending verification email:', error)
    
    // You can add an error toast here
    // toast.error('Ошибка при отправке письма. Попробуйте позже.')
  } finally {
    resendLoading.value = false
  }
}

const dismissBanner = () => {
  isDismissed.value = true
  
  // Store dismissal in localStorage for this session
  setItem('email_verification_dismissed', 'true')
}

// Lifecycle
onMounted(() => {
  // Check if banner was dismissed in this session
  const dismissed = getItem('email_verification_dismissed')
  if (dismissed === 'true') {
    isDismissed.value = true
  }
})
</script>

<style scoped>
.email-verification-banner {
  position: relative;
}

.alert {
  border-left: 4px solid #ffc107;
  background: linear-gradient(135deg, #fff3cd 0%, #fef7e0 100%);
}

.alert-sm {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
}

.alert-success {
  border-left-color: #198754;
  background: linear-gradient(135deg, #d1e7dd 0%, #e8f5e8 100%);
}

.alert-heading {
  color: #856404;
}

.btn-warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #000;
}

.btn-warning:hover {
  background-color: #e0a800;
  border-color: #d39e00;
  color: #000;
}

.btn-outline-secondary {
  border-color: #6c757d;
  color: #6c757d;
}

.btn-outline-secondary:hover {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #fff;
}

@media (max-width: 576px) {
  .d-flex.flex-wrap {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>