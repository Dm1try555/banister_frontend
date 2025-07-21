<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();

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
  const currentLink = sidebarLinks.find(link => route.path.startsWith(link.path));
  return currentLink ? currentLink.name : 'Dashboard'; // По умолчанию 'Dashboard'
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


