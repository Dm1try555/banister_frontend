<template>
  <EmptyState
    icon="bi:exclamation-triangle"
    :iconSize="48"
    :iconStyle="{ width: '120px', height: '100px' }"
    title="404"
    :titleStyle="{ color: 'var(--color-pink)', fontFamily: 'var(--font-inter)', fontWeight: 700 }"
    subtitle="Page not found"
    :subtitleStyle="{ color: 'var(--color-primary-green)', fontFamily: 'var(--font-inter)', fontWeight: 600 }"
    description="The page you are looking for could not be found. It might have been moved, deleted, or you entered the wrong URL."
    :descStyle="{ fontFamily: 'var(--font-inter)', maxWidth: '400px' }"
  >
    <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center">
      <AppButton variant="btn-primary-green btn-lg px-4" @click="$router.push('/')">
        <template #icon>
          <Icon name="bi:house" size="20" class="me-2" />
        </template>
        Back to Home
      </AppButton>
      <AppButton variant="btn-outline-secondary btn-lg px-4" @click="$router.go(-1)">
        <template #icon>
          <Icon name="bi:arrow-left" size="20" class="me-2" />
        </template>
        Go Back
      </AppButton>
    </div>
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
  </EmptyState>
</template>

<script setup>
import EmptyState from '@/components/common/EmptyState.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useRouter } from 'vue-router'
const $router = useRouter()
</script>