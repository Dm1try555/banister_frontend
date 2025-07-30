<template>
  <div v-if="showBanner" class="email-verification-banner alert alert-warning alert-dismissible fade show" role="alert">
    <div class="d-flex align-items-center">
      <Icon name="heroicons:exclamation-triangle" class="me-2" style="width: 20px; height: 20px;" />
      <div class="flex-grow-1">
        <strong>Attention!</strong> Your email is not verified.
        <a href="#" @click.prevent="resendEmail" class="alert-link" :class="{ 'disabled': resending }">
          {{ resending ? 'Sending...' : 'Resend verification email' }}
        </a> or
        <a href="#" @click.prevent="goToSettings" class="alert-link">change email</a>.
      </div>
      <button 
        type="button" 
        class="btn-close" 
        @click="dismissBanner"
        aria-label="Close"
        :disabled="resending"
      ></button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useApi } from '~/utils/api'

const props = defineProps({
  email: {
    type: String,
    default: ''
  },
  showBanner: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['dismiss', 'resendEmail', 'goToSettings'])

const api = useApi()
const resending = ref(false)

const dismissBanner = () => {
  emit('dismiss')
}

const resendEmail = async () => {
  if (resending.value || !props.email) {
    return
  }
  resending.value = true
  try {
    // Save email in localStorage for resending
    localStorage.setItem('user_email', props.email)
    // Instead of direct sending, emit event for layout handling
    emit('resendEmail')
  } catch (error) {
    alert('Error sending email: ' + (error.message || 'Check your internet connection'))
  } finally {
    resending.value = false
  }
}

const goToSettings = () => {
  emit('goToSettings')
}
</script>

<style scoped>
.email-verification-banner {
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
  border-left: 4px solid #ffc107;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.email-verification-banner .alert-link {
  color: #856404;
  text-decoration: underline;
  font-weight: 600;
}

.email-verification-banner .alert-link:hover {
  color: #533f03;
}

.email-verification-banner .alert-link.disabled {
  color: #ccc;
  cursor: not-allowed;
  text-decoration: none;
}

.email-verification-banner .alert-link.disabled:hover {
  color: #ccc;
}

.btn-close {
  opacity: 0.7;
}

.btn-close:hover {
  opacity: 1;
}

.btn-close:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style> 