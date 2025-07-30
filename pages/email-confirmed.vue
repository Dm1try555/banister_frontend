<template>
  <div class="min-vh-100 d-flex flex-column bg-gradient-success">
    <main class="hero text-center py-5 flex-grow-1 d-flex flex-column justify-content-center">
      <div class="container-fluid px-4">
        <div class="row justify-content-center">
          <div class="col-12 col-md-10 col-lg-8">
            <div class="success-icon mb-4">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white shadow-lg"
                   style="width: 120px; height: 120px;">
                <Icon :name="role === 'provider' ? 'heroicons:check-badge' : 'heroicons:check'" size="64" />
              </div>
            </div>
            <h1 class="hero-title mb-3" style="color: var(--color-text-dark); font-size: 2.5rem;">
              {{ role === 'provider' ? 'Email confirmed! Welcome, Partner!' : 'Email confirmed! Welcome!' }}
            </h1>
            <p class="hero-subtitle mb-4" style="color: var(--color-text-muted); font-size: 1.25rem;">
              {{ role === 'provider'
                ? 'Now you can complete your profile, add services, and start receiving orders.'
                : 'Now you can order services and enjoy all the features of our platform.' }}
            </p>
            <AppButton
              variant="btn-nav-primary"
              :customStyle="{ width: '260px', fontWeight: 700, fontSize: '1.1rem' }"
              @click="goToDashboard"
            >
              <Icon name="heroicons:arrow-right" class="ms-2" style="width: 24px; height: 24px;" />
              {{ role === 'provider' ? 'Complete Profile' : 'Go to Dashboard' }}
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
import { useRouter } from 'vue-router'
import { useApi } from '~/utils/api'

const $router = useRouter()
const api = useApi()
const role = ref(localStorage.getItem('user_role') || 'customer')

// After email confirmation, update role from profile
onMounted(async () => {
  try {
    const userData = await api.get('auth/profile/')
    if (userData.role) {
      role.value = userData.role
      localStorage.setItem('user_role', userData.role)
    }
  } catch {}
})

const goToDashboard = () => {
  const dashboardPath = role.value === 'provider' ? '/management' : '/customer'
  $router.push(dashboardPath)
}
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