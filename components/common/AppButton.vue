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

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button',
    validator: (value) => ['button', 'submit', 'reset'].includes(value)
  },
  variant: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  customClass: {
    type: [String, Object, Array],
    default: ''
  },
  customStyle: {
    type: [String, Object],
    default: ''
  }
})

defineEmits(['click'])
</script> 