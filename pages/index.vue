<!-- <script setup>
import { useFetch } from '#app';

const apiData = await useFetch('https://your-django-api-endpoint/');
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
        <Icon name="heroicons:arrow-right-end-on-rectangle" class="mx-5" />
        <NuxtLink to="/join" class="btn-outline-secondary px-4 py-2 text-decoration-none">
          Sign Up
        </NuxtLink>
      </div>
    </nav>

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
            <button class="btn btn-nav-primary create-profile-btn btn-large-text d-flex align-items-center justify-content-center"
            style="width: 200px; font-weight: 700;">
            Create Profile
            <Icon name="heroicons:arrow-right" class="ms-2" style="width: 22px; height: 22px;" />
          </button>
          <button class="btn-outline-secondary learn-more btn-large-text" 
          style="width: 150px;">
            Learn More
          </button>
        </div>

        <!-- Features -->
        <div class="features row justify-content-center text-center mb-5 py-5">
          <div class="feature col-6 col-md-3 mb-4">
            <div class="icon-circle d-flex align-items-center justify-content-center mx-auto mb-4">
              <Icon name="bi:shield" style="width: 36px; height: 36px; color: #2d5016;" />
            </div>
            <p class="feature-text" >
              Personal Interviews &<br />Background Checks
            </p>
          </div>
          
          <div class="feature col-6 col-md-3 mb-4">
            <div class="icon-circle d-flex align-items-center justify-content-center mx-auto mb-4">
              <Icon name="bi:people" style="width: 36px; height: 36px; color: #2d5016;" />
            </div>
            <p class="feature-text">
              Multilingual Support &<br />Human Care
            </p>
          </div>
          
          <div class="feature col-6 col-md-3 mb-4">
            <div class="icon-circle d-flex align-items-center justify-content-center mx-auto mb-4">
              <Icon name="bi:lock" style="width: 36px; height: 36px; color: #2d5016;" />
            </div>
            <p class="feature-text">
              Secure, Transparent<br />Platform
            </p>
          </div>
          
          <div class="feature col-6 col-md-3 mb-4">
            <div class="icon-circle d-flex align-items-center justify-content-center mx-auto mb-4">
              <Icon name="bi:heart" style="width: 36px; height: 36px; color: #2d5016;" />
            </div>
            <p class="feature-text">
              Fair Employment & Dignity
            </p>
          </div>
        </div>

        <!-- Search Bar - увеличенный -->
        <div class="search-bar d-flex justify-content-center align-items-center">
          <div class="d-flex" style="max-width: 700px; width: 100%;">
            <input type="text" class="form-control border-end-0 search-input-large"
                   placeholder="I'm looking for..." />
            <button class="btn btn-nav-primary find-providers search-btn-large d-flex align-items-center justify-content-center" style="margin-left: 20px; width: 400px; font-weight: 700;">
              <Icon name="heroicons:magnifying-glass" class="me-2" style="width: 22px; height: 22px;" />
              Find Service Providers
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Floating Chat Button -->
    <div class="position-fixed bottom-0 end-0 p-4">
      <button class="btn btn-nav-primary rounded-circle p-3 shadow d-flex align-items-center justify-content-center" 
              style="width: 65px; height: 65px;">
        <Icon name="heroicons:chat-bubble-left-right" style="width: 26px; height: 26px;" />
      </button>
    </div>
  </div>
</template>

