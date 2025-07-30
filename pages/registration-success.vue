<template>
  <div class="min-vh-100 d-flex flex-column bg-gradient-success">
    <main class="hero text-center py-5 flex-grow-1 d-flex flex-column justify-content-center">
      <div class="container-fluid px-4">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <div class="success-icon mb-4">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white shadow-lg"
                   style="width: 120px; height: 120px;">
                <Icon :name="role === 'provider' ? 'heroicons:star' : 'heroicons:user'" size="64" />
              </div>
            </div>
            <h1 class="hero-title mb-3" style="color: var(--color-text-dark); font-size: 2.5rem;">
              {{ role === 'provider' ? 'Congratulations, Partner!' : 'Welcome, Client!' }}
            </h1>
            <p class="hero-subtitle mb-4" style="color: var(--color-text-muted); font-size: 1.25rem;">
              {{ role === 'provider'
                ? 'Your application has been accepted! Complete your profile and start receiving orders.'
                : 'Your account has been created! Now you can order services and enjoy all the features of our platform.' }}
            </p>
            <AppButton
              variant="btn-nav-primary"
              :customStyle="{ width: '260px', fontWeight: 700, fontSize: '1.1rem' }"
              @click="goToLogin"
            >
              <Icon name="heroicons:arrow-right" class="ms-2" style="width: 24px; height: 24px;" />
              Перейти до страницы авторизации
            </AppButton>

          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AppButton from '@/components/common/AppButton.vue'
import { useRouter, useRoute } from 'vue-router'
import { useApi } from '~/utils/api'

const $router = useRouter()
const route = useRoute()
const api = useApi()

const role = ref(route.query.role || localStorage.getItem('user_role') || 'customer')
const userEmail = ref(route.query.email || '') // Получаем email из query параметров

const goToDashboard = () => {
  const dashboardPath = role.value === 'provider' ? '/management' : '/customer'
  $router.push(dashboardPath)
}

const goToLogin = () => {
  $router.push('/join/signin')
}

onMounted(() => {
  console.log('Registration success page loaded')
  console.log('Role:', role.value)
  console.log('Email:', userEmail.value)
})
</script>

<style scoped>
.bg-gradient-success {
  background: linear-gradient(135deg, #f8fafc 0%, #e0ffe6 100%);
}
.success-icon {
  animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
.hero-title, .hero-subtitle {
  animation: fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px);}
  to { opacity: 1; transform: translateY(0);}
}
</style> 