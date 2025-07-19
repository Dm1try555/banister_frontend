<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Vacation Mode Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Vacation Mode
          </h2>
  
          <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Activate Vacation Mode</h6>
              <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">Temporarily pause all services and bookings.</p>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="vacationModeSwitch" v-model="isVacationModeActive" style="width: 40px; height: 20px;">
              <label class="form-check-label" for="vacationModeSwitch" style="display: none;"></label>
            </div>
          </div>
  
          <div v-if="isVacationModeActive" class="vacation-settings mt-4">
            <div class="row g-3 mb-4">
              <div class="col-md-6">
                <label for="startDate" class="form-label profile-label">Start Date</label>
                <input type="date" class="form-control profile-input" id="startDate" v-model="vacationStartDate">
              </div>
              <div class="col-md-6">
                <label for="endDate" class="form-label profile-label">End Date</label>
                <input type="date" class="form-control profile-input" id="endDate" v-model="vacationEndDate">
              </div>
            </div>
            <div class="mb-4">
              <label for="vacationMessage" class="form-label profile-label">Optional Message for Providers</label>
              <textarea class="form-control profile-input" id="vacationMessage" rows="3" v-model="vacationMessage"></textarea>
            </div>
            <button class="btn btn-primary-green py-2 px-4" @click="saveVacationSettings" style="font-family: var(--font-inter); font-weight: 500;">
              Save Settings
            </button>
          </div>
          <div v-else class="text-center text-muted py-4" style="font-family: var(--font-inter);">
            Vacation mode is currently inactive.
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  
  const isVacationModeActive = ref(false);
  const vacationStartDate = ref('');
  const vacationEndDate = ref('');
  const vacationMessage = ref('');
  
  const saveVacationSettings = () => {
    console.log('Vacation Mode Active:', isVacationModeActive.value);
    console.log('Start Date:', vacationStartDate.value);
    console.log('End Date:', vacationEndDate.value);
    console.log('Message:', vacationMessage.value);
    // Here you would typically send this data to your backend
    alert('Vacation settings saved!');
  };
  </script>
  
  <style scoped>
  /* Используем существующие CSS переменные */
  :root {
    --color-primary-green: #2d5016;
    --color-primary-green-hover: #1a3009;
    --color-secondary-green: #d4f4dd;
    --color-pink: #ff6b9d;
    --color-beige: #f5f1eb;
    --color-text-muted: #6c757d;
    --color-text-dark: #343a40;
    --color-border: #dee2e6;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .profile-label {
    font-family: var(--font-inter);
    font-weight: 500;
    color: var(--color-text-dark);
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .profile-input {
    background-color: #f8f9fa;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-family: var(--font-inter);
    color: var(--color-text-dark);
  }
  
  .profile-input:focus {
    outline: none;
    border-color: var(--color-primary-green);
    box-shadow: 0 0 0 0.25rem rgba(45, 80, 22, 0.25);
  }
  
  .form-check-input:checked {
    background-color: var(--color-primary-green);
    border-color: var(--color-primary-green);
  }
  
  .form-check-input:focus {
    box-shadow: 0 0 0 0.25rem rgba(45, 80, 22, 0.25);
  }
  
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
  
  @media (max-width: 991.98px) {
    .card-body {
      padding: 1.5rem !important;
    }
    .profile-label {
      font-size: 0.9rem;
    }
    .profile-input {
      padding: 0.6rem 0.8rem;
      font-size: 0.9rem;
    }
    .btn-primary-green {
      font-size: 0.9rem;
      padding: 0.5rem 1rem !important;
    }
    .form-check-input {
      width: 35px !important;
      height: 18px !important;
    }
  }
  </style>
  