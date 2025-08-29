<template>
  <div class="container-fluid py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8">
        <div class="text-center">
          <!-- Access Denied Icon -->
          <div class="mb-4">
            <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white"
                 style="width: 80px; height: 80px;">
              <Icon name="heroicons:shield-exclamation" size="40" />
            </div>
          </div>

          <!-- Access Denied Message -->
          <h1 class="h2 mb-3 fw-bold text-danger" style="font-family: var(--font-inter);">
            Доступ запрещен
          </h1>
          
          <p class="lead text-muted mb-4">
            У вас нет прав для доступа к этой странице. Обратитесь к администратору для получения необходимых разрешений.
          </p>

          <!-- User Info -->
          <div class="alert alert-info mb-4">
            <Icon name="heroicons:information-circle" size="20" class="me-2" />
            <strong>Ваша роль:</strong> {{ getUserRoleName() }}
          </div>

          <!-- Actions -->
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
            <NuxtLink to="/admin/dashboard" class="btn btn-primary">
              <Icon name="heroicons:home" size="16" class="me-2" />
              На главную
            </NuxtLink>
            
            <button class="btn btn-outline-secondary" @click="goBack">
              <Icon name="heroicons:arrow-left" size="16" class="me-2" />
              Назад
            </button>
          </div>

          <!-- Help -->
          <div class="mt-4">
            <p class="text-muted small mb-0">
              Нужна помощь? 
              <a href="#" @click="contactSupport" class="text-decoration-none">Свяжитесь с поддержкой</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStorage } from '~/composables/useStorage'

definePageMeta({
  layout: 'admin-dashboard',
  middleware: 'admin'
})

const { getItem } = useStorage()

// Methods
const getUserRoleName = () => {
  const userRole = getItem('user_role')
  const roleNames = {
    'admin': 'Администратор',
    'super_admin': 'Супер администратор',
    'hr': 'HR',
    'supervisor': 'Супервайзер'
  }
  return roleNames[userRole] || userRole || 'Неизвестно'
}

const goBack = () => {
  if (window.history.length > 1) {
    window.history.back()
  } else {
    navigateTo('/admin/dashboard')
  }
}

const contactSupport = () => {
  // Implement contact support functionality
  
}

// SEO
useHead({
  title: 'Доступ запрещен - Banister Admin',
  meta: [
    { name: 'description', content: 'У вас нет прав для доступа к этой странице' }
  ]
})
</script>

<style scoped>
.alert {
  border-left: 4px solid var(--color-primary-green);
}

.btn {
  min-width: 160px;
}

@media (max-width: 576px) {
  .d-flex.flex-sm-row {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>
