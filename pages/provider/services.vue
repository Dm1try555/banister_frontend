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
const services = ref([])

onMounted(async () => {
  try {
    const data = await api.get('services/')
          log.api.response('GET', 'services', data)
    
    // Handle different response formats
    let servicesData = []
    if (Array.isArray(data)) {
      servicesData = data
    } else if (data && Array.isArray(data.results)) {
      servicesData = data.results
    } else if (data && Array.isArray(data.data)) {
      servicesData = data.data
    } else if (data && typeof data === 'object') {
      servicesData = Object.values(data).find(val => Array.isArray(val)) || []
    }
    
    services.value = servicesData
  } catch (e) {
    error.value = 'Ошибка загрузки услуг'
    console.error('Services loading error:', e)
    services.value = []
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="row g-4">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Мои услуги
        </h2>
        <AppButton variant="btn btn-primary-green">
          <Icon name="heroicons:plus" size="16" class="me-2" />
          Добавить услугу
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

    <div v-else-if="services.length === 0" class="col-12 text-center py-5">
      <Icon name="heroicons:wrench-screwdriver" size="64" class="text-muted mb-3" />
      <h4 class="mb-2" style="font-family: var(--font-inter); color: var(--color-text-dark);">
        У вас пока нет услуг
      </h4>
      <p class="text-muted" style="font-family: var(--font-inter);">
        Добавьте свои услуги, чтобы начать получать заказы
      </p>
      <AppButton variant="btn btn-primary-green">
        <Icon name="heroicons:plus" size="16" class="me-2" />
        Добавить первую услугу
      </AppButton>
    </div>

    <div v-else class="col-12">
      <div class="row g-4">
        <div v-for="service in services" :key="service.id" class="col-md-6 col-lg-4">
          <AppCard customClass="border-0 shadow-sm h-100" :customStyle="'background-color: white; border-radius: 16px;'">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-3">
                <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                  {{ service.name }}
                </h5>
                <span class="badge rounded-pill" :class="{
                  'bg-success': service.status === 'active',
                  'bg-warning': service.status === 'pending',
                  'bg-secondary': service.status === 'inactive'
                }">
                  {{ service.status }}
                </span>
              </div>
              
              <p class="text-muted mb-3" style="font-family: var(--font-inter);">
                {{ service.description }}
              </p>
              
              <div class="d-flex justify-content-between align-items-center mb-3">
                <span class="h5 mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">
                  £{{ service.price.toFixed(2) }}
                </span>
                <span class="text-muted" style="font-family: var(--font-inter); font-size: 0.9rem;">
                  {{ service.duration }} мин
                </span>
              </div>
              
              <div class="d-flex gap-2">
                <AppButton variant="btn btn-sm btn-outline-primary flex-fill">
                  Редактировать
                </AppButton>
                <AppButton variant="btn btn-sm btn-outline-secondary">
                  <Icon name="heroicons:eye" size="16" />
                </AppButton>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template> 