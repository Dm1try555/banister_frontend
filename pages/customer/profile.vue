<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Personal Information Card -->
      <div class="card border-0 shadow-sm p-4 mb-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Personal Information
            </h2>
            <button class="btn btn-primary-green btn-sm px-4 py-2" style="font-family: var(--font-inter); font-weight: 500;">
              Edit
            </button>
          </div>
  
          <div class="row g-3">
            <!-- Full Name -->
            <div class="col-md-6">
              <label for="fullName" class="form-label profile-label">Full Name</label>
              <input type="text" class="form-control profile-input" id="fullName" value="John Smith" readonly>
            </div>
            <!-- Email -->
            <div class="col-md-6">
              <label for="email" class="form-label profile-label">Email</label>
              <input type="email" class="form-control profile-input" id="email" value="john.smith@email.co.uk" readonly>
            </div>
            <!-- Mobile Number -->
            <div class="col-md-6">
              <label for="mobileNumber" class="form-label profile-label">Mobile Number</label>
              <input type="text" class="form-control profile-input" id="mobileNumber" value="+44 7700 900123" readonly>
            </div>
            <!-- Preferred Schedule -->
            <div class="col-md-6">
              <label for="preferredSchedule" class="form-label profile-label">Preferred Schedule</label>
              <input type="text" class="form-control profile-input" id="preferredSchedule" value="Monday-Friday 9AM-5PM" readonly>
            </div>
            <!-- Address -->
            <div class="col-12">
              <label for="address" class="form-label profile-label">Address</label>
              <input type="text" class="form-control profile-input" id="address" value="123 Victoria Street, London SW1E 6DE" readonly>
            </div>
            <!-- Extra Information -->
            <div class="col-12">
              <label for="extraInfo" class="form-label profile-label">Extra Information</label>
              <textarea class="form-control profile-input" id="extraInfo" rows="2" readonly>Prefer eco-friendly cleaning products</textarea>
            </div>
            <!-- Special Requests -->
            <div class="col-12">
              <label for="specialRequests" class="form-label profile-label">Special Requests to Service Providers</label>
              <textarea class="form-control profile-input" id="specialRequests" rows="2" readonly>Please remove shoes before entering</textarea>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Payment Methods Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Payment Methods
            </h2>
            <button class="btn btn-primary-green btn-sm px-3 py-2 d-flex align-items-center" style="font-family: var(--font-inter); font-weight: 500;">
              <Icon name="heroicons:plus" size="16" class="me-1" />
              Add Card
            </button>
          </div>
  
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Automatic Payments</h6>
              <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">Automatically charge your default payment method for services</p>
            </div>
            <!-- Toggle Switch -->
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="automaticPaymentsSwitch" checked style="width: 40px; height: 20px;">
              <label class="form-check-label" for="automaticPaymentsSwitch" style="display: none;"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  </script>
  
  <style scoped>
  /* Используем существующие CSS переменные */
  :root {
    --color-primary-green: #2d5016;
    --color-primary-green-hover: #1a3009;
    --color-secondary-green: #d4f4dd; /* Светло-зеленый для активного элемента сайдбара */
    --color-pink: #ff6b9d;
    --color-beige: #f5f1eb;
    --color-text-muted: #6c757d;
    --color-text-dark: #343a40; /* Для основного текста и заголовков */
    --color-border: #dee2e6;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .bg-beige {
    background-color: var(--color-beige);
  }
  
  /* Profile specific styles */
  .profile-label {
    font-family: var(--font-inter);
    font-weight: 500;
    color: var(--color-text-dark);
    margin-bottom: 0.5rem;
    display: block; /* Ensure label is on its own line */
  }
  
  .profile-input {
    background-color: #f8f9fa; /* Light gray background for read-only inputs */
    border: 1px solid var(--color-border);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-family: var(--font-inter);
    color: var(--color-text-dark);
    cursor: default; /* Indicate it's not directly editable */
  }
  
  .profile-input:focus {
    outline: none;
    box-shadow: none; /* Remove default focus styles */
  }
  
  /* Custom toggle switch styling to match screenshot */
  .form-check-input:checked {
    background-color: var(--color-primary-green);
    border-color: var(--color-primary-green);
  }
  
  .form-check-input:focus {
    box-shadow: 0 0 0 0.25rem rgba(45, 80, 22, 0.25); /* Green focus ring */
  }
  
  /* Button styles (reused from previous components) */
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
  