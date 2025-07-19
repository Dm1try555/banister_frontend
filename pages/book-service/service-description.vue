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
        <div class="container px-4 px-md-0" style="max-width: 1000px;">
          <!-- Header -->
          <div class="text-center mb-5">
            <h1 class="mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 700; font-size: 2.5rem;">
              Professional Maid Services
            </h1>
            <p class="lead" style="color: var(--color-text-muted); font-family: var(--font-inter); font-size: 1.15rem;">
              Experienced, vetted professionals for all your house cleaning needs
            </p>
          </div>
  
          <!-- Content Sections -->
          <div class="row g-5 justify-content-center">
            <!-- What's Included Section -->
            <div class="col-md-6 col-lg-5">
              <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
                What's Included
              </h2>
              <ul class="list-unstyled service-features">
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Thorough cleaning</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Attention to details</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Eco-friendly products</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Flexible scheduling</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Background-checked professionals</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Quality guarantee</span>
                </li>
                <li class="d-flex align-items-center mb-3">
                  <Icon name="bi:check-circle" size="20" style="color: var(--color-pink);" class="me-2" />
                  <span style="font-family: var(--font-inter); color: var(--color-text-dark);">Insurance coverage</span>
                </li>
              </ul>
            </div>
  
            <!-- Service Details Card -->
            <div class="col-md-6 col-lg-5">
              <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
                <div class="card-body">
                  <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
                    Service Details
                  </h2>
                  <div class="d-flex align-items-center mb-3">
                    <Icon name="bi:clock" size="24" style="color: var(--color-pink);" class="me-3" />
                    <div>
                      <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Duration</h5>
                      <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">From 2 hours depending on home size</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <Icon name="bi:currency-pound" size="24" style="color: var(--color-pink);" class="me-3" />
                    <div>
                      <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Pricing</h5>
                      <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">£27 per hour</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center mb-3">
                    <Icon name="bi:shield-check" size="24" style="color: var(--color-pink);" class="me-3" />
                    <div>
                      <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Verification</h5>
                      <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">Background checked & insured</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <Icon name="bi:star" size="24" style="color: var(--color-pink);" class="me-3" />
                    <div>
                      <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Quality</h5>
                      <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.95rem;">100% satisfaction guarantee</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Find Your Professional Button -->
          <div class="text-center mt-5">
            <NuxtLink to="/find-professional" class="btn btn-primary-green py-3 px-5 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
              Find your professional
            </NuxtLink>
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
    --color-text-dark: #343a40; /* Добавлен для основного текста */
    --color-border: #dee2e6;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .bg-beige {
    background-color: var(--color-beige);
  }
  
  /* Общие стили для кнопок, если они не определены глобально */
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
  
  /* Responsive adjustments */
  @media (max-width: 767.98px) {
    h1 {
      font-size: 2rem !important;
    }
    .lead {
      font-size: 1rem !important;
    }
    h2 {
      font-size: 1.5rem !important;
    }
    .service-features li span,
    .card-body h5,
    .card-body p {
      font-size: 0.9rem !important;
    }
    .btn-primary-green {
      width: 100%;
      max-width: 250px;
    }
  }
  </style>
  