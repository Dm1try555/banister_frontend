<script setup>
// Этот компонент будет использоваться как базовая страница для /customer
// Можно добавить здесь приветствие или перенаправить на /customer/calendar
import { navigateTo } from '#app';
import { definePageMeta } from '#imports'

definePageMeta({ layout: 'customer-dashboard' })

// Перенаправляем на страницу календаря по умолчанию
navigateTo('/customer/calendar');
</script>

<template>
  <div class="text-center p-5">
    <h2 style="font-family: var(--font-inter); color: var(--color-text-dark);">Welcome to your Customer Dashboard!</h2>
    <p style="font-family: var(--font-inter); color: var(--color-text-muted);">Please select an option from the sidebar.</p>
  </div>
</template>


