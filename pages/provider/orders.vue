<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
import { log } from '~/utils/logger'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

definePageMeta({ layout: 'provider-dashboard' })

const api = useApi()
const loading = ref(true)
const error = ref('')
const orders = ref([])
const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'Все заказы' },
  { key: 'pending', label: 'Ожидающие' },
  { key: 'in_progress', label: 'В работе' },
  { key: 'completed', label: 'Завершенные' },
  { key: 'cancelled', label: 'Отмененные' }
]

onMounted(async () => {
  await loadOrders()
})

const loadOrders = async () => {
  loading.value = true
  try {
    const data = await api.get('/bookings/')
          log.api.response('GET', 'orders', data)
    
    // Handle different response formats
    let ordersData = []
    if (Array.isArray(data)) {
      ordersData = data
    } else if (data && Array.isArray(data.results)) {
      ordersData = data.results
    } else if (data && Array.isArray(data.data)) {
      ordersData = data.data
    } else if (data && typeof data === 'object') {
      ordersData = Object.values(data).find(val => Array.isArray(val)) || []
    }
    
    orders.value = ordersData
  } catch (e) {
    error.value = 'Ошибка загрузки заказов'
    console.error('Orders loading error:', e)
    orders.value = []
  } finally {
    loading.value = false
  }
}

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') {
    return orders.value
  }
  return orders.value.filter(order => order.status === activeFilter.value)
})
</script>

<template>
  <div class="row g-4">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Заказы
        </h2>
      </div>
    </div>

    <!-- Фильтры -->
    <div class="col-12">
      <div class="d-flex gap-2 flex-wrap">
        <AppButton 
          v-for="filter in filters" 
          :key="filter.key"
          variant="btn btn-sm"
          :customClass="activeFilter === filter.key ? 'btn-primary' : 'btn-outline-secondary'"
          @click="activeFilter = filter.key"
        >
          {{ filter.label }}
        </AppButton>
      </div>
    </div>

    <div v-if="loading" class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="col-12">
      <div class="alert alert-danger">{{ error }}</div>
    </div>

    <div v-else-if="filteredOrders.length === 0" class="col-12 text-center py-5">
      <Icon name="heroicons:clipboard-document-list" size="64" class="text-muted mb-3" />
      <h4 class="mb-2" style="font-family: var(--font-inter); color: var(--color-text-dark);">
        Заказов пока нет
      </h4>
      <p class="text-muted" style="font-family: var(--font-inter);">
        Когда появятся новые заказы, они отобразятся здесь
      </p>
    </div>

    <div v-else class="col-12">
      <div class="row g-4">
        <div v-for="order in filteredOrders" :key="order.id" class="col-12">
          <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                    {{ order.customerName }}
                  </h6>
                  <p class="mb-0 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">
                    {{ order.customerEmail }}
                  </p>
                </div>
                
                <div class="col-md-3">
                  <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                    {{ order.serviceName }}
                  </h6>
                  <p class="mb-0 text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">
                    {{ order.date }} в {{ order.time }}
                  </p>
                </div>
                
                <div class="col-md-2">
                  <span class="badge rounded-pill" :class="{
                    'bg-success': order.status === 'completed',
                    'bg-warning': order.status === 'pending',
                    'bg-info': order.status === 'in_progress',
                    'bg-danger': order.status === 'cancelled'
                  }">
                    {{ order.status }}
                  </span>
                </div>
                
                <div class="col-md-2">
                  <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">
                    £{{ order.amount.toFixed(2) }}
                  </h6>
                </div>
                
                <div class="col-md-2">
                  <div class="d-flex gap-2">
                    <AppButton variant="btn btn-sm btn-outline-primary">
                      Просмотр
                    </AppButton>
                    <AppButton v-if="order.status === 'pending'" variant="btn btn-sm btn-success">
                      Принять
                    </AppButton>
                  </div>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template> 