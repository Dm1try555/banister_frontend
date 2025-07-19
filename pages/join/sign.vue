<script setup>
import { ref } from 'vue'; // Импортируем ref для реактивного состояния

// import { useFetch } from '#app';
// const apiData = useFetch('https://your-django-api-endpoint/');

const activeTab = ref('client'); // Состояние для отслеживания активной вкладки

const selectTab = (tab) => {
  activeTab.value = tab; // Обновляем активную вкладку при клике
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

    <!-- Main Content - Quick Sign Up Form -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 500px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Quick Sign Up
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Create your account</p>
          </div>

          <!-- Client/Provider Toggle -->
          <div class="d-flex toggle-tabs rounded-3 p-1 mb-4">
            <button 
              @click="selectTab('client')" 
              :class="{ 'active-tab': activeTab === 'client' }"
              class="btn flex-fill rounded-2 py-2 me-1" 
            >
              Client
            </button>
            <button 
              @click="selectTab('provider')" 
              :class="{ 'active-tab': activeTab === 'provider' }"
              class="btn flex-fill rounded-2 py-2 ms-1" 
            >
              Provider
            </button>
          </div>

          <!-- Form -->
          <form>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="firstName" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">First Name</label>
                <input type="text" class="form-control" id="firstName" placeholder="John" style="font-family: var(--font-inter);">
              </div>
              <div class="col-md-6">
                <label for="lastName" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Last Name</label>
                <input type="text" class="form-control" id="lastName" placeholder="Doe" style="font-family: var(--font-inter);">
              </div>
            </div>

            <div class="mb-3">
              <label for="email" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Email</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:envelope" /></span>
                <input type="email" class="form-control" id="email" placeholder="Enter your email" style="font-family: var(--font-inter);">
              </div>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Phone Number</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:phone" /></span>
                <input type="tel" class="form-control" id="phone" placeholder="Enter your phone" style="font-family: var(--font-inter);">
              </div>
            </div>

            <div class="mb-3">
              <label for="password" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Password</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:lock" /></span>
                <input type="password" class="form-control" id="password" placeholder="Create a password" style="font-family: var(--font-inter);">
              </div>
            </div>

            <div class="mb-4">
              <label for="confirmPassword" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Confirm Password</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:lock" /></span>
                <input type="password" class="form-control" id="confirmPassword" placeholder="Confirm your password" style="font-family: var(--font-inter);">
              </div>
            </div>

            <div class="d-grid mb-4">
              <button type="submit" class="btn btn-primary-green py-3" style="font-family: var(--font-inter); font-weight: 500;">
                Create Account
              </button>
            </div>
          </form>

          <div class="text-center">
            <NuxtLink to="/join" class="text-decoration-none d-inline-flex align-items-center" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 500;">
              <Icon name="bi:arrow-left" class="me-2" />
              Back to signup options
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
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
</style>
