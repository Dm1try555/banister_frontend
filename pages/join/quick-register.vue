<script setup>
import { ref } from 'vue';

// import { useFetch } from '#app';
// const apiData = useFetch('https://your-django-api-endpoint/');

const activeMethod = ref('phone'); // Состояние для отслеживания активного метода регистрации (phone или email)

const selectMethod = (method) => {
  activeMethod.value = method; // Обновляем активный метод при клике
};
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg p-3 bg-beige shadow-sm">
      <div class="navbar-brand text-dark d-flex align-items-center">
        <NuxtLink to="/" class="navbar-brand text-dark d-flex align-items-center" style="text-decoration: none;">
          <div class="d-flex flex-column">
            <span class="brand-title">BANISTER</span>
            <span class="brand-subtitle">staff</span>
          </div>
        </NuxtLink>
      </div>
      <div class="collapse navbar-collapse justify-content-center">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link btn btn-nav-primary text-white px-4 py-2 rounded me-3 btn-nav-text" href="#">
              Start now
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark px-3 nav-text" href="#">How It Works</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark px-3 nav-text" href="#">About us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-dark px-3 nav-text" href="#">Blog</a>
          </li>
        </ul>
      </div>
      <div class="navbar-right d-flex align-items-center">
        <div class="d-flex align-items-center me-3">
          <Icon name="heroicons:globe-alt" class="me-1" />
          <span class="text-muted nav-text">EN</span>
        </div>
        <Icon name="heroicons:arrow-right-end-on-rectangle" class="mx-3" />
        <NuxtLink to="/join" class="btn-outline-secondary px-4 py-2 text-decoration-none">
          Sign Up
        </NuxtLink>
      </div>
    </nav>

    <!-- Main Content - Quick Register Form -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 450px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Quick Register
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Sign up in seconds</p>
          </div>

          <!-- Phone/Email Toggle -->
          <div class="d-flex toggle-tabs rounded-3 p-1 mb-4">
            <button 
              @click="selectMethod('phone')" 
              :class="{ 'active-tab': activeMethod === 'phone' }"
              class="btn flex-fill rounded-2 py-2 me-1" 
            >
              Phone Number
            </button>
            <button 
              @click="selectMethod('email')" 
              :class="{ 'active-tab': activeMethod === 'email' }"
              class="btn flex-fill rounded-2 py-2 ms-1" 
            >
              Email
            </button>
          </div>

          <form>
            <!-- Dynamic Input Field based on activeMethod -->
            <div class="mb-4">
              <label v-if="activeMethod === 'phone'" for="phoneNumber" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Phone Number</label>
              <label v-else for="emailAddress" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Email Address</label>
              
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;">
                  <Icon v-if="activeMethod === 'phone'" name="bi:phone" />
                  <Icon v-else name="bi:envelope" />
                </span>
                <input 
                  :type="activeMethod === 'phone' ? 'tel' : 'email'" 
                  class="form-control" 
                  :id="activeMethod === 'phone' ? 'phoneNumber' : 'emailAddress'" 
                  :placeholder="activeMethod === 'phone' ? 'Enter your phone number' : 'Enter your email address'" 
                  style="font-family: var(--font-inter);"
                >
              </div>
            </div>

            <!-- Continue Button -->
            <div class="d-grid mb-4">
              <button type="submit" class="btn btn-primary-green py-3" style="font-family: var(--font-inter); font-weight: 500;">
                Continue
              </button>
            </div>
          </form>

          <!-- OR Divider -->
          <div class="d-flex align-items-center my-4">
            <hr class="flex-grow-1" style="border-top: 1px solid var(--color-border);" />
            <span class="mx-3 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">OR</span>
            <hr class="flex-grow-1" style="border-top: 1px solid var(--color-border);" />
          </div>

          <!-- Social Login Buttons -->
          <div class="d-grid gap-3 mb-4">
            <button class="btn btn-outline-secondary py-3 d-flex align-items-center justify-content-center" style="font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:google" size="20" class="me-2" style="color: var(--color-primary-green);" />
              Continue with Google
            </button>
            <button class="btn btn-outline-secondary py-3 d-flex align-items-center justify-content-center" style="font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:apple" size="20" class="me-2" style="color: var(--color-primary-green);" />
              Continue with Apple
            </button>
          </div>

          <!-- Bottom Link -->
          <div class="text-center">
            <p style="color: var(--color-text-muted); font-family: var(--font-inter);">
              Already have an account? 
              <NuxtLink to="/join/sign" class="text-decoration-none" style="color: var(--color-primary-green); font-weight: 500;">
                Sign in here
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Используем существующие CSS переменные */
:root {
  --color-primary-green: #2d5016;
  --color-primary-green-hover: #1a3009;
  --color-secondary-green: #d4f4dd;
  --color-pink: #ff6b9d;
  --color-beige: #f5f1eb;
  --color-text-muted: #6c757d;
  --color-border: #dee2e6;
  --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.bg-beige {
  background-color: var(--color-beige);
}

.toggle-tabs {
  background-color: #f0f0f0; /* Светло-серый фон для контейнера */
  border-radius: 12px; /* Закругленные углы для контейнера */
}

.toggle-tabs .btn {
  font-family: var(--font-inter);
  font-weight: 500;
  border: none;
  transition: background-color 0.3s, color 0.3s;
  color: var(--color-text-muted); /* Цвет текста по умолчанию для неактивной */
  background-color: transparent; /* Прозрачный фон для неактивной */
}

.toggle-tabs .btn.active-tab {
  background-color: white; /* Белый фон для активной вкладки */
  color: var(--color-primary-green); /* Зеленый текст для активной вкладки */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08); /* Легкая тень для активной вкладки */
}

/* Кнопки в стиле проекта */
.btn-primary-green {
  background-color: var(--color-primary-green) !important;
  border-color: var(--color-primary-green) !important;
  color: white !important;
  font-family: var(--font-inter);
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none !important;
}

.btn-primary-green:hover,
.btn-primary-green:focus,
.btn-primary-green:active {
  background-color: var(--color-primary-green-hover) !important;
  border-color: var(--color-primary-green-hover) !important;
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(45, 80, 22, 0.2);
  text-decoration: none !important;
}

.btn-outline-secondary {
  background-color: white;
  border-color: var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-inter);
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-outline-secondary:hover {
  background-color: #f8f9fa;
  border-color: var(--color-border);
  color: #495057;
  transform: translateY(-1px);
}

/* Form Controls */
.form-control {
  font-family: var(--font-inter);
}

.form-control:focus {
  border-color: var(--color-primary-green);
  box-shadow: 0 0 0 0.2rem rgba(45, 80, 22, 0.25);
}
</style>