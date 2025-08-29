<template>
    <div class="d-flex flex-column flex-grow-1">
      <!-- Completed Services Card -->
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Completed Services
          </h2>
  
          <div class="table-responsive">
            <table class="table table-borderless visit-history-table">
              <thead>
                <tr>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Date</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Client</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Service</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Duration</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Status</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Rating</th>
                  <th scope="col" style="font-family: var(--font-inter); color: var(--color-text-muted);">Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(service, index) in completedServices" :key="index">
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.date }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.client }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.service }}</td>
                  <td style="font-family: var(--font-inter); color: var(--color-text-dark);">{{ service.duration }}</td>
                  <td>
                    <span class="badge rounded-pill" :style="{ backgroundColor: service.statusColor, color: 'white', fontFamily: 'var(--font-inter)' }">
                      {{ service.status }}
                    </span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <Icon v-for="star in 5" :key="star" 
                            :name="star <= service.rating ? 'heroicons:star-solid' : 'heroicons:star'" 
                            size="16" 
                            :style="{ color: star <= service.rating ? '#FFD700' : '#e9ecef' }" 
                            class="me-1" />
                    </div>
                  </td>
                  <td style="font-family: var(--font-inter); font-weight: 600; color: var(--color-primary-green);">{{ service.earnings }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { definePageMeta } from '#imports';
  
  definePageMeta({
    layout: 'customer-dashboard'
  });
  
  const completedServices = ref([
    {
      date: '10/01/2024',
      client: 'Sarah Johnson',
      service: 'House Cleaning',
      duration: '3 hours',
      status: 'Completed',
      statusColor: '#28a745', // Green for completed
      rating: 5,
      earnings: '$120'
    },
    {
      date: '08/01/2024',
      client: 'Michael Brown',
      service: 'Garden Maintenance',
      duration: '2 hours',
      status: 'Completed',
      statusColor: '#28a745',
      rating: 4,
      earnings: '$80'
    },
    {
      date: '05/01/2024',
      client: 'Emily Davis',
      service: 'Deep Cleaning',
      duration: '4 hours',
      status: 'Completed',
      statusColor: '#28a745',
      rating: 5,
      earnings: '$150'
    }
  ]);
  </script>
  
 
  
