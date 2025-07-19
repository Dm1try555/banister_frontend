<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Customer Database Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Customer Database
          </h2>
  
          <div class="mb-4">
            <input type="text" class="form-control" placeholder="Search customers..." style="font-family: var(--font-inter);">
          </div>
  
          <div class="table-responsive">
            <table class="table table-borderless customer-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Name</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Contact</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Service</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Provider</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Last Payment</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(customer, index) in allCustomers" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.name }}</td>
                  <td>
                    <div style="font-family: var(--font-inter); color: var(--color-text-dark); font-size: 0.9rem;">
                      <Icon name="heroicons:envelope" size="14" class="me-1" style="color: var(--color-text-muted);" />{{ customer.email }}
                    </div>
                    <div style="font-family: var(--font-inter); color: var(--color-text-dark); font-size: 0.9rem;">
                      <Icon name="heroicons:phone" size="14" class="me-1" style="color: var(--color-text-muted);" />{{ customer.phone }}
                    </div>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.service }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ customer.provider }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: customer.statusColor, color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ customer.status }}
                    </span>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                    <span style="font-weight: 600; color: var(--color-primary-green);">{{ customer.lastPaymentAmount }}</span><br>
                    <small class="text-muted">{{ customer.lastPaymentDate }}</small>
                  </td>
                  <td>
                    <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                      <Icon name="heroicons:eye" size="16" class="me-1" />
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
    layout: 'management-dashboard'
  });
  
  const allCustomers = ref([
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.co.uk',
      phone: '+44 7700 900123',
      service: 'Cleaning',
      provider: 'Maria Rodriguez',
      status: 'Active',
      statusColor: '#28a745', // Green
      lastPaymentAmount: '£120.00',
      lastPaymentDate: '2024-01-15',
    },
    {
      name: 'David Thompson',
      email: 'david.thompson@email.co.uk',
      phone: '+44 7700 900124',
      service: 'Gardening',
      provider: 'James Wilson',
      status: 'Active',
      statusColor: '#28a745',
      lastPaymentAmount: '£85.00',
      lastPaymentDate: '2024-01-14',
    },
    {
      name: 'Emma Davies',
      email: 'emma.davies@email.co.uk',
      phone: '+44 7700 900125',
      service: 'Nanny',
      provider: 'Sophie Anderson',
      status: 'Pending',
      statusColor: '#ffc107', // Yellow
      lastPaymentAmount: '£200.00',
      lastPaymentDate: '2024-01-10',
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
  
  .form-control {
    font-family: var(--font-inter);
    border-color: var(--color-border);
  }
  
  .form-control:focus {
    border-color: var(--color-primary-green);
    box-shadow: 0 0 0 0.2rem rgba(45, 80, 22, 0.25);
  }
  
  .customer-table th,
  .customer-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef;
  }
  
  .customer-table thead th {
    border-bottom: 2px solid #e9ecef;
    font-weight: 600;
    padding-bottom: 1.2rem;
  }
  
  .customer-table tbody tr:last-child td {
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
    .customer-table th,
    .customer-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
    .badge {
      font-size: 0.75em;
    }
    .customer-table td:nth-child(2) { /* Contact column */
      font-size: 0.8rem !important;
    }
  }
  </style>
  