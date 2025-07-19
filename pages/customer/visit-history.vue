<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Completed Services Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Completed Services
          </h2>
  
          <div class="table-responsive">
            <table class="table table-borderless visit-history-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Date</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Client</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Service</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Duration</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Rating</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(service, index) in completedServices" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.date }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.client }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.service }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.duration }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: service.statusColor, color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ service.status }}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <Icon v-for="star in 5" :key="star" 
                            :name="star <= service.rating ? 'heroicons:star-solid' : 'heroicons:star'" 
                            size="16" 
                            :style="{ color: star <= service.rating ? '#FFD700' : '#e9ecef' }" 
                            class="me-1" />
                    </div>
                  </td>
                  <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">{{ service.earnings }}</td>
                </tr>
              </tbody>
            </table>
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
  
  const completedServices = ref([
    {
      date: '10/01/2024',
      client: 'Sarah Johnson',
      service: 'House Cleaning',
      duration: '3 hours',
      status: 'Completed',
      statusColor: '#28a745', // Green for completed
      rating: 5,
      earnings: '$120'
    },
    {
      date: '08/01/2024',
      client: 'Michael Brown',
      service: 'Garden Maintenance',
      duration: '2 hours',
      status: 'Completed',
      statusColor: '#28a745',
      rating: 4,
      earnings: '$80'
    },
    {
      date: '05/01/2024',
      client: 'Emily Davis',
      service: 'Deep Cleaning',
      duration: '4 hours',
      status: 'Completed',
      statusColor: '#28a745',
      rating: 5,
      earnings: '$150'
    }
  ]);
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
  
  /* Table specific styles */
  .visit-history-table th,
  .visit-history-table td {
    padding: 1rem; /* Adjust padding for table cells */
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef; /* Light border between rows */
  }
  
  .visit-history-table thead th {
    border-bottom: 2px solid #e9ecef; /* Slightly thicker border for header */
    font-weight: 600;
    padding-bottom: 1.2rem;
  }
  
  .visit-history-table tbody tr:last-child td {
    border-bottom: none; /* No border for the last row */
  }
  
  .badge {
    padding: 0.5em 0.75em;
    font-size: 0.85em;
    font-weight: 600;
  }
  
  /* Responsive adjustments */
  @media (max-width: 767.98px) {
    .table-responsive {
      border: 1px solid #e9ecef; /* Add border for responsive table on small screens */
      border-radius: 8px;
    }
    .visit-history-table th,
    .visit-history-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
    .badge {
      font-size: 0.75em;
    }
  }
  </style>
  