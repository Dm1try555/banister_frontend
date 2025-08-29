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
    
    
    
    
    // Here you would typically send this data to your backend
    alert('Vacation settings saved!');
  };
  </script>
  
  
