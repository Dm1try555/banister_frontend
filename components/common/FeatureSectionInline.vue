<template>
  <div class="feature-inline text-center mb-4">
    <div class="icon-circle d-flex align-items-center justify-content-center mx-auto mb-3">
      <Icon :name="icon" :size="iconSize" :style="iconStyle" />
    </div>
    <h3 v-if="title" class="feature-title mb-2">{{ title }}</h3>
    <p v-if="description" class="feature-text mb-0" v-html="description"></p>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string,
  iconSize?: string | number,
  iconStyle?: string | Record<string, string>,
  title?: string,
  description?: string
}>()
</script>

<style scoped>
.feature-inline {
  background: none;
  box-shadow: none;
  border-radius: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.icon-circle {
  width: 48px;
  height: 48px;
  background: #dbe8db;
  border-radius: 12px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.feature-title,
.feature-text {
  color: #256029;
  font-weight: 600;
  font-family: var(--font-inter);
}
</style> 