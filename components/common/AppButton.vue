<template>
  <button
    :type="type"
    :class="['btn', variant, customClass]"
    :disabled="disabled"
    :style="customStyle"
    @click="$emit('click', $event)"
  >
    <slot name="icon" />
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset',
  variant?: string, // например, 'btn-primary-green', 'btn-outline-secondary'
  disabled?: boolean,
  customClass?: string | object | Array<string | object>,
  customStyle?: string | Record<string, string>
}>()

defineEmits(['click'])
</script> 