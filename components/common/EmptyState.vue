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

<script setup lang="ts">
defineProps<{
  icon?: string,
  iconSize?: string | number,
  iconStyle?: string | Record<string, string>,
  iconCustomStyle?: string | Record<string, string>,
  title?: string,
  titleStyle?: string | Record<string, string>,
  subtitle?: string,
  subtitleStyle?: string | Record<string, string>,
  description?: string,
  descStyle?: string | Record<string, string>
}>()
</script> 