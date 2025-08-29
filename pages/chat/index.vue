<template>
  <div class="container-fluid py-4">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="mb-4">Чат</h1>
      </div>
    </div>

    <!-- Chat Container -->
    <div class="row">
      <div class="col-lg-4">
        <ChatList />
      </div>
      <div class="col-lg-8">
        <ChatWindow />
      </div>
    </div>
  </div>
</template>

<script setup>
import ChatList from '~/components/ChatList.vue'
import ChatWindow from '~/components/ChatWindow.vue'

definePageMeta({
  middleware: 'auth'
})
</script>
