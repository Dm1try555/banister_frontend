# Примеры использования API

## Базовое использование

### 1. Аутентификация

```typescript
// В компоненте Vue
<script setup>
import { useAuthApi } from '~/composables/useAuthApi'

const { login, register, logout, user, isAuthenticated, loading } = useAuthApi()

// Вход в систему
const handleLogin = async () => {
  try {
    await login({
      username_or_email: 'user@example.com',
      password: 'password123'
    })
    // Пользователь автоматически сохранится в состоянии
    console.log('Пользователь вошел:', user.value)
  } catch (error) {
    console.error('Ошибка входа:', error)
  }
}

// Регистрация
const handleRegister = async () => {
  try {
    await register({
      username: 'newuser',
      email: 'newuser@example.com',
      first_name: 'John',
      last_name: 'Doe',
      password: 'password123',
      password_confirm: 'password123',
      role: 'customer'
    })
    console.log('Регистрация успешна')
  } catch (error) {
    console.error('Ошибка регистрации:', error)
  }
}
</script>

<template>
  <div>
    <div v-if="isAuthenticated">
      <p>Добро пожаловать, {{ user?.first_name }}!</p>
      <button @click="logout">Выйти</button>
    </div>
    <div v-else>
      <button @click="handleLogin" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
    </div>
  </div>
</template>
```

### 2. Работа с сервисами

```typescript
<script setup>
import { useServicesApi } from '~/composables/useServicesApi'

const { 
  getServices, 
  createService, 
  services, 
  loading, 
  pagination 
} = useServicesApi()

// Загрузка сервисов
const loadServices = async () => {
  try {
    await getServices({ page: 1 })
    console.log('Сервисы загружены:', services.value)
  } catch (error) {
    console.error('Ошибка загрузки сервисов:', error)
  }
}

// Создание нового сервиса
const handleCreateService = async () => {
  try {
    await createService({
      title: 'Новый сервис',
      description: 'Описание сервиса',
      price: '100.00'
    })
    console.log('Сервис создан')
  } catch (error) {
    console.error('Ошибка создания сервиса:', error)
  }
}

// Поиск сервисов
const searchServices = async (searchTerm: string) => {
  try {
    await getServices({ search: searchTerm })
  } catch (error) {
    console.error('Ошибка поиска:', error)
  }
}
</script>

<template>
  <div>
    <input 
      @input="searchServices($event.target.value)" 
      placeholder="Поиск сервисов..."
    />
    
    <div v-if="loading">Загрузка...</div>
    
    <div v-else>
      <div v-for="service in services" :key="service.id">
        <h3>{{ service.title }}</h3>
        <p>{{ service.description }}</p>
        <p>Цена: ${{ service.price }}</p>
      </div>
      
      <div v-if="pagination.next">
        <button @click="getServices({ page: 2 })">
          Загрузить еще
        </button>
      </div>
    </div>
  </div>
</template>
```

### 3. Работа с бронированиями

```typescript
<script setup>
import { useBookingsApi } from '~/composables/useBookingsApi'

const { 
  getBookings, 
  createBooking, 
  updateBooking,
  bookings, 
  loading 
} = useBookingsApi()

// Создание бронирования
const handleCreateBooking = async (serviceId: number) => {
  try {
    await createBooking({
      service: serviceId,
      preferred_date: '2024-01-15',
      preferred_time: '10:00',
      notes: 'Дополнительные пожелания'
    })
    console.log('Бронирование создано')
  } catch (error) {
    console.error('Ошибка создания бронирования:', error)
  }
}

// Обновление статуса бронирования
const handleUpdateBooking = async (bookingId: number) => {
  try {
    await updateBooking(bookingId, {
      status: 'confirmed',
      scheduled_datetime: '2024-01-15T10:00:00Z'
    })
    console.log('Бронирование обновлено')
  } catch (error) {
    console.error('Ошибка обновления бронирования:', error)
  }
}
</script>
```

### 4. Работа с платежами

```typescript
<script setup>
import { usePaymentsApi } from '~/composables/usePaymentsApi'

const { 
  createPayment, 
  confirmPayment, 
  transferPayment,
  loading 
} = usePaymentsApi()

// Создание платежа
const handleCreatePayment = async (bookingId: number, amount: string) => {
  try {
    const payment = await createPayment({
      booking: bookingId,
      amount: amount
    })
    console.log('Платеж создан:', payment)
  } catch (error) {
    console.error('Ошибка создания платежа:', error)
  }
}

// Подтверждение платежа через Stripe
const handleConfirmPayment = async (paymentIntentId: string) => {
  try {
    const result = await confirmPayment({
      payment_intent_id: paymentIntentId
    })
    console.log('Платеж подтвержден:', result)
  } catch (error) {
    console.error('Ошибка подтверждения платежа:', error)
  }
}

// Перевод средств провайдеру
const handleTransferPayment = async (providerStripeAccount: string) => {
  try {
    const result = await transferPayment({
      provider_stripe_account: providerStripeAccount
    })
    console.log('Перевод выполнен:', result)
  } catch (error) {
    console.error('Ошибка перевода:', error)
  }
}
</script>
```

### 5. Использование главного API composable

```typescript
<script setup>
import { useApi } from '~/composables/useApi'

const { auth, bookings, services, payments } = useApi()

// Комплексная операция: создание сервиса, бронирования и платежа
const handleCompleteBooking = async () => {
  try {
    // 1. Создаем сервис
    const service = await services.createService({
      title: 'Уборка квартиры',
      description: 'Полная уборка 2-комнатной квартиры',
      price: '150.00'
    })
    
    // 2. Создаем бронирование
    const booking = await bookings.createBooking({
      service: service.id,
      preferred_date: '2024-01-20',
      preferred_time: '14:00'
    })
    
    // 3. Создаем платеж
    const payment = await payments.createPayment({
      booking: booking.id,
      amount: '150.00'
    })
    
    console.log('Полный процесс завершен:', { service, booking, payment })
  } catch (error) {
    console.error('Ошибка в процессе:', error)
  }
}
</script>
```

### 6. Прямое использование API сервисов

```typescript
<script setup>
import { authApi, bookingsApi, servicesApi } from '~/api/services'

// Прямое использование без composables
const handleDirectApiCall = async () => {
  try {
    // Вход
    const loginResponse = await authApi.login({
      username_or_email: 'user@example.com',
      password: 'password123'
    })
    
    // Получение сервисов
    const servicesResponse = await servicesApi.getServices({ page: 1 })
    
    // Создание бронирования
    const bookingResponse = await bookingsApi.createBooking({
      service: servicesResponse.results[0].id,
      preferred_date: '2024-01-15'
    })
    
    console.log('Результаты:', { loginResponse, servicesResponse, bookingResponse })
  } catch (error) {
    console.error('Ошибка API:', error)
  }
}
</script>
```

### 7. Обработка ошибок

```typescript
<script setup>
import { useAuthApi } from '~/composables/useAuthApi'

const { login, error, loading } = useAuthApi()

const handleLogin = async () => {
  try {
    await login({
      username_or_email: 'wrong@email.com',
      password: 'wrongpassword'
    })
  } catch (error) {
    // Ошибка автоматически обрабатывается в composable
    // и сохраняется в error.value
    console.log('Ошибка входа:', error.value)
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="handleLogin">
      <!-- Поля формы -->
      
      <!-- Отображение ошибки -->
      <div v-if="error" class="alert alert-danger">
        {{ error }}
      </div>
      
      <button type="submit" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>
    </form>
  </div>
</template>
```

### 8. Работа с типами

```typescript
<script setup lang="ts">
import type { 
  User, 
  Booking, 
  Service, 
  Payment,
  LoginResponse,
  PaginatedResponse 
} from '~/api/types'

// Типизированные данные
const user = ref<User | null>(null)
const bookings = ref<Booking[]>([])
const services = ref<Service[]>([])

// Типизированные функции
const handleLogin = async (): Promise<LoginResponse | null> => {
  // ... логика входа
}

const loadServices = async (): Promise<PaginatedResponse<Service> | null> => {
  // ... логика загрузки сервисов
}
</script>
```

## Лучшие практики

1. **Используйте composables** для автоматического управления состоянием
2. **Обрабатывайте ошибки** через try-catch блоки
3. **Используйте типы TypeScript** для безопасности типов
4. **Проверяйте состояние загрузки** перед показом UI
5. **Используйте пагинацию** для больших списков данных
6. **Кэшируйте данные** когда это возможно
7. **Обрабатывайте состояния аутентификации** правильно