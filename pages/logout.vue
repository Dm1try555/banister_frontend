<template>
  <div class="min-vh-100 d-flex flex-column">
    <main class="hero text-center py-5 flex-grow-1 d-flex flex-column justify-content-center bg-beige">
      <div class="container-fluid px-4">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-6">
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              <p class="mt-3" style="color: var(--color-text-muted);">Выходим из системы...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  localStorage.removeItem('access_token')
  router.push('/')
})
</script> 