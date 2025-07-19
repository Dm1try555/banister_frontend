<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Documents Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Your Documents
          </h2>
  
          <div class="list-group document-list">
            <div v-for="(doc, index) in documents" :key="index" class="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 rounded" style="background-color: #f8f9fa;">
              <div class="d-flex align-items-center">
                <Icon :name="doc.icon" size="24" style="color: var(--color-primary-green);" class="me-3" />
                <div>
                  <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">{{ doc.name }}</h6>
                  <small style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">{{ doc.date }} • {{ doc.size }}</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" @click="viewDocument(doc.url)" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                  View
                </button>
                <button class="btn btn-sm btn-primary-green" @click="downloadDocument(doc.url)" style="font-family: var(--font-inter); font-size: 0.85rem;">
                  Download
                </button>
              </div>
            </div>
            <div v-if="documents.length === 0" class="text-center text-muted py-4" style="font-family: var(--font-inter);">
              No documents available.
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
  
  const documents = ref([
    {
      name: 'Service Agreement 2024',
      icon: 'heroicons:document-text',
      date: '2024-01-01',
      size: '150 KB',
      url: '/documents/service-agreement-2024.pdf', // Placeholder URL
    },
    {
      name: 'Invoice #20240115',
      icon: 'heroicons:receipt-percent',
      date: '2024-01-15',
      size: '50 KB',
      url: '/documents/invoice-20240115.pdf', // Placeholder URL
    },
    {
      name: 'Privacy Policy',
      icon: 'heroicons:shield-check',
      date: '2023-05-01',
      size: '200 KB',
      url: '/documents/privacy-policy.pdf', // Placeholder URL
    },
  ]);
  
  const viewDocument = (url) => {
    alert(`Viewing document: ${url}`);
    // In a real application, you would open this in a new tab or a modal
    window.open(url, '_blank');
  };
  
  const downloadDocument = (url) => {
    alert(`Downloading document: ${url}`);
    // In a real application, you would trigger a download
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // Get filename from URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
  
  .list-group-item {
    border: 1px solid #e9ecef;
    transition: all 0.2s ease;
  }
  
  .list-group-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
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
  