<template>
  <div class="min-vh-100 d-flex flex-column">
    <main class="hero text-center py-5 flex-grow-1 d-flex flex-column justify-content-center bg-beige">
      <div class="container-fluid px-4">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <!-- Loading State -->
            <div v-if="loading" class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3" style="color: var(--color-text-muted);">Подтверждаем ваш email...</p>
            </div>
            
            <!-- Error State -->
            <div v-if="!loading && errorMessage" class="text-center">
              <div class="error-icon mb-4">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white" 
                     style="width: 80px; height: 80px;">
                  <Icon name="heroicons:x-mark" size="40" />
                </div>
              </div>
              
              <h1 class="hero-title mb-4" style="color: var(--color-text-dark);">
                Ошибка подтверждения
              </h1>
              
              <p class="hero-subtitle mb-5" style="color: var(--color-text-muted); font-size: 1.1rem;">
                {{ errorMessage }}
              </p>
              
              <div class="hero-buttons mb-5 d-flex flex-column flex-sm-row justify-content-center gap-4">
                <AppButton
                  variant="btn-nav-primary create-profile-btn btn-large-text d-flex align-items-center justify-content-center text-decoration-none"
                  :customStyle="{ width: '250px', fontWeight: 700 }"
                  @click="resendEmail"
                >
                  <Icon name="heroicons:envelope" size="20" class="me-2" />
                  Отправить новое письмо
                </AppButton>
                <AppButton
                  variant="btn-outline-secondary learn-more btn-large-text text-decoration-none d-flex align-items-center justify-content-center"
                  :customStyle="{ width: '150px' }"
                  @click="$router.push('/join/signin')"
                >
                  Войти в аккаунт
                </AppButton>
                <AppButton
                  variant="btn-outline-secondary learn-more btn-large-text text-decoration-none d-flex align-items-center justify-content-center"
                  :customStyle="{ width: '150px' }"
                  @click="$router.push('/')"
                >
                  На главную
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import { useApi } from '~/utils/api'

const route = useRoute()
const router = useRouter()
const api = useApi()

const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  const token = route.query.token
  
  if (!token) {
    errorMessage.value = 'Отсутствует токен подтверждения'
    loading.value = false
    return
  }
  
  try {
    console.log('Confirming email with token:', token)
    
    // GET запрос для подтверждения email
    const response = await api.get(`auth/email-confirm/verify/?token=${token}`)
    
    console.log('Email confirmation response:', response)
    
    if (response.success) {
      // Обновляем данные пользователя в localStorage
      try {
        const userData = await api.get('auth/profile/');
        if (userData.email_verified) {
          // Обновляем флаг в localStorage
          localStorage.setItem('email_verified', 'true');
          // Очищаем флаг скрытия баннера
          localStorage.removeItem('emailBannerDismissed');
          // Принудительно обновляем данные пользователя
          localStorage.setItem('user_email', userData.email);
          
          // Принудительно скрываем баннер, если пользователь находится на странице с баннером
          if (window.location.pathname.startsWith('/customer')) {
            // Обновляем localStorage для немедленного скрытия баннера
            localStorage.setItem('emailBannerDismissed', 'true');
            // Отправляем событие для обновления баннера без перезагрузки страницы
            window.dispatchEvent(new StorageEvent('storage', {
              key: 'email_verified',
              newValue: 'true'
            }));
          }
        }
      } catch (profileError) {
        console.warn('Failed to update user profile after email confirmation:', profileError);
      }
      
      // Сразу перенаправляем на страницу благодарности
      router.push('/email-confirmed')
    } else {
      errorMessage.value = response.message || 'Failed to verify email'
      loading.value = false
    }
    
  } catch (error) {
    console.error('Email confirmation error:', error)
    errorMessage.value = error.message
    loading.value = false
  }
})

const resendEmail = async () => {
  try {
    // Для повторной отправки нужен email пользователя
    let userEmail = localStorage.getItem('user_email');
    
    if (!userEmail) {
      userEmail = prompt('Введите ваш email для повторной отправки письма:');
      if (!userEmail) {
        alert('Email не введен');
        return;
      }
    }
    
    console.log('Resending email to:', userEmail)
    
    const response = await api.post('auth/email-confirm/request/', {
      email: userEmail
    })
    
    if (response.success) {
      alert('Письмо для подтверждения отправлено повторно на ' + userEmail);
      // Сохраняем email в localStorage
      localStorage.setItem('user_email', userEmail);
    } else {
      alert('Ошибка при отправке письма: ' + (response.message || 'Неизвестная ошибка'));
    }
  } catch (error) {
    console.error('Failed to resend email:', error)
    alert('Error sending email: ' + error.message)
  }
}
</script>

<style scoped>
.error-icon {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.hero-subtitle {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.hero-buttons {
  animation: fadeInUp 0.6s ease-out 0.6s both;
}
</style> 