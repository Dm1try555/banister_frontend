<script setup>
import { definePageMeta } from '#imports'

definePageMeta({ 
  layout: 'customer-dashboard',
  middleware: 'redirects'
})
</script>

<template>
  <div class="text-center p-5">
    <h2 style="font-family: var(--font-inter); color: var(--color-text-dark);">Welcome to your Customer Dashboard!</h2>
    <p style="font-family: var(--font-inter); color: var(--color-text-muted);">Please select an option from the sidebar.</p>
  </div>
</template>


