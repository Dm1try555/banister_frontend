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
  
          <!-- Service Details Form Card -->
          <div class="card border-0 shadow-sm p-4 p-md-5" style="background-color: white; border-radius: 16px;">
            <div class="card-body">
              <h2 class="mb-4" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600; font-size: 1.75rem;">
                Service Details
              </h2>
  
              <form>
                <div class="row mb-4 g-3">
                  <!-- Location -->
                  <div class="col-md-6">
                    <label for="location" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Location</label>
                    <div class="input-group">
                      <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:geo-alt" /></span>
                      <input type="text" class="form-control" id="location" placeholder="Enter your address" style="font-family: var(--font-inter);">
                    </div>
                  </div>
                  <!-- Preferred Date -->
                  <div class="col-md-6">
                    <label for="preferredDate" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Preferred Date</label>
                    <div class="input-group">
                      <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:calendar" /></span>
                      <input type="text" class="form-control" id="preferredDate" placeholder="dd/mm/yyyy" style="font-family: var(--font-inter);">
                    </div>
                  </div>
                </div>
  
                <div class="row mb-4 g-3">
                  <!-- Preferred Time -->
                  <div class="col-md-6">
                    <label for="preferredTime" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Preferred Time</label>
                    <div class="input-group">
                      <span class="input-group-text" style="background-color: white; border-right: none;"><Icon name="bi:clock" /></span>
                      <select class="form-select" id="preferredTime" style="font-family: var(--font-inter);">
                        <option selected>Select time</option>
                        <option value="morning">Morning</option>
                        <option value="afternoon">Afternoon</option>
                        <option value="evening">Evening</option>
                      </select>
                    </div>
                  </div>
                  <!-- Service Frequency -->
                  <div class="col-md-6">
                    <label for="serviceFrequency" class="form-label" style="font-family: var(--font-inter); font-weight: 500;">Service Frequency</label>
                    <select class="form-select" id="serviceFrequency" style="font-family: var(--font-inter);">
                      <option selected>Select frequency</option>
                      <option value="one-time">One-time</option>
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </div>
  
                <!-- Buttons -->
                <div class="d-flex justify-content-between gap-3 mt-5">
                  <NuxtLink to="/book-service/select" class="btn btn-outline-secondary py-3 px-5 flex-grow-1 text-decoration-none" style="font-family: var(--font-inter); font-weight: 500;">
                    Back
                  </NuxtLink>
                  <button type="submit" class="btn btn-primary-green py-3 px-5 flex-grow-1" style="font-family: var(--font-inter); font-weight: 500;">
                    Find Providers
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
 
  