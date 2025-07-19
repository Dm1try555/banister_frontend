<template>
    <div class="d-flex flex-column justify-content-center align-items-center vh-100 bg-beige">
      <div class="text-center">
        <!-- Иконка в зеленом прямоугольнике -->
        <div class="icon-circle mx-auto mb-4 d-flex justify-content-center align-items-center" style="width: 120px; height: 100px;">
          <Icon name="bi:exclamation-triangle" size="48" style="color: var(--color-primary-green);" />
        </div>
        
        <!-- Заголовок в розовом цвете -->
        <h1 class="display-4 mb-3" style="color: var(--color-pink); font-family: var(--font-inter); font-weight: 700;">
          404
        </h1>
        
        <h2 class="h3 mb-3" style="color: var(--color-primary-green); font-family: var(--font-inter); font-weight: 600;">
          Page not found
        </h2>
        
        <!-- Описание -->
        <p class="lead mb-4 text-muted" style="font-family: var(--font-inter); max-width: 400px;">
          The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <!-- Кнопки в стиле проекта -->
        <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
          <NuxtLink to="/" class="btn btn-primary-green btn-lg px-4">
            <Icon name="bi:house" size="20" class="me-2" />
            Back to Home
          </NuxtLink>
          
          <button @click="$router.go(-1)" class="btn btn-outline-secondary btn-lg px-4">
            <Icon name="bi:arrow-left" size="20" class="me-2" />
            Go Back
          </button>
        </div>
        
        <!-- Дополнительная информация -->
        <div class="mt-5 pt-4" style="border-top: 1px solid var(--color-border);">
          <p class="small text-muted mb-2" style="font-family: var(--font-inter);">
            Need help? Contact our support team
          </p>
          <div class="d-flex justify-content-center gap-3">
            <a href="mailto:support@banister.com" class="text-decoration-none" style="color: var(--color-primary-green);">
              <Icon name="bi:envelope" size="16" class="me-1" />
              Email Support
            </a>
            <span class="text-muted">|</span>
            <a href="/help" class="text-decoration-none" style="color: var(--color-primary-green);">
              <Icon name="bi:question-circle" size="16" class="me-1" />
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>