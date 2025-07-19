<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Top Row of Metric Cards -->
      <div class="row g-4 mb-4">
        <!-- Current Balance Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Current Balance</h6>
                <Icon name="heroicons:wallet" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">$1250.75</h4>
              <p class="mb-0" style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">Available for withdrawal</p>
            </div>
          </div>
        </div>
  
        <!-- Pending Earnings Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Pending Earnings</h6>
                <Icon name="heroicons:calendar" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: #FFC107;">$825.50</h4>
              <p class="mb-0" style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">From upcoming bookings</p>
            </div>
          </div>
        </div>
  
        <!-- This Month Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">This Month</h6>
                <Icon name="heroicons:chart-bar" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">$2100.25</h4>
              <p class="mb-0" style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">+12% from last month</p>
            </div>
          </div>
        </div>
  
        <!-- Weekly Withdrawals Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Weekly Withdrawals</h6>
                <Icon name="heroicons:currency-dollar" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">Available</h4>
              <p class="mb-0" style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">Next: 2024-01-22</p>
            </div>
          </div>
        </div>
      </div>
  
      <div class="row g-4 flex-grow-1">
        <!-- Withdrawal Card -->
        <div class="col-lg-6 d-flex">
          <div class="card border-0 shadow-sm p-4 flex-grow-1 withdrawal-card" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
              <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Withdrawal
              </h2>
              <Icon name="heroicons:wallet" size="64" style="color: var(--color-primary-green);" class="mb-3" />
              <h4 class="mb-2" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">$1250.75 Available</h4>
              <p class="mb-4" style="font-family: var(--font-inter); font-size: 0.9rem; color: var(--color-text-muted);">Withdrawals are processed weekly on Mondays</p>
              <button class="btn btn-primary-green py-3 px-5" style="font-family: var(--font-inter); font-weight: 500;">
                Request Withdrawal
              </button>
              <small class="mt-3" style="font-family: var(--font-inter); font-size: 0.75rem; color: var(--color-text-muted);">Last withdrawal: 2024-01-15 • Next available: 2024-01-22</small>
            </div>
          </div>
        </div>
  
        <!-- Upcoming Earnings Card -->
        <div class="col-lg-6 d-flex">
          <div class="card border-0 shadow-sm p-4 flex-grow-1" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column">
              <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Upcoming Earnings
              </h2>
              <div class="upcoming-earnings-list flex-grow-1">
                <div v-for="(earning, index) in upcomingEarnings" :key="index" class="d-flex justify-content-between align-items-center py-2 px-3 mb-2 rounded" style="background-color: #f8f9fa;">
                  <div>
                    <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">{{ earning.name }}</h6>
                    <small style="font-family: var(--font-inter); font-size: 0.8rem; color: var(--color-text-muted);">{{ earning.date }}</small>
                  </div>
                  <span style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">${{ earning.amount.toFixed(2) }}</span>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center pt-3 mt-3 border-top" style="border-color: #e9ecef !important;">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">Total Pending:</h6>
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">${{ totalPendingEarnings.toFixed(2) }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  
  const upcomingEarnings = ref([
    { name: 'Sarah Johnson', date: '2024-01-20', amount: 120.00 },
    { name: 'Mike Chen', date: '2024-01-21', amount: 90.00 },
    { name: 'Lisa Davis', date: '2024-01-22', amount: 150.00 },
    { name: 'Tom Wilson', date: '2024-01-23', amount: 110.00 },
    { name: 'Emily White', date: '2024-01-24', amount: 95.50 },
    { name: 'David Lee', date: '2024-01-25', amount: 100.00 },
    { name: 'Anna Kim', date: '2024-01-26', amount: 160.00 },
  ]);
  
  const totalPendingEarnings = computed(() => {
    return upcomingEarnings.value.reduce((sum, item) => sum + item.amount, 0);
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
  
  /* Custom dashed border for withdrawal card */
  .withdrawal-card {
    border: 2px dashed #e9ecef !important; /* Light gray dashed border */
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
    .col-lg-3, .col-lg-6 {
      flex: 0 0 100%; /* Stack columns on smaller screens */
      max-width: 100%;
    }
    .withdrawal-card .btn {
      width: 100%; /* Full width button on small screens */
    }
  }
  </style>
  