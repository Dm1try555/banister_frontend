<script setup>
import { ref, computed } from 'vue'
import { definePageMeta } from '#imports'
import AppCard from '@/components/common/AppCard.vue'
import AppButton from '@/components/common/AppButton.vue'

definePageMeta({ layout: 'provider-dashboard' })

// Инициализируем текущую дату
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const selectedDay = ref(today.getDate())

// Вычисляемые свойства для календаря
const displayMonthYear = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value)
  return date.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })
})

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate()
}

const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month, 1).getDay()
}

const calendarDays = computed(() => {
  const days = []
  const numDays = getDaysInMonth(currentYear.value, currentMonth.value)
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value)

  // Добавляем пустые ячейки для дней до начала месяца
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= numDays; i++) {
    days.push(i)
  }

  // Добавляем дни следующего месяца для заполнения сетки
  const totalCells = 42
  const remainingCells = totalCells - days.length
  for (let i = 1; i <= remainingCells; i++) {
    days.push(i)
  }

  return days
})

// Функции для навигации по месяцам
const goToPreviousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
  selectedDay.value = null
}

const goToNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
  selectedDay.value = null
}

const selectDay = (day) => {
  if (day !== null) {
    selectedDay.value = day
    console.log('Selected date:', new Date(currentYear.value, currentMonth.value, day))
  }
}

// Пример данных для встреч
const appointments = ref([
  { name: 'Иван Петров', service: 'Уборка', time: '09:00 - 3 часа', date: '15/01/2024' },
  { name: 'Мария Сидорова', service: 'Садоводство', time: '14:00 - 2 часа', date: '16/01/2024' },
  { name: 'Алексей Козлов', service: 'Ремонт', time: '18:00 - 2 часа', date: '17/01/2024' },
])
</script>

<template>
  <div class="row g-4">
    <!-- Календарь -->
    <div class="col-lg-8">
      <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
              Календарь встреч
            </h5>
            <div class="d-flex gap-2">
              <AppButton variant="btn btn-outline-secondary" @click="goToPreviousMonth">
                <Icon name="heroicons:chevron-left" size="16" />
              </AppButton>
              <AppButton variant="btn btn-outline-secondary" @click="goToNextMonth">
                <Icon name="heroicons:chevron-right" size="16" />
              </AppButton>
            </div>
          </div>

          <h4 class="text-center mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            {{ displayMonthYear }}
          </h4>

          <div class="calendar-grid">
            <!-- Дни недели -->
            <div class="calendar-header">
              <div class="calendar-day-header">Вс</div>
              <div class="calendar-day-header">Пн</div>
              <div class="calendar-day-header">Вт</div>
              <div class="calendar-day-header">Ср</div>
              <div class="calendar-day-header">Чт</div>
              <div class="calendar-day-header">Пт</div>
              <div class="calendar-day-header">Сб</div>
            </div>

            <!-- Дни месяца -->
            <div class="calendar-days">
              <div
                v-for="(day, index) in calendarDays"
                :key="index"
                class="calendar-day"
                :class="{
                  'calendar-day-empty': day === null,
                  'calendar-day-selected': day === selectedDay,
                  'calendar-day-today': day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
                }"
                @click="selectDay(day)"
              >
                <span v-if="day !== null">{{ day }}</span>
              </div>
            </div>
          </div>
        </div>
      </AppCard>
    </div>

    <!-- Ближайшие встречи -->
    <div class="col-lg-4">
      <AppCard customClass="border-0 shadow-sm" :customStyle="'background-color: white; border-radius: 16px;'">
        <div class="card-body">
          <h5 class="mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Ближайшие встречи
          </h5>

          <div v-if="appointments.length === 0" class="text-center py-4">
            <Icon name="heroicons:calendar" size="48" class="text-muted mb-3" />
            <p class="text-muted" style="font-family: var(--font-inter);">Нет запланированных встреч</p>
          </div>

          <div v-else class="d-flex flex-column gap-3">
            <div v-for="appointment in appointments" :key="appointment.name" 
                 class="d-flex align-items-center p-3 rounded" 
                 style="background-color: #f8f9fa; border: 1px solid #e9ecef;">
              <div class="me-3">
                <div class="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary text-white"
                     style="width: 40px; height: 40px;">
                  <Icon name="heroicons:calendar" size="16" />
                </div>
              </div>
              <div class="flex-grow-1">
                <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
                  {{ appointment.name }}
                </h6>
                <p class="mb-1" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">
                  {{ appointment.service }}
                </p>
                <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.85rem;">
                  {{ appointment.date }} в {{ appointment.time }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </AppCard>
    </div>
  </div>
</template>

<style scoped>
.calendar-grid {
  display: flex;
  flex-direction: column;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e9ecef;
  border-radius: 8px 8px 0 0;
  overflow: hidden;
}

.calendar-day-header {
  background-color: white;
  padding: 12px;
  text-align: center;
  font-family: var(--font-inter);
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #e9ecef;
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.calendar-day {
  background-color: white;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-inter);
  color: var(--color-text-dark);
}

.calendar-day:hover {
  background-color: rgba(34, 197, 94, 0.1);
}

.calendar-day-empty {
  background-color: #f8f9fa;
  cursor: default;
}

.calendar-day-selected {
  background-color: var(--color-primary-green);
  color: white;
}

.calendar-day-today {
  border: 2px solid var(--color-primary-green);
  font-weight: 600;
}
</style> 