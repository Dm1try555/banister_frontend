<template>
  <div :class="['card', customClass]" :style="customStyle">
    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: ''
  },
  customStyle: {
    type: [String, Object],
    default: ''
  }
})
</script> 