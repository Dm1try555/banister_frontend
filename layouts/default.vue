<script setup>
import Header from '~/components/Header.vue';
</script> 

<template>
  <div class="min-vh-100 d-flex flex-column">
    <Header />
    <main class="flex-grow-1 d-flex flex-column bg-beige">
      <slot />
    </main>
  </div>
</template>

