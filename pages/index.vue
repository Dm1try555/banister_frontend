<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Hero Section -->
    <main class="hero text-center py-5 flex-grow-1 d-flex flex-column justify-content-center bg-beige">
      <div class="container-fluid px-4">
        <!-- Main Heading - увеличенный размер -->
        <h1 class="hero-title mb-4">
          Trusted Home Staff at Your Service
        </h1>
        <!-- Subtitle - увеличенный размер -->
        <p class="hero-subtitle mb-5">
          Hire vetted domestic professionals and manage your household with ease - long term.
        </p>
        <!-- CTA Buttons - увеличенные -->
        <div class="hero-buttons mb-5 d-flex flex-column flex-sm-row justify-content-center gap-4">
          <AppButton
            variant="btn-nav-primary create-profile-btn btn-large-text d-flex align-items-center justify-content-center text-decoration-none"
            :customStyle="{ width: '200px', fontWeight: 700 }"
            @click="$router.push('/join/sign')"
          >
            Create Profile
            <template #icon>
              <Icon name="heroicons:arrow-right" class="ms-2" style="width: 22px; height: 22px;" />
            </template>
          </AppButton>
          <AppButton
            variant="btn-outline-secondary learn-more btn-large-text text-decoration-none d-flex align-items-center justify-content-center"
            :customStyle="{ width: '150px' }"
            @click="$router.push('/join/signin')"
          >
            Learn More
          </AppButton>
        </div>
        <!-- Features -->
        <div class="features row justify-content-center text-center mb-5 py-5">
          <div class="feature col-6 col-md-3 mb-4">
            <FeatureSectionInline
              icon="bi:shield"
              :iconSize="36"
              :iconStyle="{ color: '#2d5016' }"
              title=""
              description="Personal Interviews &<br />Background Checks"
            />
          </div>
          <div class="feature col-6 col-md-3 mb-4">
            <FeatureSectionInline
              icon="bi:people"
              :iconSize="36"
              :iconStyle="{ color: '#2d5016' }"
              title=""
              description="Multilingual Support &<br />Human Care"
            />
          </div>
          <div class="feature col-6 col-md-3 mb-4">
            <FeatureSectionInline
              icon="bi:lock"
              :iconSize="36"
              :iconStyle="{ color: '#2d5016' }"
              title=""
              description="Secure, Transparent<br />Platform"
            />
          </div>
          <div class="feature col-6 col-md-3 mb-4">
            <FeatureSectionInline
              icon="bi:heart"
              :iconSize="36"
              :iconStyle="{ color: '#2d5016' }"
              title=""
              description="Fair Employment & Dignity"
            />
          </div>
        </div>
        <!-- Search Bar - увеличенный -->
        <div class="search-bar d-flex justify-content-center align-items-center">
          <div class="d-flex align-items-center gap-2" style="max-width: 700px; width: 100%;">
            <input
              type="text"
              class="form-control border-end-0 search-input-large"
              placeholder="I'm looking for..."
              style="height: 50px;"
            />
            <AppButton
              variant="btn-nav-primary find-providers search-btn-large d-flex align-items-center justify-content-center"
              :customStyle="{ width: '400px', fontWeight: 700, height: '50px' }"
            >
              <template #icon>
                <Icon name="heroicons:magnifying-glass" class="me-2" style="width: 22px; height: 22px;" />
              </template>
              Find Service Providers
            </AppButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import FeatureSectionInline from '@/components/common/FeatureSectionInline.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
</script>

