<script setup>
import { useRoute } from 'vue-router';
import { ref, computed, onMounted, watch } from 'vue';
import EmailVerificationBanner from '@/components/common/EmailVerificationBanner.vue';
import { useAuth } from '~/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { user, isAuthenticated, loadUser, requestEmailConfirmation } = useAuth();

// Пример данных для сайдбара Provider Dashboard
const sidebarLinks = [
  { name: 'Dashboard', icon: 'heroicons:home', path: '/provider' },
  { name: 'My Services', icon: 'heroicons:wrench-screwdriver', path: '/provider/services' },
  { name: 'Orders', icon: 'heroicons:clipboard-document-list', path: '/provider/orders' },
  { name: 'Calendar', icon: 'heroicons:calendar', path: '/provider/calendar' },
  { name: 'Messages', icon: 'heroicons:chat-bubble-left-right', path: '/provider/messages' },
  { name: 'Earnings', icon: 'heroicons:banknotes', path: '/provider/earnings' },
  { name: 'Profile', icon: 'heroicons:user', path: '/provider/profile' },
  { name: 'Documents', icon: 'heroicons:document-text', path: '/provider/documents' },
  { name: 'Settings', icon: 'heroicons:cog-6-tooth', path: '/provider/settings' },
];

// Вычисляемое свойство для заголовка основной области
const mainContentTitle = computed(() => {
  const currentLink = sidebarLinks.find(link => route.path.startsWith(link.path));
  return currentLink ? currentLink.name : 'Dashboard'; // По умолчанию 'Dashboard'
});

// Email verification banner logic
const showEmailBanner = ref(false);
const userEmail = computed(() => user.value?.email || '');

// Function to force update banner
const forceUpdateBanner = async () => {
  await updateBannerStatus();
};

// Function to update banner status
const updateBannerStatus = async () => {
  try {
    if (!user.value) {
      await loadUser();
    }
    
    const emailVerified = user.value?.email_verified;
    const bannerDismissed = localStorage.getItem('emailBannerDismissed') === 'true';
    const localStorageEmailVerified = localStorage.getItem('email_verified') === 'true';
    
    // Show banner only if email is NOT verified AND banner is NOT dismissed
    const shouldShowBanner = !emailVerified && !localStorageEmailVerified && !bannerDismissed;
    showEmailBanner.value = shouldShowBanner;
    // If email is verified, force hide banner
    if (emailVerified || localStorageEmailVerified) {
      localStorage.setItem('email_verified', 'true');
      localStorage.setItem('emailBannerDismissed', 'true');
      showEmailBanner.value = false;
    }
  } catch (error) {
    console.error('Failed to update banner status:', error);
  }
};

const dismissEmailBanner = () => {
  showEmailBanner.value = false;
  localStorage.setItem('emailBannerDismissed', 'true');
};

const resendVerificationEmail = async () => {
  if (!userEmail.value) {
    alert('Email not found. Please log in again.');
    return;
  }
  
  try {
    await requestEmailConfirmation(userEmail.value);
    alert('Verification email has been sent! Please check your inbox.');
  } catch (error) {
    console.error('Failed to send verification email:', error);
    alert('Failed to send verification email. Please try again.');
  }
};

// Update banner status when component mounts
onMounted(async () => {
  if (isAuthenticated.value) {
    await updateBannerStatus();
  }
});

// Watch for route changes to update banner
watch(() => route.path, async () => {
  if (isAuthenticated.value) {
    await updateBannerStatus();
  }
});

// Экспортируем функции для использования в дочерних компонентах
defineExpose({
  forceUpdateBanner,
  dismissEmailBanner,
  resendVerificationEmail
});
</script>

<template>
  <div class="d-flex min-vh-100 bg-beige">
    <!-- Left Sidebar -->
    <aside class="sidebar bg-white shadow-sm d-flex flex-column py-4 px-3">
      <div class="sidebar-header mb-5">
        <div class="d-flex align-items-center mb-4">
          <Icon name="heroicons:wrench-screwdriver" size="24" class="me-2" style="color: var(--color-primary-green);" />
          <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
            Provider Dashboard
          </h2>
        </div>
      </div>
      <nav class="sidebar-nav flex-grow-1">
        <ul class="list-unstyled">
          <li v-for="link in sidebarLinks" :key="link.path" class="mb-2">
            <NuxtLink 
              :to="link.path" 
              class="nav-link d-flex align-items-center py-2 px-3 rounded" 
              :class="{ 'active-sidebar-link': route.path.startsWith(link.path) }"
              style="font-family: var(--font-inter); font-weight: 500; text-decoration: none;"
            >
              <Icon :name="link.icon" size="20" class="me-3" />
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <div class="main-content flex-grow-1 d-flex flex-column">
      <!-- Email Verification Banner -->
      <EmailVerificationBanner 
        v-if="showEmailBanner"
        :user-email="userEmail"
        @dismiss="dismissEmailBanner"
        @resend="resendVerificationEmail"
      />

      <!-- Top Header for Main Content -->
      <header class="dashboard-header d-flex justify-content-between align-items-center p-4 bg-white shadow-sm">
        <h1 class="h4 mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          {{ mainContentTitle }}
        </h1>
        <div class="d-flex align-items-center gap-3">
          <div class="dropdown">
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="font-family: var(--font-inter);">
              English
            </button>
            <ul class="dropdown-menu" aria-labelledby="languageDropdown">
              <li><a class="dropdown-item" href="#">English</a></li>
              <li><a class="dropdown-item" href="#">Русский</a></li>
            </ul>
          </div>
          <NuxtLink to="/logout" class="btn btn-outline-secondary">Выйти</NuxtLink>
        </div>
      </header>

      <!-- Content Cards (rendered by NuxtPage) -->
      <div class="dashboard-cards-container flex-grow-1 p-4">
        <slot /> <!-- NuxtPage will render here -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 280px;
  min-width: 280px;
  border-right: 1px solid var(--color-border);
}

.main-content {
  min-width: 0;
}

.nav-link {
  color: var(--color-text-muted);
  transition: all 0.3s ease;
}

.nav-link:hover {
  color: var(--color-primary-green);
  background-color: rgba(34, 197, 94, 0.1);
}

.nav-link.active-sidebar-link {
  color: var(--color-primary-green);
  background-color: rgba(34, 197, 94, 0.1);
  font-weight: 600;
}

.dashboard-cards-container {
  background-color: var(--color-bg-beige);
  min-height: calc(100vh - 200px);
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    min-width: 100%;
    position: fixed;
    top: 0;
    left: -100%;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .sidebar.show {
    left: 0;
  }
  
  .main-content {
    margin-left: 0;
  }
}
</style> 