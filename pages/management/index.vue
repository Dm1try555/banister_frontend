<script setup>
// Этот компонент будет использоваться как базовая страница для /management
import { navigateTo } from '#app';
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'management-dashboard' })

// Перенаправляем на страницу all-customers по умолчанию
navigateTo('/management/all-customers');
</script>

<template>
  <div class="text-center p-5">
    <h2 style="font-family: var(--font-inter); color: var(--color-text-dark);">Welcome to your Management Dashboard!</h2>
    <p style="font-family: var(--font-inter); color: var(--color-text-muted);">Please select an option from the sidebar.</p>
  </div>
</template>

<style scoped>
/* Стили будут взяты из layout */
</style>
