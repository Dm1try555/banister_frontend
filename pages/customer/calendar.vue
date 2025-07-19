<script setup>
import { ref, computed } from 'vue';
import { definePageMeta } from '#imports';

// Указываем, что эта страница использует макет 'customer-dashboard'
definePageMeta({
  layout: 'customer-dashboard'
});

// Инициализируем текущую дату (например, 15 июня 2025 года)
const today = new Date();
const currentMonth = ref(today.getMonth()); // 0-11
const currentYear = ref(today.getFullYear());
const selectedDay = ref(today.getDate()); // Выбранный день, по умолчанию сегодня

// Вычисляемые свойства для календаря
const displayMonthYear = computed(() => {
  const date = new Date(currentYear.value, currentMonth.value);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
});

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year, month) => {
  // Возвращает день недели (0-6, где 0 - воскресенье) для первого дня месяца
  return new Date(year, month, 1).getDay();
};

const calendarDays = computed(() => {
  const days = [];
  const numDays = getDaysInMonth(currentYear.value, currentMonth.value);
  const firstDay = getFirstDayOfMonth(currentYear.value, currentMonth.value);

  // Добавляем пустые ячейки для дней до начала месяца
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  // Добавляем дни текущего месяца
  for (let i = 1; i <= numDays; i++) {
    days.push(i);
  }

  // Добавляем дни следующего месяца для заполнения сетки (если нужно)
  // Убедимся, что сетка всегда имеет 6 полных недель (42 ячейки) для единообразия
  const totalCells = 42;
  const remainingCells = totalCells - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    days.push(i); // Эти дни будут помечены как disabled
  }

  return days;
});

// Функции для навигации по месяцам
const goToPreviousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
  selectedDay.value = null; // Сбрасываем выбранный день при смене месяца
};

const goToNextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
  selectedDay.value = null; // Сбрасываем выбранный день при смене месяца
};

const selectDay = (day) => {
  if (day !== null) {
    selectedDay.value = day;
    console.log('Selected date:', new Date(currentYear.value, currentMonth.value, day));
  }
};

// Пример данных для предстоящих услуг (можно заменить на реальные данные)
const upcomingServices = ref([
  { name: 'Maria Rodriguez', service: 'Maid', time: '09:00 AM - 3 hours', date: '15/01/2024' },
  { name: 'John Smith', service: 'Gardener', time: '02:00 PM - 2 hours', date: '16/01/2024' },
  { name: 'Chef Antoine', service: 'Chef', time: '06:00 PM - 2 hours', date: '17/01/2024' },
]);
</script>

<template>
  <div class="row g-4">
    <!-- Select Date Card (Calendar) -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Select Date
          </h2>
          <div class="calendar">
            <div class="calendar-header d-flex justify-content-between align-items-center mb-3">
              <button class="btn btn-light btn-sm rounded-circle" @click="goToPreviousMonth" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                <Icon name="heroicons:chevron-left" size="16" />
              </button>
              <span class="h6 mb-0" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">{{ displayMonthYear }}</span>
              <button class="btn btn-light btn-sm rounded-circle" @click="goToNextMonth" style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center;">
                <Icon name="heroicons:chevron-right" size="16" />
              </button>
            </div>
            <div class="calendar-grid">
              <div class="day-name" style="color: var(--color-text-muted);">Su</div>
              <div class="day-name" style="color: var(--color-text-muted);">Mo</div>
              <div class="day-name" style="color: var(--color-text-muted);">Tu</div>
              <div class="day-name" style="color: var(--color-text-muted);">We</div>
              <div class="day-name" style="color: var(--color-text-muted);">Th</div>
              <div class="day-name" style="color: var(--color-text-muted);">Fr</div>
              <div class="day-name" style="color: var(--color-text-muted);">Sa</div>
              
              <div v-for="(day, index) in calendarDays" :key="index" 
                   :class="{
                     'calendar-day': true, 
                     'active-day': day === selectedDay && index >= getFirstDayOfMonth(currentYear, currentMonth) && index < getFirstDayOfMonth(currentYear, currentMonth) + getDaysInMonth(currentYear, currentMonth), 
                     'disabled-day': day === null || (index >= getFirstDayOfMonth(currentYear, currentMonth) + getDaysInMonth(currentYear, currentMonth))
                   }"
                   @click="selectDay(day)"
                   style="font-family: var(--font-inter); font-weight: 500;"
              >
                {{ day }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming Services Card -->
    <div class="col-lg-6">
      <div class="card border-0 shadow-sm p-4" style="background-color: white; border-radius: 16px;">
        <div class="card-body">
          <h2 class="h5 mb-4" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">
            Upcoming Services
          </h2>
          <div class="upcoming-services-list">
            <div v-for="(service, index) in upcomingServices" :key="index" class="service-item d-flex justify-content-between align-items-start p-3 mb-3 rounded" style="background-color: #f8f9fa;">
              <div>
                <h6 class="mb-1" style="font-family: var(--font-inter); font-weight: 600; color: var(--color-text-dark);">{{ service.name }}</h6>
                <p class="mb-1" style="font-family: var(--font-inter); color: var(--color-text-muted); font-size: 0.9rem;">{{ service.service }}</p>
                <p class="mb-0" style="font-family: var(--font-inter); color: var(--color-text-dark); font-size: 0.9rem;">{{ service.time }}</p>
              </div>
              <div class="text-end">
                <span class="badge bg-light text-dark mb-2" style="font-family: var(--font-inter); font-weight: 500; background-color: #e9ecef !important;">{{ service.date }}</span>
                <div class="d-flex gap-2">
                  <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">Check-in</button>
                  <button class="btn btn-sm btn-outline-secondary" style="font-family: var(--font-inter); font-size: 0.85rem; background-color: #e9ecef; border-color: #e9ecef; color: var(--color-text-dark);">Check-out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Calendar specific styles (moved from customer-dashboard.vue) */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
  text-align: center;
}

.day-name {
  font-family: var(--font-inter);
  font-weight: 600;
  font-size: 0.9rem;
  padding: 8px 0;
}

.calendar-day {
  padding: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  color: var(--color-text-dark);
}

.calendar-day:hover:not(.disabled-day):not(.active-day) {
  background-color: rgba(0, 0, 0, 0.05);
}

.calendar-day.active-day {
  background-color: var(--color-primary-green);
  color: white;
  font-weight: 700;
}

.calendar-day.disabled-day {
  color: var(--color-text-muted);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Upcoming Services styles (moved from customer-dashboard.vue) */
.service-item {
  border: 1px solid rgba(0, 0, 0, 0.05);
}
</style>
