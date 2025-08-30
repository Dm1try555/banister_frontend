<template>
  <div class="d-flex flex-column flex-grow-1">
    <AppCard customClass="border-0 shadow-sm p-4" :customStyle="'background-color: white; border-radius: 16px;'">
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
              <AppButton variant="btn btn-outline-secondary btn-sm" customStyle="font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                View Details
              </AppButton>
              <AppButton variant="btn btn-outline-secondary btn-sm" customStyle="font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                Modify
              </AppButton>
              <AppButton variant="btn btn-danger btn-sm" customStyle="font-size: 0.85rem;">
                Cancel
              </AppButton>
            </div>
          </div>
          <div v-if="activeBookings.length === 0" class="text-center text-muted py-4" style="font-family: var(--font-inter);">
            No active bookings found.
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>

<script setup>
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'customer-dashboard' })

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
])

const api = useApi()
const bookings = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    bookings.value = await api.get('/bookings/')
  } catch (e) {
    error.value = 'Ошибка загрузки бронирований'
  } finally {
    loading.value = false
  }
})
</script>
  
  
