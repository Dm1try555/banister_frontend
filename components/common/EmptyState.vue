<template>
  <div class="d-flex flex-column justify-content-center align-items-center py-5 w-100">
    <div v-if="icon" class="icon-circle mb-4 d-flex justify-content-center align-items-center" :style="iconStyle">
      <Icon :name="icon" :size="iconSize" :style="iconCustomStyle" />
    </div>
    <h1 v-if="title" class="mb-3" :style="titleStyle">{{ title }}</h1>
    <h2 v-if="subtitle" class="h3 mb-3" :style="subtitleStyle">{{ subtitle }}</h2>
    <p v-if="description" class="lead mb-4 text-muted" :style="descStyle">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: [String, Number],
    default: 24
  },
  iconStyle: {
    type: [String, Object],
    default: ''
  },
  iconCustomStyle: {
    type: [String, Object],
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  titleStyle: {
    type: [String, Object],
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  subtitleStyle: {
    type: [String, Object],
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  descStyle: {
    type: [String, Object],
    default: ''
  }
})
</script> 