<template>
  <div class="mb-3">
    <label v-if="label" :for="id" class="form-label" :style="labelStyle">{{ label }}</label>
    <div class="input-group">
      <span v-if="icon" class="input-group-text" :style="iconStyle">
        <Icon :name="icon" :size="iconSize" />
      </span>
      <input
        :id="id"
        :type="inputType"
        class="form-control"
        :placeholder="placeholder"
        :value="modelValue"
        :style="inputStyle"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
        :readonly="readonly"
        :disabled="disabled"
        :required="required"
      />
      <span v-if="isPassword" class="input-group-text cursor-pointer" @click="showPassword = !showPassword">
        <Icon :name="showPassword ? 'bi:eye-slash' : 'bi:eye'" size="20" />
      </span>
    </div>
    <div v-if="error" class="text-danger small mt-1">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps<{
  id?: string,
  label?: string,
  labelStyle?: string | Record<string, string>,
  icon?: string,
  iconSize?: string | number,
  iconStyle?: string | Record<string, string>,
  type?: string,
  placeholder?: string,
  modelValue?: string,
  inputStyle?: string | Record<string, string>,
  error?: string,
  readonly?: boolean,
  disabled?: boolean,
  required?: boolean
}>()
const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && showPassword.value ? 'text' : props.type))
</script> 