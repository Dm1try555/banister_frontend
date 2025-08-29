<template>
  <header class="app-header">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div class="container-fluid">
        <!-- Logo -->
        <NuxtLink to="/" class="navbar-brand d-flex align-items-center">
          <img src="/logo.svg" alt="Banister" height="32" class="me-2" />
          <span class="fw-bold" style="font-family: var(--font-inter); color: var(--color-primary-green);">
            Banister
          </span>
        </NuxtLink>

        <!-- Mobile Toggle -->
        <button 
          class="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Navigation -->
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <NuxtLink to="/" class="nav-link" active-class="active">
                Главная
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/services" class="nav-link" active-class="active">
                Услуги
              </NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink to="/bookings" class="nav-link" active-class="active">
                Бронирования
              </NuxtLink>
            </li>
          </ul>

          <!-- Right Side -->
          <div class="d-flex align-items-center gap-3">
            <!-- Notifications -->
            <NotificationBell v-if="isAuthenticated" />
            
            <!-- User Menu -->
            <div v-if="isAuthenticated" class="dropdown">
              <button 
                class="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                type="button" 
                data-bs-toggle="dropdown"
              >
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-light me-2"
                     style="width: 32px; height: 32px;">
                  <Icon name="heroicons:user" size="16" class="text-muted" />
                </div>
                <span class="d-none d-md-inline">{{ user?.first_name || 'Пользователь' }}</span>
              </button>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <NuxtLink to="/profile" class="dropdown-item">
                    <Icon name="heroicons:user" size="16" class="me-2" />
                    Профиль
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink to="/settings" class="dropdown-item">
                    <Icon name="heroicons:cog-6-tooth" size="16" class="me-2" />
                    Настройки
                  </NuxtLink>
                </li>
                <li v-if="isAdmin">
                  <NuxtLink to="/admin" class="dropdown-item">
                    <Icon name="heroicons:shield-check" size="16" class="me-2" />
                    Админ панель
                  </NuxtLink>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li>
                  <button class="dropdown-item text-danger" @click="logout">
                    <Icon name="heroicons:arrow-right-on-rectangle" size="16" class="me-2" />
                    Выйти
                  </button>
                </li>
              </ul>
            </div>

            <!-- Auth Buttons -->
            <div v-else class="d-flex gap-2">
              <NuxtLink to="/auth/login" class="btn btn-outline-primary">
                Войти
              </NuxtLink>
              <NuxtLink to="/auth/register" class="btn btn-primary">
                Регистрация
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthApi } from '~/composables/useAuthApi'
import { useStorage } from '~/composables/useStorage'

// Composables
const { user, logout: logoutApi } = useAuthApi()
const { getUserRole } = useStorage()

// Computed
const isAuthenticated = computed(() => !!user.value)
const isAdmin = computed(() => {
  const role = getUserRole()
  return ['admin', 'super_admin', 'hr', 'supervisor'].includes(role)
})

// Methods
const logout = async () => {
  try {
    await logoutApi()
    await navigateTo('/')
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 1030;
  background: white;
}

.navbar-brand {
  text-decoration: none;
}

.navbar-brand:hover {
  text-decoration: none;
}

.nav-link {
  font-weight: 500;
  color: var(--color-text-dark) !important;
  transition: color 0.2s;
}

.nav-link:hover {
  color: var(--color-primary-green) !important;
}

.nav-link.active {
  color: var(--color-primary-green) !important;
}

.dropdown-toggle::after {
  margin-left: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.dropdown-item.text-danger:hover {
  background-color: #f8d7da;
  color: #721c24 !important;
}
</style>