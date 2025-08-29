# API Documentation

Этот каталог содержит всю структуру API для проекта Banister, организованную по категориям и следуя лучшим практикам Nuxt 3.

## Структура

```
api/
├── types/           # TypeScript типы для всех моделей данных
├── services/        # API сервисы для каждой категории
└── README.md        # Документация
```

## Типы (Types)

Все TypeScript типы организованы по категориям:

- `auth.ts` - Типы для аутентификации
- `admin.ts` - Типы для админ-панели
- `bookings.ts` - Типы для бронирований
- `chat.ts` - Типы для чата
- `documents.ts` - Типы для документов
- `interviews.ts` - Типы для интервью
- `notifications.ts` - Типы для уведомлений
- `payments.ts` - Типы для платежей
- `schedules.ts` - Типы для расписаний
- `services.ts` - Типы для сервисов
- `withdrawals.ts` - Типы для выводов средств
- `dashboards.ts` - Типы для дашбордов

## Сервисы (Services)

Каждый сервис содержит методы для работы с соответствующими эндпоинтами:

### Auth Service (`api/services/auth/`)
- `login()` - Вход в систему
- `register()` - Регистрация
- `refreshToken()` - Обновление токена
- `getProfile()` - Получение профиля
- `updateProfile()` - Обновление профиля
- `deleteProfile()` - Удаление профиля
- `requestPasswordReset()` - Запрос сброса пароля
- `confirmPasswordReset()` - Подтверждение сброса пароля
- `sendVerificationEmail()` - Отправка письма верификации
- `verifyEmail()` - Верификация email
- `uploadPhoto()` - Загрузка фото профиля

### Bookings Service (`api/services/bookings/`)
- `getBookings()` - Получение списка бронирований
- `getBooking()` - Получение бронирования по ID
- `createBooking()` - Создание бронирования
- `updateBooking()` - Обновление бронирования
- `deleteBooking()` - Удаление бронирования

### Services Service (`api/services/services/`)
- `getServices()` - Получение списка сервисов
- `getService()` - Получение сервиса по ID
- `createService()` - Создание сервиса
- `updateService()` - Обновление сервиса
- `deleteService()` - Удаление сервиса

### Payments Service (`api/services/payments/`)
- `getPayments()` - Получение списка платежей
- `getPayment()` - Получение платежа по ID
- `createPayment()` - Создание платежа
- `updatePayment()` - Обновление платежа
- `confirmPayment()` - Подтверждение платежа
- `transferPayment()` - Перевод платежа

И так далее для всех остальных сервисов...

## Использование

### Прямое использование сервисов

```typescript
import { authApi } from '~/api/services/auth'

// В компоненте
const login = async () => {
  try {
    const response = await authApi.login({
      username_or_email: 'user@example.com',
      password: 'password'
    })
    console.log('Login successful:', response)
  } catch (error) {
    console.error('Login failed:', error)
  }
}
```

### Использование через Composables

```typescript
import { useAuthApi } from '~/composables/useAuthApi'

// В компоненте
const { login, loading, user, isAuthenticated } = useAuthApi()

const handleLogin = async () => {
  try {
    await login({
      username_or_email: 'user@example.com',
      password: 'password'
    })
    // Пользователь автоматически сохранится в состоянии
  } catch (error) {
    // Ошибка автоматически обработается
  }
}
```

### Использование главного API Composable

```typescript
import { useApi } from '~/composables/useApi'

// В компоненте
const { auth, bookings, services, payments } = useApi()

// Теперь можно использовать все API
const handleLogin = async () => {
  await auth.login({ username_or_email: 'user@example.com', password: 'password' })
}

const loadBookings = async () => {
  await bookings.getBookings()
}

const loadServices = async () => {
  await services.getServices()
}
```

## Особенности

1. **Типизация**: Все API полностью типизированы с TypeScript
2. **Обработка ошибок**: Автоматическая обработка ошибок через `useErrorHandler`
3. **Состояние**: Автоматическое управление состоянием через composables
4. **Пагинация**: Поддержка пагинации для всех списков
5. **Query параметры**: Поддержка поиска и фильтрации
6. **Токены**: Автоматическое добавление JWT токенов к запросам
7. **Таймауты**: Автоматические таймауты для запросов (20 секунд)

## Конфигурация

API базовый URL настраивается через `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:8000/api/v1/'
    }
  }
})
```

## Безопасность

- Все запросы автоматически включают JWT токен из localStorage
- Токены автоматически обновляются при необходимости
- Обработка ошибок аутентификации
- Безопасное хранение токенов с проверкой SSR

## Расширение

Для добавления новых эндпоинтов:

1. Добавьте типы в соответствующий файл в `api/types/`
2. Создайте методы в соответствующем сервисе в `api/services/`
3. При необходимости создайте composable в `composables/`
4. Обновите экспорты в `api/index.ts` и `composables/useApi.ts`