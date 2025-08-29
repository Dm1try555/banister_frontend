<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

definePageMeta({ layout: 'provider-dashboard' })

const api = useApi()
const loading = ref(true)
const error = ref('')
const earnings = ref({
  totalEarnings: 0,
  thisMonth: 0,
  lastMonth: 0,
  pendingPayments: 0,
  completedOrders: 0,
  averageOrderValue: 0,
  transactions: []
})

onMounted(async () => {
  await loadEarnings()
})

const loadEarnings = async () => {
  loading.value = true
  try {
    const data = await api.get('dashboard/overview')
    // Set default values if data is not available
    earnings.value = {
      totalEarnings: data?.total_earnings || 0,
      thisMonth: data?.this_month || 0,
      pendingPayments: data?.pending_payments || 0,
      averageOrderValue: data?.average_order_value || 0,
      transactions: data?.transactions || []
    }
  } catch (e) {
    error.value = 'Failed to load earnings data'
    console.error('Earnings loading error:', e)
    // Set default values on error
    earnings.value = {
      totalEarnings: 0,
      thisMonth: 0,
      pendingPayments: 0,
      averageOrderValue: 0,
      transactions: []
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="row g-4">
    <div class="col-12">
      <h2 class="mb-4" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
        My Earnings
      </h2>
    </div>

    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="col-12">
      <div class="alert alert-danger">{{ error }}</div>
    </div>

    <div v-else class="col-12">
      <!-- Statistics -->
      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:banknotes" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                £{{ (Number(earnings.totalEarnings) || 0).toFixed(2) }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Total Earnings</p>
            </div>
          </AppCard>
        </div>
        
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:calendar" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                £{{ (earnings.thisMonth || 0).toFixed(2) }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">This Month</p>
            </div>
          </AppCard>
        </div>
        
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:clock" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                £{{ (earnings.pendingPayments || 0).toFixed(2) }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Pending Payments</p>
            </div>
          </AppCard>
        </div>
        
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:chart-bar" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                £{{ (earnings.averageOrderValue || 0).toFixed(2) }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Average Order</p>
            </div>
          </AppCard>
        </div>
      </div>

      <!-- Transaction History -->
      <div class="row">
        <div class="col-12">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                  Transaction History
                </h5>
                <AppButton variant="btn btn-outline-primary btn-sm">
                  Export
                </AppButton>
              </div>
              
              <div v-if="earnings.transactions.length === 0" class="text-center py-4">
                <Icon name="heroicons:banknotes" size="48" class="text-muted mb-3" />
                <p class="text-muted" style="font-family: var(--font-inter);">No transactions yet</p>
              </div>
              
              <div v-else class="table-responsive">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Date</th>
                      <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Client</th>
                      <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Service</th>
                      <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                      <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="transaction in earnings.transactions" :key="transaction.id">
                      <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                        {{ transaction.date }}
                      </td>
                      <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                        {{ transaction.customerName }}
                      </td>
                      <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                        {{ transaction.serviceName }}
                      </td>
                      <td>
                        <span class="badge rounded-pill" :class="{
                          'bg-success': transaction.status === 'completed',
                          'bg-warning': transaction.status === 'pending',
                          'bg-info': transaction.status === 'in_progress'
                        }">
                          {{ transaction.status }}
                        </span>
                      </td>
                      <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">
                        £{{ transaction.amount.toFixed(2) }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template> 