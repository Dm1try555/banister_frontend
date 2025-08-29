<template>
  <div class="admin-settings">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h1 class="h3 mb-1" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-text-dark);">
          Настройки системы
        </h1>
        <p class="text-muted mb-0" style="font-family: var(--font-inter);">
          Управление системными настройками и конфигурацией
        </p>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-primary" @click="refreshSettings">
          <Icon name="heroicons:arrow-path" size="16" class="me-2" />
          Обновить
        </button>
        <button class="btn btn-primary" @click="saveAllSettings" :disabled="saving">
          <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
          <Icon v-else name="heroicons:check" size="16" class="me-2" />
          Сохранить все
        </button>
      </div>
    </div>

    <!-- Settings Tabs -->
    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            class="list-group-item list-group-item-action"
            :class="{ active: activeTab === tab.id }"
            @click="activeTab = tab.id"
          >
            <Icon :name="tab.icon" size="20" class="me-2" />
            {{ tab.name }}
          </button>
        </div>
      </div>
      
      <div class="col-md-9">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="tab-content">
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pb-0">
              <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Общие настройки
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Название платформы</label>
                  <input v-model="settings.general.platform_name" type="text" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email поддержки</label>
                  <input v-model="settings.general.support_email" type="email" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Телефон поддержки</label>
                  <input v-model="settings.general.support_phone" type="tel" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Время работы</label>
                  <input v-model="settings.general.working_hours" type="text" class="form-control" />
                </div>
                <div class="col-12">
                  <label class="form-label">Описание платформы</label>
                  <textarea v-model="settings.general.description" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Payment Settings -->
        <div v-if="activeTab === 'payments'" class="tab-content">
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pb-0">
              <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Настройки платежей
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Комиссия платформы (%)</label>
                  <input v-model="settings.payments.platform_fee" type="number" step="0.01" min="0" max="100" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Минимальная сумма вывода (£)</label>
                  <input v-model="settings.payments.min_withdrawal" type="number" step="0.01" min="0" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Максимальная сумма вывода (£)</label>
                  <input v-model="settings.payments.max_withdrawal" type="number" step="0.01" min="0" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Лимит вывода в день (£)</label>
                  <input v-model="settings.payments.daily_withdrawal_limit" type="number" step="0.01" min="0" class="form-control" />
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.payments.auto_approve_withdrawals" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Автоматическое одобрение выводов</label>
                  </div>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Notification Settings -->
        <div v-if="activeTab === 'notifications'" class="tab-content">
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pb-0">
              <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Настройки уведомлений
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.notifications.email_notifications" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Email уведомления</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.notifications.push_notifications" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Push уведомления</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.notifications.sms_notifications" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">SMS уведомления</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email отправителя</label>
                  <input v-model="settings.notifications.sender_email" type="email" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Имя отправителя</label>
                  <input v-model="settings.notifications.sender_name" type="text" class="form-control" />
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- Security Settings -->
        <div v-if="activeTab === 'security'" class="tab-content">
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pb-0">
              <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Настройки безопасности
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Время жизни токена (минуты)</label>
                  <input v-model="settings.security.token_lifetime" type="number" min="1" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Максимальное количество попыток входа</label>
                  <input v-model="settings.security.max_login_attempts" type="number" min="1" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Время блокировки (минуты)</label>
                  <input v-model="settings.security.lockout_duration" type="number" min="1" class="form-control" />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Минимальная длина пароля</label>
                  <input v-model="settings.security.min_password_length" type="number" min="1" class="form-control" />
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.security.require_2fa" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Требовать двухфакторную аутентификацию</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-check">
                    <input v-model="settings.security.require_email_verification" class="form-check-input" type="checkbox" />
                    <label class="form-check-label">Требовать верификацию email</label>
                  </div>
                </div>
              </div>
            </div>
          </AppCard>
        </div>

        <!-- System Settings -->
        <div v-if="activeTab === 'system'" class="tab-content">
          <AppCard customClass="border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pb-0">
              <h5 class="card-title mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Системные настройки
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">Режим отладки</label>
                  <select v-model="settings.system.debug_mode" class="form-select">
                    <option value="true">Включен</option>
                    <option value="false">Выключен</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Режим обслуживания</label>
                  <select v-model="settings.system.maintenance_mode" class="form-select">
                    <option value="false">Выключен</option>
                    <option value="true">Включен</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Часовой пояс</label>
                  <select v-model="settings.system.timezone" class="form-select">
                    <option value="UTC">UTC</option>
                    <option value="Europe/London">London</option>
                    <option value="Europe/Moscow">Moscow</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Язык по умолчанию</label>
                  <select v-model="settings.system.default_language" class="form-select">
                    <option value="en">English</option>
                    <option value="ru">Русский</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label">Сообщение о техническом обслуживании</label>
                  <textarea v-model="settings.system.maintenance_message" class="form-control" rows="3"></textarea>
                </div>
              </div>
            </div>
          </AppCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Meta
definePageMeta({
  middleware: 'admin-auth'
})

// State
const activeTab = ref('general')
const saving = ref(false)

const tabs = [
  { id: 'general', name: 'Общие', icon: 'heroicons:cog-6-tooth' },
  { id: 'payments', name: 'Платежи', icon: 'heroicons:banknotes' },
  { id: 'notifications', name: 'Уведомления', icon: 'heroicons:bell' },
  { id: 'security', name: 'Безопасность', icon: 'heroicons:shield-check' },
  { id: 'system', name: 'Система', icon: 'heroicons:computer-desktop' }
]

const settings = ref({
  general: {
    platform_name: 'Banister',
    support_email: 'support@banister.com',
    support_phone: '+44 20 1234 5678',
    working_hours: '9:00 - 18:00 (GMT)',
    description: 'Платформа для поиска и заказа услуг'
  },
  payments: {
    platform_fee: 5.0,
    min_withdrawal: 10.0,
    max_withdrawal: 10000.0,
    daily_withdrawal_limit: 5000.0,
    auto_approve_withdrawals: false
  },
  notifications: {
    email_notifications: true,
    push_notifications: true,
    sms_notifications: false,
    sender_email: 'noreply@banister.com',
    sender_name: 'Banister'
  },
  security: {
    token_lifetime: 60,
    max_login_attempts: 5,
    lockout_duration: 15,
    min_password_length: 8,
    require_2fa: false,
    require_email_verification: true
  },
  system: {
    debug_mode: 'false',
    maintenance_mode: 'false',
    timezone: 'UTC',
    default_language: 'en',
    maintenance_message: 'Система временно недоступна. Мы работаем над улучшением сервиса.'
  }
})

// Methods
const refreshSettings = () => {
  // This would load settings from the backend
  
}

const saveAllSettings = async () => {
  saving.value = true
  try {
    // This would save settings to the backend
    
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Show success message
    alert('Настройки успешно сохранены!')
  } catch (error) {
    console.error('Ошибка сохранения настроек:', error)
    alert('Ошибка при сохранении настроек')
  } finally {
    saving.value = false
  }
}

// Lifecycle
onMounted(() => {
  refreshSettings()
})
</script>

<style scoped>
.admin-settings {
  padding: 2rem 0;
}

.list-group-item {
  border: 1px solid #dee2e6;
  border-radius: 8px !important;
  margin-bottom: 0.5rem;
  transition: all 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.list-group-item.active {
  background-color: var(--color-primary-green);
  border-color: var(--color-primary-green);
  color: white;
}

.tab-content {
  min-height: 400px;
}

.form-control:focus {
  border-color: var(--color-primary-green);
  box-shadow: 0 0 0 0.2rem rgba(34, 197, 94, 0.25);
}

.form-select:focus {
  border-color: var(--color-primary-green);
  box-shadow: 0 0 0 0.2rem rgba(34, 197, 94, 0.25);
}

.form-check-input:checked {
  background-color: var(--color-primary-green);
  border-color: var(--color-primary-green);
}
</style>
