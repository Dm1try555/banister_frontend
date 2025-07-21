  
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
      payments.value = await api.get('payments/')
    } catch (e) {
      error.value = 'Ошибка загрузки платежей'
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

  
 
  