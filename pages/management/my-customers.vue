<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Top Row of Metric Cards -->
      <div class="row g-4 mb-4">
        <!-- Active Customers Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h6 class="mb-2" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Active Customers</h6>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.activeCustomers }}</h4>
            </div>
          </div>
        </div>
  
        <!-- Monthly Revenue Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h6 class="mb-2" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Monthly Revenue</h6>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">£{{ metrics.monthlyRevenue.toFixed(2) }}</h4>
            </div>
          </div>
        </div>
  
        <!-- Open Issues Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <h6 class="mb-2" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Open Issues</h6>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: #dc3545;">{{ metrics.openIssues }}</h4>
            </div>
          </div>
        </div>
      </div>
  
      <!-- My Customer Portfolio Card -->
      <div class="card border-0 shadow-sm p-4 flex-grow-1" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            My Customer Portfolio
          </h2>
  
          <div class="table-responsive">
            <table class="table table-borderless customer-portfolio-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Customer</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Service</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Next Appointment</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Monthly Value</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Last Contact</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(customer, index) in myCustomers" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.name }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.service }}</td>
                  <td>
                    <div style="font-family: var(--font-inter); color: var(--color-text-dark); font-size: 0.9rem;">
                      <Icon name="heroicons:calendar" size="14" class="me-1" style="color: var(--color-text-muted);" />{{ customer.nextAppointmentDate }}
                    </div>
                    <div style="font-family: var(--font-inter); color: var(--color-text-dark); font-size: 0.9rem;">
                      <Icon name="heroicons:clock" size="14" class="me-1" style="color: var(--color-text-muted);" />{{ customer.nextAppointmentTime }}
                    </div>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                    <Icon name="heroicons:wallet" size="14" class="me-1" style="color: var(--color-text-muted);" />£{{ customer.monthlyValue.toFixed(2) }}
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.lastContact }}</td>
                  <td>
                    <div class="d-flex gap-2">
                      <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                        <Icon name="heroicons:chat-bubble-left-right" size="16" class="me-1" />
                        Message
                      </button>
                      <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                        <Icon name="heroicons:calendar" size="16" class="me-1" />
                        Schedule
                      </button>
                    </div>
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
    layout: 'management-dashboard'
  });
  
  const metrics = ref({
    activeCustomers: 2,
    monthlyRevenue: 205.00,
    openIssues: 1,
  });
  
  const myCustomers = ref([
    {
      name: 'Sarah Johnson',
      service: 'Cleaning',
      nextAppointmentDate: '2024-01-20',
      nextAppointmentTime: '10:00',
      monthlyValue: 120.00,
      lastContact: '2024-01-15',
    },
    {
      name: 'David Thompson',
      service: 'Gardening',
      nextAppointmentDate: '2024-01-22',
      nextAppointmentTime: '14:00',
      monthlyValue: 85.00,
      lastContact: '2024-01-14',
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
  
  .customer-portfolio-table th,
  .customer-portfolio-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef;
  }
  
  .customer-portfolio-table thead th {
    border-bottom: 2px solid #e9ecef;
    font-weight: 600;
    padding-bottom: 1.2rem;
  }
  
  .customer-portfolio-table tbody tr:last-child td {
    border-bottom: none;
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
    .col-lg-4 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .table-responsive {
      border: 1px solid #e9ecef;
      border-radius: 8px;
    }
    .customer-portfolio-table th,
    .customer-portfolio-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
    .customer-portfolio-table td .d-flex.gap-2 {
      flex-direction: column;
      gap: 0.5rem !important;
    }
    .customer-portfolio-table td .btn {
      width: 100%;
    }
  }
  </style>
  