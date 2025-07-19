<template>
    <div class="min-vh-100 d-flex flex-column bg-beige">
      <!-- Navigation (Optional, if you want to include it on this page) -->
      <!-- <nav class="navbar navbar-expand-lg p-3 bg-beige shadow-sm">
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
      </nav> -->
  
      <!-- Main Content -->
      <main class="flex-grow-1 d-flex flex-column justify-content-center align-items-center py-5">
        <div class="container px-4 px-md-0" style="max-width: 800px;">
          <!-- Header -->
          <div class="text-center mb-5">
            <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 2.5rem;">
              For Our Valued Customers
            </h1>
            <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.15rem;">
              Experience seamless household management with complete peace of mind.
            </p>
          </div>
  
          <!-- Information Blocks -->
          <div class="d-flex flex-column gap-3">
            <!-- Block 1 -->
            <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
              <Icon name="bi:person" size="24" style="color: var(--color-pink);" class="me-3" />
              <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
                Personalised provider matching and easy service management.
              </span>
            </div>
  
            <!-- Block 2 -->
            <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
              <Icon name="bi:check-circle" size="24" style="color: var(--color-pink);" class="me-3" />
              <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
                Confidence through verified professionals and consistent oversight.
              </span>
            </div>
  
            <!-- Block 3 -->
            <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
              <Icon name="bi:file-earmark-text" size="24" style="color: var(--color-pink);" class="me-3" />
              <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
                Transparent scheduling, secure payments, and clear communication.
              </span>
            </div>
  
            <!-- Block 4 -->
            <div class="info-block d-flex align-items-center p-4 rounded-3 shadow-sm">
              <Icon name="bi:heart" size="24" style="color: var(--color-pink);" class="me-3" />
              <span style="font-family: var(--font-inter); color: var(--color-text-muted);">
                Full peace of mind – from the moment of booking to completion.
              </span>
            </div>
          </div>
        </div>
      </main>
  
      <!-- Floating Chat Button -->
      <button class="floating-chat-btn d-flex justify-content-center align-items-center rounded-circle shadow-lg">
        <Icon name="bi:chat-dots" size="28" color="white" />
      </button>
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
  
  .info-block {
    background-color: white;
    border: 1px solid rgba(0, 0, 0, 0.05); /* Легкая рамка */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* Легкая тень */
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .info-block:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
  
  .floating-chat-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background-color: var(--color-primary-green);
    border: none;
    cursor: pointer;
    z-index: 1000;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .floating-chat-btn:hover {
    background-color: var(--color-primary-green-hover);
    transform: translateY(-2px);
  }
  
  /* Адаптивность для мобильных */
  @media (max-width: 767.98px) {
    .floating-chat-btn {
      width: 50px;
      height: 50px;
      bottom: 20px;
      right: 20px;
    }
    .floating-chat-btn .icon {
      font-size: 24px !important;
    }
    .info-block {
      padding: 1.25rem;
    }
    h1 {
      font-size: 2rem !important;
    }
    .lead {
      font-size: 1rem !important;
    }
  }
  </style>
  