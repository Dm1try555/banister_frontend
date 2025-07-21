
<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Main Content -->
    <main class="flex-grow-1 d-flex flex-column justify-content-center bg-beige py-5">
      <div class="container">
        <!-- Header -->
        <div class="text-center mb-5">
          <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 3rem;">
            Join Banister Staff
          </h1>
          <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.25rem;">
            Choose how you'd like to get started
          </p>
        </div>

        <!-- Cards Section -->
        <div class="row justify-content-center g-4 mb-5">
          <!-- Hire Personnel Card -->
          <div class="col-md-5">
            <AppCard customClass="h-100 border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
              <div class="mb-4">
                <div class="d-inline-flex justify-content-center align-items-center" style="width: 80px; height: 80px; background-color: #fce4ec; border-radius: 50%;">
                  <Icon name="bi:person" size="40" style="color: var(--color-pink);" />
                </div>
              </div>
              <h3 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                Hire Personnel
              </h3>
              <p class="mb-4" style="color: var(--color-text-muted); font-family: var(--font-inter);">
                Find reliable home service providers
              </p>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-pink);">•</span>
                  <span style="font-family: var(--font-inter);">Vetted professionals</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-pink);">•</span>
                  <span style="font-family: var(--font-inter);">Background checked</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-pink);">•</span>
                  <span style="font-family: var(--font-inter);">Ongoing supervision</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-pink);">•</span>
                  <span style="font-family: var(--font-inter);">Multilingual support</span>
                </li>
              </ul>
              <div class="d-grid gap-2">
                <AppButton variant="btn btn-primary-green py-3 text-decoration-none" @click="$router.push('/join/detail')">
                  Detailed Questionnaire
                </AppButton>
                <AppButton variant="btn btn-outline-secondary py-3 text-decoration-none" @click="$router.push('/join/quick-register')">
                  Quick Register
                </AppButton>
              </div>
            </AppCard>
          </div>
          <!-- Become a Provider Card -->
          <div class="col-md-5">
            <AppCard customClass="h-100 border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
              <div class="mb-4">
                <div class="d-inline-flex justify-content-center align-items-center" style="width: 80px; height: 80px; background-color: #e3fcec; border-radius: 50%;">
                  <Icon name="bi:briefcase" size="40" style="color: var(--color-primary-green);" />
                </div>
              </div>
              <h3 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                Become a Provider
              </h3>
              <p class="mb-4" style="color: var(--color-text-muted); font-family: var(--font-inter);">
                Offer your services and join our trusted network
              </p>
              <ul class="list-unstyled text-start mb-4">
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-primary-green);">•</span>
                  <span style="font-family: var(--font-inter);">Flexible schedule</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-primary-green);">•</span>
                  <span style="font-family: var(--font-inter);">Competitive pay</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-primary-green);">•</span>
                  <span style="font-family: var(--font-inter);">Support & training</span>
                </li>
                <li class="mb-2 d-flex align-items-center">
                  <span class="me-2" style="color: var(--color-primary-green);">•</span>
                  <span style="font-family: var(--font-inter);">Grow your business</span>
                </li>
              </ul>
              <div class="d-grid gap-2">
                <AppButton variant="btn btn-primary-green py-3 text-decoration-none" @click="$router.push('/join/detail')">
                  Detailed Questionnaire
                </AppButton>
                <AppButton variant="btn btn-outline-secondary py-3 text-decoration-none" @click="$router.push('/join/quick-register')">
                  Quick Register
                </AppButton>
              </div>
            </AppCard>
          </div>
        </div>

        <!-- Bottom Link -->
        <div class="text-center">
          <p style="color: var(--color-text-muted); font-family: var(--font-inter);">
            Already have an account? 
            <NuxtLink to="/join/signin" class="text-decoration-none" style="color: var(--color-primary-green);">Sign in here</NuxtLink>
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
</script>
