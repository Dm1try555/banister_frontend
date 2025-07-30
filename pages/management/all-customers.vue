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
                <tr v-for="(customer, index) in customers" :key="index">
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
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'management-dashboard' })

const api = useApi()
const customers = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    customers.value = await api.get('management/customers/')
  } catch (e) {
    error.value = 'Ошибка загрузки клиентов'
  } finally {
    loading.value = false
  }
})
</script>
  

  