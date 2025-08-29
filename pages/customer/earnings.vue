<template>
  <div class="d-flex flex-column flex-grow-1">
    <!-- Top Row of Metric Cards -->
    <div class="row g-4 mb-4">
      <div class="col-md-6 col-lg-3" v-for="(metric, idx) in metrics" :key="idx">
        <AppCard customClass="h-100 border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-between align-items-center mb-2">
              <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">{{ metric.title }}</h6>
              <Icon :name="metric.icon" size="20" :style="{ color: 'var(--color-text-muted)' }" />
            </div>
            <h4 class="mb-1" :style="{ fontFamily: 'var(--font-inter)', fontWeight: 700, color: metric.color }">{{ metric.value }}</h4>
            <p class="mb-0" style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">{{ metric.desc }}</p>
          </div>
        </AppCard>
      </div>
    </div>
    <div class="row g-4 flex-grow-1">
      <!-- Withdrawal Card -->
      <div class="col-lg-6 d-flex">
        <AppCard customClass="flex-grow-1 withdrawal-card" :customStyle="'background-color: white; border-radius: 16px; border: 2px dashed #e9ecef;'">
          <div class="card-body d-flex flex-column align-items-center justify-content-center text-center">
            <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Withdrawal
            </h2>
            <Icon name="heroicons:wallet" size="64" style="color: var(--color-primary-green);" class="mb-3" />
            <h4 class="mb-2" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">$1250.75 Available</h4>
            <p class="mb-4" style="font-family: var(--font-inter); font-size: 0.9rem; color: var(--color-text-muted);">Withdrawals are processed weekly on Mondays</p>
            <AppButton variant="btn btn-primary-green py-3 px-5" customStyle="font-family: var(--font-inter); font-weight: 500;">
              Request Withdrawal
            </AppButton>
            <small class="mt-3" style="font-family: var(--font-inter); font-size: 0.75rem; color: var(--color-text-muted);">Last withdrawal: 2024-01-15 • Next available: 2024-01-22</small>
          </div>
        </AppCard>
      </div>
      <!-- Upcoming Earnings Card -->
      <div class="col-lg-6 d-flex">
        <AppCard customClass="flex-grow-1" :customStyle="'background-color: white; border-radius: 16px;'">
          <div class="card-body d-flex flex-column">
            <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Upcoming Earnings
            </h2>
            <div class="upcoming-earnings-list flex-grow-1">
              <div v-for="(earning, index) in upcomingEarnings" :key="index" class="d-flex justify-content-between align-items-center py-2 px-3 mb-2 rounded" style="background-color: #f8f9fa;">
                <div>
                  <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">{{ earning.name }}</h6>
                  <small style="font-family: var(--font-inter); font-size: 0.8rem; color: var(--color-text-muted);">{{ earning.date }}</small>
                </div>
                <span style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">${{ earning.amount.toFixed(2) }}</span>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center pt-3 mt-3 border-top" style="border-color: #e9ecef !important;">
              <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">Total Pending:</h6>
              <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">${{ totalPendingEarnings.toFixed(2) }}</h6>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'customer-dashboard' })

const metrics = [
  { title: 'Current Balance', icon: 'heroicons:wallet', value: '$1250.75', color: 'var(--color-primary-green)', desc: 'Available for withdrawal' },
  { title: 'Pending Earnings', icon: 'heroicons:calendar', value: '$825.50', color: '#FFC107', desc: 'From upcoming bookings' },
  { title: 'This Month', icon: 'heroicons:chart-bar', value: '$2100.25', color: 'var(--color-primary-green)', desc: '+12% from last month' },
  { title: 'Weekly Withdrawals', icon: 'heroicons:currency-dollar', value: 'Available', color: 'var(--color-primary-green)', desc: 'Next: 2024-01-22' },
]

const upcomingEarnings = ref([
  { name: 'Sarah Johnson', date: '2024-01-20', amount: 120.00 },
  { name: 'Mike Chen', date: '2024-01-21', amount: 90.00 },
  { name: 'Lisa Davis', date: '2024-01-22', amount: 150.00 },
  { name: 'Tom Wilson', date: '2024-01-23', amount: 110.00 },
  { name: 'Emily White', date: '2024-01-24', amount: 95.50 },
  { name: 'David Lee', date: '2024-01-25', amount: 100.00 },
  { name: 'Anna Kim', date: '2024-01-26', amount: 160.00 },
])

const totalPendingEarnings = computed(() => {
  return upcomingEarnings.value.reduce((sum, item) => sum + item.amount, 0)
})
</script>

<style scoped>
.withdrawal-card {
  border: 2px dashed #e9ecef !important;
}
</style>
  
