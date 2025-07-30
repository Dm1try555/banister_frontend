# Email Verification System

## Обзор

Добавлена система подтверждения email с следующими компонентами:

### 1. Страница благодарности (`/email-confirmed`)
- **Путь**: `/email-confirmed`
- **Описание**: Страница благодарности после успешного подтверждения email
- **Функции**:
  - Красивая анимация появления элементов
  - Кнопка перехода в аккаунт
  - Кнопка возврата на главную страницу

### 2. Страница автоматического подтверждения (`/confirm-email`)
- **Путь**: `/confirm-email?token=YOUR_TOKEN`
- **Описание**: Страница для автоматического подтверждения email по ссылке
- **Функции**:
  - Автоматическое подтверждение при переходе по ссылке
  - Мгновенное перенаправление на страницу благодарности при успехе
  - Загрузка состояния с анимацией
  - Обработка ошибок подтверждения
  - Возможность повторной отправки email

### 3. Компонент плашки уведомления (`EmailVerificationBanner`)
- **Путь**: `components/common/EmailVerificationBanner.vue`
- **Описание**: Плашка для уведомления о неподтвержденной почте
- **Использование**: Добавлена в layout customer dashboard и страницу профиля

## Использование

### EmailVerificationBanner

```vue
<template>
  <EmailVerificationBanner 
    v-if="showEmailBanner"
    :email="userEmail"
    @dismiss="dismissEmailBanner"
    @resend-email="resendVerificationEmail"
    @go-to-settings="goToProfileSettings"
  />
</template>

<script setup>
import EmailVerificationBanner from '@/components/common/EmailVerificationBanner.vue'

const showEmailBanner = ref(true)
const userEmail = ref('user@example.com')

const dismissEmailBanner = () => {
  showEmailBanner.value = false
  localStorage.setItem('emailBannerDismissed', 'true')
}

const resendVerificationEmail = () => {
  // API вызов для повторной отправки email
  console.log('Resending verification email to:', userEmail.value)
}

const goToProfileSettings = () => {
  // Переход к настройкам профиля
  router.push('/customer/profile')
}
</script>
```

## API Интеграция

### Для отправки кода подтверждения:
```javascript
// POST /api/v1/auth/email-confirm/request/
{
  "email": "user@example.com"
}

// Response:
{
  "success": true,
  "message": "Код подтверждения отправлен на email"
}
```

### Для подтверждения email:
```javascript
// GET /api/v1/auth/email-confirm/verify/?token=YOUR_TOKEN

// Response:
{
  "success": true,
  "message": "Email подтверждён"
}
```

## Состояния плашки

Плашка `EmailVerificationBanner` поддерживает следующие состояния:

1. **Показана** - когда email не подтвержден
2. **Скрыта** - когда пользователь закрыл плашку или email подтвержден
3. **Интерактивная** - с кнопками для повторной отправки и перехода к настройкам

## Стилизация

Все компоненты используют существующую систему стилей проекта:
- Цвета: `var(--color-text-dark)`, `var(--color-text-muted)`
- Шрифты: `var(--font-inter)`
- Кнопки: `btn-nav-primary`, `btn-outline-secondary`

## Анимации

Добавлены плавные анимации появления элементов:
- `fadeInUp` - для иконок и текста
- Задержки для последовательного появления элементов

## Локализация

Все тексты готовы для локализации. В реальном проекте рекомендуется вынести тексты в файлы локализации.

## Безопасность

- Токены подтверждения должны быть одноразовыми
- Время жизни токена должно быть ограничено (например, 24 часа)
- Необходима валидация токена на сервере 