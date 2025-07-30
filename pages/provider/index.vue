<script setup>
import { ref, onMounted, computed } from 'vue'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useDashboard } from '~/composables/useDashboard'
import { useBookings } from '~/composables/useBookings'
import { useServices } from '~/composables/useServices'

definePageMeta({ layout: 'provider-dashboard' })

const { 
  overview, 
  statistics, 
  isLoading: dashboardLoading, 
  error: dashboardError, 
  loadDashboard 
} = useDashboard()

const { 
  bookings, 
  isLoading: bookingsLoading, 
  error: bookingsError, 
  loadBookings 
} = useBookings()

const { 
  services, 
  isLoading: servicesLoading, 
  error: servicesError, 
  loadServices 
} = useServices()

// Computed properties for dashboard data
const dashboardData = computed(() => {
  try {
    const stats = overview.value || statistics.value
    const bookingsArray = Array.isArray(bookings.value) ? bookings.value : []
    const recentBookings = bookingsArray.slice(0, 5) // Get last 5 bookings
    
    return {
      totalEarnings: parseFloat(stats?.total_earnings || '0') || 0,
      completedOrders: bookingsArray.filter(b => b?.status === 'confirmed').length || 0,
      pendingOrders: bookingsArray.filter(b => b?.status === 'pending').length || 0,
      activeServices: Array.isArray(services.value) ? services.value.length : 0,
      recentOrders: recentBookings.map(booking => ({
        id: booking?.id || 0,
        customerName: (booking?.customer?.profile?.first_name || '') + ' ' + (booking?.customer?.profile?.last_name || ''),
        serviceName: booking?.service?.title || 'Unknown Service',
        status: booking?.status || 'unknown',
        amount: parseFloat(booking?.service?.price || '0') || 0
      })),
      upcomingAppointments: recentBookings
        .filter(booking => booking?.status === 'confirmed')
        .map(booking => ({
          id: booking?.id || 0,
          customerName: (booking?.customer?.profile?.first_name || '') + ' ' + (booking?.customer?.profile?.last_name || ''),
          serviceName: booking?.service?.title || 'Unknown Service',
          date: booking?.date ? new Date(booking.date).toLocaleDateString() : 'Unknown',
          time: booking?.date ? new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Unknown'
        }))
    }
  } catch (error) {
    console.error('Error in dashboardData computed:', error)
    return {
      totalEarnings: 0,
      completedOrders: 0,
      pendingOrders: 0,
      activeServices: 0,
      recentOrders: [],
      upcomingAppointments: []
    }
  }
})

const loading = computed(() => dashboardLoading.value || bookingsLoading.value || servicesLoading.value)
const error = computed(() => dashboardError.value || bookingsError.value || servicesError.value)

onMounted(async () => {
  try {
    // Load all dashboard data in parallel
    await Promise.all([
      loadDashboard(),
      loadBookings(),
      loadServices()
    ])
  } catch (e) {
    console.error('Dashboard loading error:', e)
  }
})
</script>

<template>
  <div class="row g-4">
    <!-- Статистика -->
    <div class="col-12">
      <div class="row g-3">
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:banknotes" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                £{{ (dashboardData.totalEarnings || 0).toFixed(2) }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Общий заработок</p>
            </div>
          </AppCard>
        </div>
        
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:check-circle" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                {{ dashboardData.completedOrders }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Выполненные заказы</p>
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
                {{ dashboardData.pendingOrders }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Ожидающие заказы</p>
            </div>
          </AppCard>
        </div>
        
        <div class="col-md-3">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body text-center">
              <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-white mb-3"
                   style="width: 60px; height: 60px;">
                <Icon name="heroicons:wrench-screwdriver" size="24" />
              </div>
              <h4 class="mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
                {{ dashboardData.activeServices }}
              </h4>
              <p class="mb-0 text-muted" style="font-family: var(--font-inter);">Активные услуги</p>
            </div>
          </AppCard>
        </div>
      </div>
    </div>

    <!-- Последние заказы -->
    <div class="col-lg-8">
      <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Последние заказы
            </h5>
            <NuxtLink to="/provider/orders" class="btn btn-outline-primary btn-sm">
              Посмотреть все
            </NuxtLink>
          </div>
          
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <div v-else-if="error" class="alert alert-danger">
            {{ error }}
          </div>
          
          <div v-else-if="dashboardData.recentOrders.length === 0" class="text-center py-4">
            <Icon name="heroicons:clipboard-document-list" size="48" class="text-muted mb-3" />
            <p class="text-muted" style="font-family: var(--font-inter);">Пока нет заказов</p>
          </div>
          
          <div v-else class="table-responsive">
            <table class="table table-borderless">
              <thead>
                <tr>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Клиент</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Услуга</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Статус</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Сумма</th>
                  <th style="font-family: var(--font-inter); color: var(--color-text-muted);">Действия</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in dashboardData.recentOrders" :key="order.id">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                    {{ order.customerName }}
                  </td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">
                    {{ order.serviceName }}
                  </td>
                  <td>
                    <span class="badge rounded-pill" :class="{
                      'bg-success': order.status === 'completed',
                      'bg-warning': order.status === 'pending',
                      'bg-info': order.status === 'in_progress'
                    }">
                      {{ order.status }}
                    </span>
                  </td>
                  <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">
                    £{{ order.amount.toFixed(2) }}
                  </td>
                  <td>
                    <AppButton variant="btn btn-sm btn-outline-primary">
                      Просмотр
                    </AppButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </AppCard>
    </div>

    <!-- Ближайшие встречи -->
    <div class="col-lg-4">
      <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Ближайшие встречи
            </h5>
            <NuxtLink to="/provider/calendar" class="btn btn-outline-primary btn-sm">
              Календарь
            </NuxtLink>
          </div>
          
          <div v-if="dashboardData.upcomingAppointments.length === 0" class="text-center py-4">
            <Icon name="heroicons:calendar" size="48" class="text-muted mb-3" />
            <p class="text-muted" style="font-family: var(--font-inter);">Нет запланированных встреч</p>
          </div>
          
          <div v-else class="d-flex flex-column gap-3">
            <div v-for="appointment in dashboardData.upcomingAppointments" :key="appointment.id" 
                 class="d-flex align-items-center p-3 rounded" 
                 style="background-color: #f8f9fa; border: 1px solid #e9ecef;">
              <div class="me-3">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                     style="width: 40px; height: 40px;">
                  <Icon name="heroicons:calendar" size="16" />
                </div>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                  {{ appointment.customerName }}
                </h6>
                <p class="mb-1" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">
                  {{ appointment.serviceName }}
                </p>
                <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.85rem;">
                  {{ appointment.date }} в {{ appointment.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template> 