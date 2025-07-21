<template>
  <div :class="['card', customClass]" :style="customStyle">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  customClass?: string
  customStyle?: string | Record<string, string>
}>()
</script> 