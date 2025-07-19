<script setup>
// Этот компонент будет использоваться как базовая страница для /customer
// Можно добавить здесь приветствие или перенаправить на /customer/calendar
import { navigateTo } from '#app';

// Перенаправляем на страницу календаря по умолчанию
navigateTo('/management/all-customers');

// Или можно отобразить что-то простое, если не хотите перенаправлять сразу
// definePageMeta({
//   layout: 'customer-dashboard'
// });
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
