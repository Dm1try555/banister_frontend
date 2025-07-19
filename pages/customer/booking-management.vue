<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Booking Management Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Active Bookings
          </h2>
  
          <div class="list-group booking-list">
            <div v-for="(booking, index) in activeBookings" :key="index" class="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 rounded" style="background-color: #f8f9fa;">
              <div>
                <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">{{ booking.service }} with {{ booking.provider }}</h6>
                <p class="mb-1" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">Date: {{ booking.date }} at {{ booking.time }}</p>
                <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">Status: 
                  <span class="badge rounded-pill" :style="{ backgroundColor: booking.statusColor, color: 'white', fontFamily: 'var(--font-inter)' }">
                    {{ booking.status }}
                  </span>
                </p>
              </div>
              <div class="d-flex gap-2 flex-wrap justify-content-end">
                <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                  View Details
                </button>
                <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                  Modify
                </button>
                <button class="btn btn-sm btn-danger" style="font-family: var(--font-inter); font-size: 0.85rem;">
                  Cancel
                </button>
              </div>
            </div>
            <div v-if="activeBookings.length === 0" class="text-center text-muted py-4" style="font-family: var(--font-inter);">
              No active bookings found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  
  const activeBookings = ref([
    {
      service: 'Maid Service',
      provider: 'Maria Rodriguez',
      date: '2024-02-01',
      time: '10:00 AM',
      status: 'Confirmed',
      statusColor: '#28a745',
    },
    {
      service: 'Gardener',
      provider: 'John Smith',
      date: '2024-02-05',
      time: '09:00 AM',
      status: 'Pending',
      statusColor: '#ffc107',
    },
    {
      service: 'Chef Service',
      provider: 'Chef Antoine',
      date: '2024-02-10',
      time: '06:00 PM',
      status: 'Confirmed',
      statusColor: '#28a745',
    },
  ]);
  </script>
  
  <style scoped>
  /* Используем существующие CSS переменные */
  :root {
    --color-primary-green: #2d5016;
    --color-primary-green-hover: #1a3009;
    --color-secondary-green: #d4f4dd;
    --color-pink: #ff6b9d;
    --color-beige: #f5f1eb;
    --color-text-muted: #6c757d;
    --color-text-dark: #343a40;
    --color-border: #dee2e6;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .list-group-item {
    border: 1px solid #e9ecef;
    transition: all 0.2s ease;
  }
  
  .list-group-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
  
  .badge {
    padding: 0.5em 0.75em;
    font-size: 0.85em;
    font-weight: 600;
  }
  
  .btn-outline-secondary {
    background-color: #e9ecef;
    border-color: #e9ecef;
    color: var(--color-text-dark);
    transition: all 0.3s ease;
  }
  
  .btn-outline-secondary:hover {
    background-color: #d4d8dc;
    border-color: #d4d8dc;
  }
  
  .btn-danger {
    background-color: #dc3545;
    border-color: #dc3545;
    color: white;
    transition: all 0.3s ease;
  }
  
  .btn-danger:hover {
    background-color: #c82333;
    border-color: #bd2130;
  }
  
  @media (max-width: 767.98px) {
    .list-group-item {
      flex-direction: column;
      align-items: flex-start !important;
    }
    .list-group-item > div:first-child {
      margin-bottom: 0.5rem;
    }
    .list-group-item .btn {
      width: 100%;
      margin-bottom: 0.5rem;
    }
    .list-group-item .d-flex.gap-2 {
      width: 100%;
      justify-content: stretch !important;
    }
  }
  </style>
  