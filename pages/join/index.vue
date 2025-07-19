<!-- <script setup>
import { useFetch } from '#app';

const apiData = useFetch('https://your-django-api-endpoint/');
</script> -->

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
            <div class="card h-100 border-0 shadow-sm" style="background-color: white; border-radius: 16px;">
              <div class="card-body p-4 text-center">
                <!-- Icon -->
                <div class="mb-4">
                  <div class="d-inline-flex justify-content-center align-items-center" 
                       style="width: 80px; height: 80px; background-color: #fce4ec; border-radius: 50%;">
                    <Icon name="bi:person" size="40" style="color: var(--color-pink);" />
                  </div>
                </div>
                
                <!-- Title -->
                <h3 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                  Hire Personnel
                </h3>
                
                <!-- Subtitle -->
                <p class="mb-4" style="color: var(--color-text-muted); font-family: var(--font-inter);">
                  Find reliable home service providers
                </p>
                
                <!-- Features List -->
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
                
                <!-- Buttons -->
                <div class="d-grid gap-2">
                  <NuxtLink to="/join/detail" class="btn btn-primary-green py-3 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
                    Detailed Questionnaire
                  </NuxtLink>
                  <NuxtLink to="/join/quick-register" class="btn btn-outline-secondary py-3 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
                    Quick Sign Up
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- Join the Team Card -->
          <div class="col-md-5">
            <div class="card h-100 border-0 shadow-sm" style="background-color: white; border-radius: 16px;">
              <div class="card-body p-4 text-center">
                <!-- Icon -->
                <div class="mb-4">
                  <div class="d-inline-flex justify-content-center align-items-center" 
                       style="width: 80px; height: 80px; background-color: #fce4ec; border-radius: 50%;">
                    <Icon name="bi:people" size="40" style="color: var(--color-pink);" />
                  </div>
                </div>
                
                <!-- Title -->
                <h3 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
                  Join the Team
                </h3>
                
                <!-- Subtitle -->
                <p class="mb-4" style="color: var(--color-text-muted); font-family: var(--font-inter);">
                  Become a service provider
                </p>
                
                <!-- Features List -->
                <ul class="list-unstyled text-start mb-4">
                  <li class="mb-2 d-flex align-items-center">
                    <span class="me-2" style="color: var(--color-pink);">•</span>
                    <span style="font-family: var(--font-inter);">Fair compensation</span>
                  </li>
                  <li class="mb-2 d-flex align-items-center">
                    <span class="me-2" style="color: var(--color-pink);">•</span>
                    <span style="font-family: var(--font-inter);">Job security</span>
                  </li>
                  <li class="mb-2 d-flex align-items-center">
                    <span class="me-2" style="color: var(--color-pink);">•</span>
                    <span style="font-family: var(--font-inter);">Professional support</span>
                  </li>
                  <li class="mb-2 d-flex align-items-center">
                    <span class="me-2" style="color: var(--color-pink);">•</span>
                    <span style="font-family: var(--font-inter);">Growth opportunities</span>
                  </li>
                </ul>
                
                <!-- Buttons -->
                <div class="d-grid gap-2">
                  <NuxtLink to="/join/detail" class="btn btn-primary-green py-3 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
                    Detailed Questionnaire
                  </NuxtLink>
                  <NuxtLink to="/join/quick-register" class="btn btn-outline-secondary py-3 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
                    Quick Sign Up
                  </NuxtLink>
                </div>
              </div>
            </div>
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
