<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Top Row of Metric Cards -->
      <div class="row g-4 mb-4">
        <!-- Unread Messages Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Unread Messages</h6>
                <Icon name="heroicons:chat-bubble-left-right" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.unreadMessages }}</h4>
            </div>
          </div>
        </div>
  
        <!-- Active Conversations Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Active Conversations</h6>
                <Icon name="heroicons:user-group" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.activeConversations }}</h4>
            </div>
          </div>
        </div>
  
        <!-- High Priority Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">High Priority</h6>
                <Icon name="heroicons:clock" size="20" style="color: #ffc107;" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: #dc3545;">{{ metrics.highPriority }}</h4>
            </div>
          </div>
        </div>
  
        <!-- Avg Response (hrs) Card -->
        <div class="col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm p-3 h-100" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column justify-content-between">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <h6 class="mb-0" style="font-family: var(--font-inter); font-weight: 500; color: var(--color-text-dark);">Avg Response (hrs)</h6>
                <Icon name="heroicons:chat-bubble-left-right" size="20" style="color: var(--color-text-muted);" />
              </div>
              <h4 class="mb-0" style="font-family: var(--font-inter); font-weight: 700; color: var(--color-primary-green);">{{ metrics.avgResponseTime }}</h4>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Main Messages Content -->
      <div class="row g-4 flex-grow-1">
        <!-- Conversations List -->
        <div class="col-lg-4 d-flex">
          <div class="card border-0 shadow-sm p-4 flex-grow-1 conversations-list-card" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column">
              <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                Conversations
              </h2>
              <div class="list-group flex-grow-1 overflow-auto">
                <a 
                  v-for="conv in conversations" 
                  :key="conv.id" 
                  href="#" 
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-start p-3 mb-2 rounded" 
                  :class="{ 'active-conversation': selectedConversation && selectedConversation.id === conv.id }"
                  @click.prevent="selectConversation(conv)"
                  style="background-color: #f8f9fa; border: 1px solid #e9ecef; transition: all 0.2s ease;"
                >
                  <div>
                    <h6 class="mb-1 d-flex align-items-center" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                      {{ conv.name }}
                      <span v-if="conv.priority === 'High'" class="badge bg-danger ms-2" style="font-family: var(--font-inter); font-size: 0.75em;">High</span>
                      <span v-else class="badge bg-secondary ms-2" style="font-family: var(--font-inter); font-size: 0.75em;">Normal</span>
                      <span v-if="conv.unreadCount > 0" class="badge bg-pink ms-2" style="font-family: var(--font-inter); font-size: 0.75em;">{{ conv.unreadCount }}</span>
                    </h6>
                    <p class="mb-1 text-truncate" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem; max-width: 200px;">
                      {{ conv.lastMessage }}
                    </p>
                    <small class="text-muted" style="font-family: var(--font-inter); font-size: 0.75rem;">{{ conv.lastMessageTime }}</small>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Chat Window -->
        <div class="col-lg-8 d-flex">
          <div class="card border-0 shadow-sm p-4 flex-grow-1 d-flex flex-column" style="background-color: white; border-radius: 16px;">
            <div class="card-body d-flex flex-column p-0">
              <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                {{ selectedConversation ? selectedConversation.name : 'Select a Conversation' }}
              </h2>
              <div class="chat-messages flex-grow-1 overflow-auto mb-4">
                <div v-if="selectedConversation">
                  <div v-for="(message, index) in selectedConversation.messages" :key="index" 
                       class="message-bubble mb-3" 
                       :class="{ 'incoming': message.type === 'incoming', 'outgoing': message.type === 'outgoing' }"
                  >
                    <p class="mb-1" :style="{ color: message.type === 'outgoing' ? 'white' : 'var(--color-text-dark)' }">{{ message.text }}</p>
                    <small :style="{ color: message.type === 'outgoing' ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-text-muted)' }" style="font-family: var(--font-inter); font-size: 0.75rem;">{{ message.time }}</small>
                  </div>
                </div>
                <div v-else class="text-center text-muted py-5" style="font-family: var(--font-inter);">
                  No conversation selected.
                </div>
              </div>
  
              <!-- Message Input -->
              <div v-if="selectedConversation" class="message-input d-flex gap-2">
                <input type="text" class="form-control flex-grow-1" placeholder="Type your message..." style="font-family: var(--font-inter);" v-model="newMessageText">
                <button class="btn btn-primary-green px-4" style="font-family: var(--font-inter); font-weight: 500;" @click="sendMessage">
                  <Icon name="heroicons:paper-airplane" size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, nextTick } from 'vue';
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'management-dashboard'
  });
  
  const metrics = ref({
    unreadMessages: 3,
    activeConversations: 3,
    highPriority: 1,
    avgResponseTime: 24,
  });
  
  const conversations = ref([
    {
      id: 'sarah-johnson',
      name: 'Sarah Johnson',
      lastMessage: 'Could you please reschedule my cleaning for next week?',
      lastMessageTime: '2024-01-15 14:30',
      priority: 'Normal',
      unreadCount: 2,
      messages: [
        { type: 'incoming', text: 'Could you please reschedule my cleaning for next week?', time: '2024-01-15 14:30' },
        { type: 'outgoing', text: 'Of course! I\'ll check with Maria and get back to you with available times.', time: '2024-01-15 14:35' },
        { type: 'outgoing', text: 'Maria has availability on Tuesday at 10 AM or Wednesday at 2 PM. Which works better for you?', time: '2024-01-15 14:40' },
      ]
    },
    {
      id: 'david-thompson',
      name: 'David Thompson',
      lastMessage: 'The gardener didn\'t show up today',
      lastMessageTime: '2024-01-15 12:15',
      priority: 'High',
      unreadCount: 1,
      messages: [
        { type: 'incoming', text: 'The gardener didn\'t show up today. Can you help?', time: '2024-01-15 12:15' },
        { type: 'outgoing', text: 'I apologize for that! I\'m looking into it right now and will get back to you shortly.', time: '2024-01-15 12:20' },
      ]
    },
    {
      id: 'emma-davies',
      name: 'Emma Davies',
      lastMessage: 'Thank you for resolving the billing issue!',
      lastMessageTime: '2024-01-14 16:45',
      priority: 'Normal',
      unreadCount: 0,
      messages: [
        { type: 'incoming', text: 'Thank you for resolving the billing issue!', time: '2024-01-14 16:45' },
        { type: 'outgoing', text: 'You\'re welcome! Glad I could help.', time: '2024-01-14 16:50' },
      ]
    },
  ]);
  
  const selectedConversation = ref(conversations.value[0]); // Select the first conversation by default
  const newMessageText = ref('');
  
  const selectConversation = (conv) => {
    selectedConversation.value = conv;
    // Mark as read if it has unread messages
    if (conv.unreadCount > 0) {
      conv.unreadCount = 0;
      metrics.value.unreadMessages--; // Decrement global unread count
    }
    // Scroll to bottom of messages
    nextTick(() => {
      const chatMessagesContainer = document.querySelector('.chat-messages');
      if (chatMessagesContainer) {
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
      }
    });
  };
  
  const sendMessage = () => {
    if (newMessageText.value.trim() === '') return;
  
    if (selectedConversation.value) {
      const now = new Date();
      const timeString = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      selectedConversation.value.messages.push({
        type: 'outgoing',
        text: newMessageText.value.trim(),
        time: timeString,
      });
      selectedConversation.value.lastMessage = newMessageText.value.trim();
      selectedConversation.value.lastMessageTime = timeString;
      newMessageText.value = '';
  
      // Scroll to bottom of messages after sending
      nextTick(() => {
        const chatMessagesContainer = document.querySelector('.chat-messages');
        if (chatMessagesContainer) {
          chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
        }
      });
    }
  };
  </script>
  
  <style scoped>
  /* Используем существующие CSS переменные */
  :root {
    --color-primary-green: #2d5016;
    --color-primary-green-hover: #1a3009;
    --color-secondary-green: #d4f4dd;
    --color-pink: #ff6b9d; /* Для бейджа непрочитанных сообщений */
    --color-beige: #f5f1eb;
    --color-text-muted: #6c757d;
    --color-text-dark: #343a40;
    --color-border: #dee2e6;
    --font-inter: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .bg-beige {
    background-color: var(--color-beige);
  }
  
  /* Metric Cards */
  .card-body h4 {
    font-size: 1.75rem;
  }
  
  /* Conversations List */
  .conversations-list-card .list-group-item {
    cursor: pointer;
  }
  
  .conversations-list-card .list-group-item:hover {
    background-color: #e9ecef !important;
  }
  
  .conversations-list-card .list-group-item.active-conversation {
    background-color: var(--color-secondary-green) !important;
    border-color: var(--color-primary-green) !important;
    color: var(--color-primary-green) !important;
  }
  
  .conversations-list-card .list-group-item.active-conversation h6,
  .conversations-list-card .list-group-item.active-conversation p,
  .conversations-list-card .list-group-item.active-conversation small {
    color: var(--color-primary-green) !important;
  }
  
  .badge.bg-pink {
    background-color: var(--color-pink) !important;
  }
  
  /* Chat Window */
  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-right: 10px; /* For scrollbar */
  }
  
  .message-bubble {
    max-width: 70%;
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word;
  }
  
  .message-bubble.incoming {
    background-color: #e9ecef;
    align-self: flex-start;
    border-bottom-left-radius: 5px;
  }
  
  .message-bubble.outgoing {
    background-color: var(--color-primary-green);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 5px;
  }
  
  .message-bubble p {
    margin-bottom: 5px;
  }
  
  .message-bubble small {
    display: block;
    text-align: right;
  }
  
  .message-input .form-control {
    border-color: var(--color-border);
  }
  
  .message-input .form-control:focus {
    border-color: var(--color-primary-green);
    box-shadow: 0 0 0 0.2rem rgba(45, 80, 22, 0.25);
  }
  
  .btn-primary-green {
    background-color: var(--color-primary-green) !important;
    border-color: var(--color-primary-green) !important;
    color: white !important;
    font-family: var(--font-inter);
    font-weight: 500;
    transition: all 0.3s ease;
    text-decoration: none !important;
  }
  
  .btn-primary-green:hover,
  .btn-primary-green:focus,
  .btn-primary-green:active {
    background-color: var(--color-primary-green-hover) !important;
    border-color: var(--color-primary-green-hover) !important;
    color: white !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(45, 80, 22, 0.2);
    text-decoration: none !important;
  }
  
  /* Responsive adjustments */
  @media (max-width: 991.98px) {
    .col-lg-3, .col-lg-4, .col-lg-8 {
      flex: 0 0 100%;
      max-width: 100%;
    }
    .conversations-list-card .list-group-item .text-truncate {
      max-width: 100% !important; /* Allow full width for message snippet */
    }
    .message-bubble {
      max-width: 90%;
    }
  }
  </style>
  