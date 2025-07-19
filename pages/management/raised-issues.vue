<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Top Row of Metric Cards -->
      <div class="row g-4 mb-4">
        <!-- High Priority Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">High Priority</h6>
                <Icon name="heroicons:exclamation-triangle" size="20" style="color: #dc3545;" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: #dc3545;">{{ metrics.highPriority }}</h4>
            </div>
          </div>
        </div>
  
        <!-- In Progress Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">In Progress</h6>
                <Icon name="heroicons:clock" size="20" style="color: #ffc107;" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.inProgress }}</h4>
            </div>
          </div>
        </div>
  
        <!-- Total Issues Card -->
        <div class="col-md-6 col-lg-4">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Total Issues</h6>
                <Icon name="heroicons:users" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.totalIssues }}</h4>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Open Issues Table -->
      <div class="card border-0 shadow-sm p-4 flex-grow-1" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Open Issues
          </h2>
  
          <div class="table-responsive">
            <table class="table table-borderless issues-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Issue</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Customer</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Provider</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Priority</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Category</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Date</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(issue, index) in openIssues" :key="index">
                  <td>
                    <div style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">{{ issue.title }}</div>
                    <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">{{ issue.description }}</p>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ issue.customer }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ issue.provider }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: getPriorityColor(issue.priority), color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ issue.priority }}
                    </span>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ issue.category }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: getStatusColor(issue.status), color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ issue.status }}
                    </span>
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ issue.date }}</td>
                  <td>
                    <div class="d-flex gap-2">
                      <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                        Assign
                      </button>
                      <button class="btn btn-sm btn-primary-green" style="font-family: var(--font-inter); font-size: 0.85rem;">
                        Resolve
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
    highPriority: 1,
    inProgress: 1,
    totalIssues: 3, // Assuming total issues include open and fixed
  });
  
  const openIssues = ref([
    {
      title: 'Service Provider Late',
      description: 'Provider arrived 30 minutes late without notice',
      customer: 'Sarah Johnson',
      provider: 'Maria Rodriguez',
      priority: 'High',
      category: 'Service Quality',
      status: 'Open',
      date: '2024-01-15',
    },
    {
      title: 'Payment Issue',
      description: 'Customer disputes last month\'s charges',
      customer: 'David Thompson',
      provider: 'James Wilson',
      priority: 'Medium',
      category: 'Billing',
      status: 'In Progress',
      date: '2024-01-14',
    },
  ]);
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#dc3545'; // Red
      case 'Medium': return '#ffc107'; // Yellow
      case 'Low': return '#17a2b8'; // Info blue
      default: return '#6c757d'; // Muted
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return '#dc3545'; // Red
      case 'In Progress': return '#ffc107'; // Yellow
      case 'Resolved': return '#28a745'; // Green
      default: return '#6c757d'; // Muted
    }
  };
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
  
  .bg-beige {
    background-color: var(--color-beige);
  }
  
  /* Metric Cards */
  .card-body h4 {
    font-size: 1.75rem;
  }
  
  /* Issues Table */
  .issues-table th,
  .issues-table td {
    padding: 1rem;
    vertical-align: middle;
    border-bottom: 1px solid #e9ecef;
  }
  
  .issues-table thead th {
    border-bottom: 2px solid #e9ecef;
    font-weight: 600;
    padding-bottom: 1.2rem;
  }
  
  .issues-table tbody tr:last-child td {
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
    .col-lg-4 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .table-responsive {
      border: 1px solid #e9ecef;
      border-radius: 8px;
    }
    .issues-table th,
    .issues-table td {
      padding: 0.75rem 0.5rem;
      font-size: 0.85rem;
    }
    .badge {
      font-size: 0.75em;
    }
    .issues-table td .d-flex.gap-2 {
      flex-direction: column;
      gap: 0.5rem !important;
    }
    .issues-table td .btn {
      width: 100%;
    }
  }
  </style>
  