<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import EmailVerificationBanner from '@/components/common/EmailVerificationBanner.vue';
import { useApi } from '~/utils/api';

const route = useRoute();
const router = useRouter();
const api = useApi();

// Пример данных для сайдбара
const sidebarLinks = [
  { name: 'Dashboard', icon: 'heroicons:home', path: '/customer' },
  { name: 'Calendar', icon: 'heroicons:calendar', path: '/customer/calendar' },
  { name: 'Messages', icon: 'heroicons:chat-bubble-left-right', path: '/customer/messages' },
  { name: 'Visit History', icon: 'heroicons:clock', path: '/customer/visit-history' },
  { name: 'Payment History', icon: 'heroicons:credit-card', path: '/customer/payment-history' },
  { name: 'Earnings', icon: 'heroicons:banknotes', path: '/customer/earnings' },
  { name: 'Profile', icon: 'heroicons:user', path: '/customer/profile' },
  { name: 'Booking Management', icon: 'heroicons:cog-6-tooth', path: '/customer/booking-management' },
  { name: 'Vacation Mode', icon: 'heroicons:sun', path: '/customer/vacation-mode' },
  { name: 'Documents', icon: 'heroicons:document-text', path: '/customer/documents' },
];

// Вычисляемое свойство для заголовка основной области
const mainContentTitle = computed(() => {
  if (!route.path) return 'Dashboard';
  const currentLink = sidebarLinks.find(link => route.path.startsWith(link.path));
  return currentLink ? currentLink.name : 'Dashboard'; // По умолчанию 'Dashboard'
});

// Email verification banner logic
const showEmailBanner = ref(false); // По умолчанию скрыта, показываем только для авторизованных пользователей
const userEmail = ref(''); // Будет заполнено из API
const isComponentMounted = ref(true); // Track component mount state

// Функция для принудительного обновления баннера (экспортируем для использования в других компонентах)
const forceUpdateBanner = async () => {
  await updateBannerStatus();
};



// Функция для обновления статуса баннера
const updateBannerStatus = async () => {
  try {
    const userData = await api.get('auth/profile/');
    if (!userData) return;
    
    userEmail.value = userData.email;
    
    // Если email подтвержден, сразу скрываем баннер
    if (userData.email_verified) {
      localStorage.setItem('email_verified', 'true');
      localStorage.setItem('emailBannerDismissed', 'true');
      if (showEmailBanner && isComponentMounted.value) {
        showEmailBanner.value = false;
      }
      return;
    }
    
    // Проверяем localStorage
    const localStorageEmailVerified = localStorage.getItem('email_verified') === 'true';
    const bannerDismissed = localStorage.getItem('emailBannerDismissed') === 'true';
    
    if (localStorageEmailVerified || bannerDismissed) {
      if (showEmailBanner && isComponentMounted.value) {
        showEmailBanner.value = false;
      }
      return;
    }
    
    // Показываем баннер только если email не подтвержден
    if (showEmailBanner && isComponentMounted.value) {
      showEmailBanner.value = true;
    }
  } catch (error) {
    console.error('Failed to update banner status:', error);
  }
};

const dismissEmailBanner = () => {
  if (showEmailBanner && typeof showEmailBanner.value !== 'undefined' && isComponentMounted.value) {
    showEmailBanner.value = false;
  }
  // Здесь можно сохранить состояние в localStorage или отправить на сервер
  localStorage.setItem('emailBannerDismissed', 'true');
};

const resendVerificationEmail = async () => {
  if (!userEmail.value) {
    alert('Email not found. Please log in again.');
    return;
  }
  
  try {
    const response = await api.post('auth/email-confirm/request/', {
      email: userEmail.value
    });
    
    if (response.success) {
      alert('Verification email sent to ' + userEmail.value);
      // Обновляем статус баннера после отправки
      if (showEmailBanner) {
        await updateBannerStatus().catch(error => {
          console.warn('Failed to update banner status after email send:', error);
        });
      }
    } else {
      alert('Error sending email: ' + (response.message || 'Unknown error'));
    }
  } catch (error) {
    console.error('Layout: Failed to send verification email:', error);
    
    // Более детальная обработка ошибок
    let errorMessage = 'Check your internet connection';
    if (error instanceof Error) {
      if (error.message.includes('ECONNABORTED')) {
        errorMessage = 'Connection with the server was interrupted';
      } else if (error.message.includes('Timeout')) {
        errorMessage = 'Server not responding. Please try again later';
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage = 'Could not connect to the server';
      } else {
        errorMessage = error.message;
      }
    }
    
    alert('Error sending email: ' + errorMessage);
  }
};

const goToProfileSettings = () => {
  if (router) {
    router.push('/customer/profile');
  }
};

// Проверяем авторизацию и загружаем данные пользователя
onMounted(async () => {
  isComponentMounted.value = true;
  

  const token = localStorage.getItem('access_token');
  if (token) {
    try {
      // Проверяем, не подтвержден ли уже email в localStorage
      const localStorageEmailVerified = localStorage.getItem('email_verified') === 'true';
      if (localStorageEmailVerified) {
        // Если email уже подтвержден в localStorage, принудительно скрываем баннер
        localStorage.setItem('emailBannerDismissed', 'true');
        if (showEmailBanner && typeof showEmailBanner.value !== 'undefined' && isComponentMounted.value) {
          showEmailBanner.value = false;
        }
      }
      
      if (showEmailBanner && isComponentMounted.value) {
        await updateBannerStatus();
      }
      
      // Добавляем слушатель изменений localStorage
      const handleStorageChange = (e) => {
        if (e.key === 'email_verified' || e.key === 'emailBannerDismissed') {
          if (showEmailBanner && isComponentMounted.value) {
            showEmailBanner.value = false;
          }
        }
      };
      
      window.addEventListener('storage', handleStorageChange);
      
      // Очистка слушателя при размонтировании компонента
      const cleanup = () => {
        isComponentMounted.value = false;
        window.removeEventListener('storage', handleStorageChange);
      };
      
      onUnmounted(cleanup);
      
    } catch (error) {
      console.error('Failed to load user data:', error);
      
      // Проверяем тип ошибки для лучшей обработки
      if (error instanceof Error) {
        if (error.message.includes('ECONNABORTED') || 
            error.message.includes('Failed to fetch') ||
            error.message.includes('Timeout')) {
          console.warn('Connection error, will retry on next navigation');
          // Не перенаправляем при ошибках соединения, позволяем пользователю остаться на странице
          return;
        }
      }
      
      // Если не удалось загрузить данные по другим причинам, перенаправляем на логин
      router.push('/join/signin');
    }
  } else {
    // Если нет токена, перенаправляем на логин
    router.push('/join/signin');
  }
});

// Обновляем статус баннера при изменении маршрута
watch(() => route.path, async () => {
  const token = localStorage.getItem('access_token');
  if (token && showEmailBanner && route.path && isComponentMounted.value) {
    try {
      await updateBannerStatus();
    } catch (error) {
      console.warn('Failed to update banner status on route change:', error);
    }
  }
});
</script>

<template>
  <div class="d-flex min-vh-100 bg-beige">
    <!-- Left Sidebar -->
    <aside class="sidebar bg-white shadow-sm d-flex flex-column py-4 px-3">
      <div class="sidebar-header mb-5">
        <div class="d-flex align-items-center mb-4">
          <Icon name="heroicons:squares-2x2" size="24" class="me-2" style="color: var(--color-primary-green);" />
          <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
            Customer Dashboard
          </h2>
        </div>
      </div>
      <nav class="sidebar-nav flex-grow-1">
        <ul class="list-unstyled">
          <li v-for="link in sidebarLinks" :key="link.path" class="mb-2">
            <NuxtLink 
              :to="link.path" 
              class="nav-link d-flex align-items-center py-2 px-3 rounded" 
              :class="{ 'active-sidebar-link': route.path && route.path.startsWith(link.path) }"
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

          <NuxtLink to="/logout" class="btn btn-outline-secondary">Logout</NuxtLink>
        </div>
      </header>

      <!-- Content Cards (rendered by NuxtPage) -->
      <div class="dashboard-cards-container flex-grow-1 p-4">
        <!-- Email Verification Banner -->
        <EmailVerificationBanner 
          v-if="showEmailBanner"
          :email="userEmail"
          @dismiss="dismissEmailBanner"
          @resend-email="resendVerificationEmail"
          @go-to-settings="goToProfileSettings"
        />
        <slot /> <!-- NuxtPage will render here -->
      </div>
    </div>
  </div>
</template>


