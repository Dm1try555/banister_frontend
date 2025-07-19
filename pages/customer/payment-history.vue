<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Payment History Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Payment History
          </h2>
  
          <div class="table-responsive">
            <table class="table table-borderless payment-history-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Date</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Description</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Amount</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Invoice</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(payment, index) in paymentHistory" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ payment.date }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ payment.description }}</td>
                  <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">{{ payment.amount }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: payment.statusColor, color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ payment.status }}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                      <Icon name="heroicons:document-arrow-down" size="16" class="me-1" />
                      View
                    </button>
                  </td>
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
  
  const paymentHistory = ref([
    {
      date: '2024-01-15',
      description: 'Maid Service - Jan 10',
      amount: '£120.00',
      status: 'Paid',
      statusColor: '#28a745', // Green
    },
    {
      date: '2024-01-08',
      description: 'Gardener Service - Jan 05',
      amount: '£80.00',
      status: 'Paid',
      statusColor: '#28a745',
    },
    {
      date: '2023-12-28',
      description: 'Deep Cleaning - Dec 20',
      amount: '£150.00',
      status: 'Paid',
      statusColor: '#28a745',
    },
    {
      date: '2023-12-20',
      description: 'Chauffeur Service - Dec 18',
      amount: '£60.00',
      status: 'Pending',
      statusColor: '#ffc107', // Yellow
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
  
  .payment-history-table th,
  .payment-history-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef;
  }
  
  .payment-history-table thead th {
    border-bottom: 2px solid #e9ecef;
    font-weight: 600;
    padding-bottom: 1.2rem;
  }
  
  .payment-history-table tbody tr:last-child td {
    border-bottom: none;
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
  
  @media (max-width: 767.98px) {
    .table-responsive {
      border: 1px solid #e9ecef;
      border-radius: 8px;
    }
    .payment-history-table th,
    .payment-history-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
    .badge {
      font-size: 0.75em;
    }
  }
  </style>
  