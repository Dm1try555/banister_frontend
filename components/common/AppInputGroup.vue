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
        @input="$emit('update:modelValue', $event.target?.value)"
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

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  labelStyle: {
    type: [String, Object],
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  iconSize: {
    type: [String, Number],
    default: 20
  },
  iconStyle: {
    type: [String, Object],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  inputStyle: {
    type: [String, Object],
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])
const showPassword = ref(false)
const isPassword = computed(() => props.type === 'password')
const inputType = computed(() => (isPassword.value && showPassword.value ? 'text' : props.type))
</script> 