<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
definePageMeta({ layout: 'customer-dashboard' })
const api = useApi()
const messages = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    messages.value = await api.get('/chat/messages/')
  } catch (e) {
    error.value = 'Ошибка загрузки сообщений'
  } finally {
    loading.value = false
  }
})
</script>


<template>
    <!-- Указываем, что эта страница использует макет 'customer-dashboard' -->
    <div class="card border-0 shadow-sm flex-grow-1 d-flex flex-column" style="background-color: white; border-radius: 16px;">
      <div class="card-body d-flex flex-column p-4">
        <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
          Chat with Manager
        </h2>
        <div class="chat-messages flex-grow-1 overflow-auto mb-4">
          <!-- Incoming Message -->
          <div class="message-bubble incoming mb-3">
            <p class="mb-1" style="font-family: var(--font-inter); color: var(--color-text-dark);">Hello! How can I help you today?</p>
            <small class="text-muted" style="font-family: var(--font-inter); font-size: 0.75rem;">2024-01-15 10:30 AM</small>
          </div>
  
          <!-- Outgoing Message -->
          <div class="message-bubble outgoing mb-3">
            <p class="mb-1" style="font-family: var(--font-inter); color: white;">I'd like to reschedule my cleaning service for next week.</p>
            <small style="font-family: var(--font-inter); font-size: 0.75rem; color: rgba(255, 255, 255, 0.7);">2024-01-15 10:35 AM</small>
          </div>
        </div>
  
        <!-- Message Input -->
        <div class="message-input d-flex gap-2">
          <input type="text" class="form-control flex-grow-1" placeholder="Type your message..." style="font-family: var(--font-inter);">
          <button class="btn btn-primary-green px-4" style="font-family: var(--font-inter); font-weight: 500;">Send</button>
        </div>
      </div>
    </div>
  </template>
  

 
  
