  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useApi } from '~/utils/api'
  import { definePageMeta } from '#imports'
  definePageMeta({ layout: 'customer-dashboard' })
  const api = useApi()
  const payments = ref([])
  const loading = ref(true)
  const error = ref('')

  onMounted(async () => {
    try {
      const response = await api.get('payments/')
      if (response) {
        payments.value = response
      }
    } catch (e) {
      console.error('Error loading payments:', e)
      error.value = 'Error loading payments'
    } finally {
      loading.value = false
    }
  })
  </script>

<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Payment History Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Payment History
          </h2>
  
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <div v-else-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          
          <div v-else-if="payments.length === 0" class="text-center text-muted py-4">
            No payment history available.
          </div>
          
          <div v-else class="table-responsive">
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
                <tr v-for="(payment, index) in payments" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ payment.date || 'No date' }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ payment.description || 'No description' }}</td>
                  <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">{{ payment.amount || 'N/A' }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: payment.statusColor || '#6c757d', color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ payment.status || 'Unknown' }}
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

  
 
  
