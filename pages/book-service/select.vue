<script setup>
import { ref } from 'vue';
import { navigateTo } from '#app'; // Import navigateTo for programmatic navigation

const selectedService = ref(null); // Initialize as null so the button is disabled by default

const services = [
  { id: 'Maid', title: 'Maid', description: 'Professional house cleaning services' },
  { id: 'Gardener', title: 'Gardener', description: 'Garden maintenance and landscaping' },
  { id: 'Chef', title: 'Chef', description: 'Personal chef and meal preparation' },
  { id: 'Chauffeur', title: 'Chauffeur', description: 'Personal driving services' },
  { id: 'Nanny', title: 'Nanny', description: 'Professional childcare services' },
];

const selectService = (serviceId) => {
  selectedService.value = serviceId;
  console.log('Selected service:', selectedService.value); // For debugging
};

const handleContinue = () => {
  if (selectedService.value) {
    // If a service is selected, go to the details page
    navigateTo('/book-service/details');
  }
  // If no service is selected, the button will be disabled and this function will not be called
};
</script>

<template>
  <div class="min-vh-100 d-flex flex-column bg-beige">
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

    <!-- Main Content -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
      <div class="container px-4 px-md-0" style="max-width: 800px;">
        <!-- Header -->
        <div class="text-center mb-5">
          <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 2.5rem;">
            Book Your Service
          </h1>
          <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.15rem;">
            Find the perfect professional for your needs
          </p>
        </div>

        <!-- Select Service Section -->
        <div class="text-center mb-4">
          <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
            Select Your Service
          </h2>
          
          <!-- First row: 3 items -->
          <div class="row justify-content-center g-3 mb-3">
            <div v-for="service in services.slice(0, 3)" :key="service.id" class="col-6 col-md-4">
              <div 
                class="service-card card h-100 shadow-sm cursor-pointer" 
                :class="{ 'selected-card': selectedService === service.id }"
                @click="selectService(service.id)"
                style="background-color: white; border-radius: 12px; transition: all 0.2s ease;"
              >
                <div class="card-body p-3 text-start">
                  <h5 class="card-title mb-1" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                    {{ service.title }}
                  </h5>
                  <p class="card-text" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 0.9rem;">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Second row: 2 items, centered -->
          <div class="row justify-content-center g-3">
            <div v-for="service in services.slice(3, 5)" :key="service.id" class="col-6 col-md-4">
              <div 
                class="service-card card h-100 shadow-sm cursor-pointer" 
                :class="{ 'selected-card': selectedService === service.id }"
                @click="selectService(service.id)"
                style="background-color: white; border-radius: 12px; transition: all 0.2s ease;"
              >
                <div class="card-body p-3 text-start">
                  <h5 class="card-title mb-1" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                    {{ service.title }}
                  </h5>
                  <p class="card-text" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 0.9rem;">
                    {{ service.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Continue Button -->
        <div class="text-center mt-5">
          <button 
            type="button" 
            class="btn btn-primary-green py-3 px-5" 
            :disabled="!selectedService" 
            @click="handleContinue"
            style="font-family: var(--font-inter); font-weight: 500;"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.service-card.selected-card {
  border-color: var(--color-pink) !important;
  box-shadow: 0 4px 15px rgba(255, 107, 157, 0.2);
}
</style>
