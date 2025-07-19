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
  
  <script setup>
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  </script>
  
  <style scoped>
  /* Chat specific styles (moved from messages.vue) */
  .chat-messages {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Space between messages */
  }
  
  .message-bubble {
    max-width: 70%; /* Limit bubble width */
    padding: 10px 15px;
    border-radius: 15px;
    word-wrap: break-word; /* Ensure long words break */
  }
  
  .message-bubble.incoming {
    background-color: #e9ecef; /* Light gray */
    align-self: flex-start; /* Align to left */
    border-bottom-left-radius: 5px; /* Sharper corner on bottom-left */
  }
  
  .message-bubble.outgoing {
    background-color: var(--color-primary-green); /* Dark green */
    color: white;
    align-self: flex-end; /* Align to right */
    border-bottom-right-radius: 5px; /* Sharper corner on bottom-right */
  }
  
  .message-bubble p {
    margin-bottom: 5px; /* Space between text and timestamp */
  }
  
  .message-bubble small {
    display: block; /* Ensure timestamp is on new line */
    text-align: right;
  }
  
  /* Button styles (reused from previous components) */
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
  </style>
  