<script setup>
import { ref } from 'vue';

const activeAccountType = ref('client'); // Состояние для отслеживания активного типа аккаунта

const selectAccountType = (type) => {
  activeAccountType.value = type;
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
    <!-- Main Content - Sign In Form -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center bg-beige py-5">
      <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px; max-width: 450px; width: 100%;">
        <div class="card-body">
          <div class="text-center mb-4">
            <h2 class="mb-2" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700;">
              Sign In
            </h2>
            <p class="text-muted" style="font-family: var(--font-inter);">Choose your account type</p>
          </div>
          
          <!-- Account Type Selection -->
          <div class="d-flex flex-column gap-2 mb-4">
            <button 
              @click="selectAccountType('client')" 
              :class="{ 'active-account-type': activeAccountType === 'client' }"
              class="btn account-type-btn py-3 rounded-3" 
            >
              Client
            </button>
            <button 
              @click="selectAccountType('service-provider')" 
              :class="{ 'active-account-type': activeAccountType === 'service-provider' }"
              class="btn account-type-btn py-3 rounded-3" 
            >
              Service Provider
            </button>
            <button 
              @click="selectAccountType('management-support')" 
              :class="{ 'active-account-type': activeAccountType === 'management-support' }"
              class="btn account-type-btn py-3 rounded-3" 
            >
              Management & Support
            </button>
          </div>

          <form>
            <!-- Email Input Field -->
            <div class="mb-3">
              <label for="emailAddress" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Email</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="heroicons:user" /></span>
                <input 
                  type="email" 
                  class="form-control" 
                  id="emailAddress" 
                  placeholder="Enter your email" 
                  style="font-family: var(--font-inter);"
                >
              </div>
            </div>
            <!-- Password Input -->
            <div class="mb-3">
              <label for="password" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Password</label>
              <div class="input-group">
                <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="heroicons:lock-closed" /></span>
                <input type="password" class="form-control" id="password" placeholder="Enter your password" style="font-family: var(--font-inter);">
              </div>
            </div>
            <!-- Forgot Password Link -->
            <div class="text-end mb-4">
              <a href="#" class="text-decoration-none" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 500; font-size: 0.9rem;">
                Forgot password?
              </a>
            </div>
            <!-- Sign In Button -->
            <div class="d-grid mb-4">
              <button type="submit" class="btn btn-primary-green py-3" style="font-family: var(--font-inter); font-weight: 500;">
                Sign In
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
          <!-- Bottom Link - Don't have an account? -->
          <div class="text-center">
            <p style="color: var(--color-text-muted); font-family: var(--font-inter);">
              Don't have an account? 
              <NuxtLink to="/join/sign" class="text-decoration-none" style="color: var(--color-primary-green); font-weight: 500;">
                Sign up here
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

/* Account Type Buttons */
.account-type-btn {
  background-color: #f8f9fa; /* Light background for inactive */
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
  font-family: var(--font-inter);
  font-weight: 500;
  transition: all 0.2s ease;
}

.account-type-btn:hover {
  background-color: #e9ecef;
  border-color: #d4d8dc;
}

.account-type-btn.active-account-type {
  background-color: var(--color-secondary-green); /* Light green for active */
  color: var(--color-primary-green); /* Dark green text for active */
  border-color: var(--color-primary-green); /* Green border for active */
  box-shadow: 0 2px 8px rgba(45, 80, 22, 0.1); /* Subtle shadow for active */
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
  border-color: var(--color-border);
}

.form-control:focus {
  border-color: var(--color-primary-green);
  box-shadow: 0 0 0 0.2rem rgba(45, 80, 22, 0.25);
}

.input-group-text {
  background-color: white;
  border-right: none;
  border-color: var(--color-border);
}

/* Responsive adjustments */
@media (max-width: 767.98px) {
  .card-body {
    padding: 1.5rem !important;
  }
  h2 {
    font-size: 1.75rem !important;
  }
  .form-label {
    font-size: 0.9rem;
  }
  .form-control {
    font-size: 0.9rem;
    padding: 0.6rem 0.8rem;
  }
  .btn-primary-green, .btn-outline-secondary, .account-type-btn {
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
  }
}
</style>
