<script setup>
import { useRoute } from 'vue-router';
import { ref, computed } from 'vue';

const route = useRoute();

// Пример данных для сайдбара Management Dashboard
const sidebarLinks = [
  { name: 'All Customers', icon: 'heroicons:users', path: '/management/all-customers' },
  { name: 'My Customers', icon: 'heroicons:user-group', path: '/management/my-customers' },
  { name: 'Raised Issues', icon: 'heroicons:exclamation-circle', path: '/management/raised-issues' },
  { name: 'Fixed Issues', icon: 'heroicons:check-circle', path: '/management/fixed-issues' },
  { name: 'Messages', icon: 'heroicons:chat-bubble-left-right', path: '/management/messages' },
  { name: 'Documents', icon: 'heroicons:document-text', path: '/management/documents' },
  { name: 'Account Information', icon: 'heroicons:cog-6-tooth', path: '/management/account-information' },
];

// Вычисляемое свойство для заголовка основной области
const mainContentTitle = computed(() => {
  const currentLink = sidebarLinks.find(link => route.path.startsWith(link.path));
  return currentLink ? currentLink.name : 'Management Dashboard'; // По умолчанию 'Management Dashboard'
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
            Management Dashboard
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
        <div class="dropdown">
          <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="languageDropdown" data-bs-toggle="dropdown" aria-expanded="false" style="font-family: var(--font-inter);">
            English
          </button>
          <ul class="dropdown-menu" aria-labelledby="languageDropdown">
            <li><a class="dropdown-item" href="#">English</a></li>
            <li><a class="dropdown-item" href="#">Русский</a></li>
          </ul>
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
/* Используем существующие CSS переменные */
:root {
  --color-primary-green: #2d5016;
  --color-primary-green-hover: #1a3009;
  --color-secondary-green: #d4f4dd; /* Светло-зеленый для активного элемента сайдбара */
  --color-pink: #ff6b9d;
  --color-beige: #f5f1eb;
  --color-text-muted: #6c757d;
  --color-text-dark: #343a40; /* Для основного текста и заголовков */
  --color-border: #dee2e6;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bg-beige {
  background-color: var(--color-beige);
}

.sidebar {
  width: 280px; /* Ширина сайдбара */
  min-width: 280px;
  border-right: 1px solid rgba(0, 0, 0, 0.05);
}

.sidebar-nav .nav-link {
  color: var(--color-text-dark); /* Default color for links */
  transition: background-color 0.2s ease, color 0.2s ease;
}

.sidebar-nav .nav-link:hover {
  background-color: rgba(0, 0, 0, 0.03);
}

.sidebar-nav .nav-link.active-sidebar-link {
  background-color: var(--color-secondary-green);
  color: var(--color-primary-green);
}

.dashboard-header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.dashboard-cards-container {
  background-color: var(--color-beige);
}

/* Responsive adjustments */
@media (max-width: 991.98px) {
  .sidebar {
    width: 100%;
    min-width: unset;
    height: auto;
    border-right: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    position: relative;
  }
  .sidebar-header {
    display: none;
  }
  .sidebar-nav {
    display: none; /* Could be toggled with a menu button */
  }
  .dashboard-header {
    justify-content: space-between;
  }
  .dashboard-cards-container {
    padding: 1rem !important;
  }
}
</style>
