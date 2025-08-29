<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '~/utils/api'
import { definePageMeta } from '#imports'
definePageMeta({ layout: 'customer-dashboard' })
const api = useApi()
const documents = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const response = await api.get('documents/')
    if (response) {
      documents.value = response
    }
  } catch (e) {
    console.error('Error loading documents:', e)
    error.value = 'Error loading documents'
  } finally {
    loading.value = false
  }
})

async function uploadDocument(event) {
  const file = event.target.files[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  try {
    await api.post('documents/', formData)
    // обновить список документов
    documents.value = await api.get('documents/')
  } catch (e) {
    error.value = 'Ошибка загрузки файла'
  }
}

function viewDocument(url) {
  if (url) {
    window.open(url, '_blank')
  }
}

function downloadDocument(url) {
  if (url) {
    const link = document.createElement('a')
    link.href = url
    link.download = ''
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
</script>

<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Documents Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Your Documents
          </h2>
  
          <div v-if="loading" class="text-center py-4">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <div v-else-if="error" class="alert alert-danger" role="alert">
            {{ error }}
          </div>
          
          <div v-else-if="documents.length === 0" class="text-center text-muted py-4" style="font-family: var(--font-inter);">
            No documents available.
          </div>
          
          <div v-else class="list-group document-list">
            <div v-for="(doc, index) in documents" :key="index" class="list-group-item d-flex justify-content-between align-items-center p-3 mb-3 rounded" style="background-color: #f8f9fa;">
              <div class="d-flex align-items-center">
                <Icon :name="doc.icon || 'heroicons:document-text'" size="24" style="color: var(--color-primary-green);" class="me-3" />
                <div>
                  <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">{{ doc.name || 'Unnamed Document' }}</h6>
                  <small style="font-family: var(--font-inter); font-size: 0.85rem; color: var(--color-text-muted);">{{ doc.date || 'No date' }} • {{ doc.size || 'Unknown size' }}</small>
                </div>
              </div>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-secondary" @click="viewDocument(doc.url)" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">
                  View
                </button>
                <button class="btn btn-sm btn-primary-green" @click="downloadDocument(doc.url)" style="font-family: var(--font-inter); font-size: 0.85rem;">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  
  
  
