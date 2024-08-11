<template>
  <layout>
    <div class="containerV2 mt-6 mb-6">
      <div class="calendar-container">
        <!-- Cabecera con selectores y botones -->
        <div class="flex flex-col md-custom:flex-row justify-between items-start md-custom:items-center mb-4 space-y-4 md-custom:space-y-0">
          <div class="flex space-x-2 calendario">
            <select
              v-model="selectedYear"
              class="bg-indigo-500 text-white rounded-md px-3 py-1"
            >
              <option
                v-for="year in yearOptions"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
            <select
              v-model="selectedMonth"
              class="bg-indigo-500 text-white rounded-md px-3 py-1"
            >
              <option
                v-for="(month, index) in monthOptions"
                :key="index"
                :value="index"
              >
                {{ month }}
              </option>
            </select>
            <button
              class="bg-indigo-500 text-white rounded-md px-3 py-1 sm:ml-2"
              @click="goToCurrentWeek"
            >
              Hoy
            </button>
            <div class="flex mt-2 sm:mt-0">
              <TooltipButton 
                button-class="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg mr-2"
                tooltip-text="Semana anterior"
                @click="previousWeek"
              >
                &lt; <!-- Flecha izquierda -->
              </TooltipButton>
              <TooltipButton
                button-class="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg mr-2"
                tooltip-text="Semana siguiente"
                @click="nextWeek"
              >
                &gt; <!-- Flecha derecha -->
              </TooltipButton>
            </div>
          </div>
          <div class="flex space-x-2 acciones">
            <TooltipButton 
              button-class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
              tooltip-text="Semana siguiente"
              @click="agendarPaciente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              ><path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z" /></svg>
            </TooltipButton>
            <TooltipButton 
              button-class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
              tooltip-text="Modificar agenda"
              @click="agendarPaciente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              ><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v200h-80v-40H200v400h280v80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg>
            </TooltipButton>
            <TooltipButton 
              button-class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
              tooltip-text="Agregar hora libre"
              @click="agendarPaciente"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              ><path d="M662-60 520-202l56-56 85 85 170-170 56 57L662-60ZM296-280l-56-56 64-64-64-64 56-56 64 64 64-64 56 56-64 64 64 64-56 56-64-64-64 64ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v254l-80 81v-175H200v400h250l79 80H200Zm0-560h560v-80H200v80Zm0 0v-80 80Z" /></svg>
            </TooltipButton>
          </div>
        </div>

        <!-- Calendario -->
        <div class="grid grid-cols-[auto,1fr,1fr,1fr,1fr,1fr,1fr,1fr] gap-0 border-t border-l">
          <!-- Time column -->
          <div class="col-span-1 border-r">
            <div
              class="h-12 text-sm flex items-center justify-end pr-2 border-b text-gray-400 pl-2"
            >
              Semana
            </div>
            <div
              v-for="hour in hours"
              :key="hour"
              class="h-12 text-right pr-2 text-sm text-gray-400 flex items-center justify-end border-b"
            >
              {{ hour }}
            </div>
          </div>

          <!-- Days columns -->
          <div
            v-for="(date, index) in weekDates"
            :key="date.format()"
            class="col-span-1 border-r min-w-20"
          >
            <div class="h-12 text-center border-b flex flex-col justify-center">
              <p :class="getDayClass(date)">
                {{ date.format('D') }}
              </p>
              <p :class="getDayClass(date, true)">
                {{ weekDays[index] }}
              </p>
            </div>
            <div
              class="relative"
              style="height: 576px"
            >
              <!-- 48px per hour, 12 hours -->
              <div
                v-for="hour in hours"
                :key="`line-${hour}`"
                class="absolute w-full border-b border-gray-200"
                :style="`top: ${(hours.indexOf(hour) + 1) * 48}px`"
              />
              <div
                v-for="agendamiento in getAgendamientosForDate(date)"
                :key="agendamiento.id"
                :class="getAgendamientoClass(agendamiento)"
                :style="getAgendamientoStyle(agendamiento, date)"
                class="absolute w-11/12 px-1 py-0.5 text-xs overflow-hidden rounded"
              >
                {{ agendamiento.nombre || 'Hora libre' }}
                <br>
                {{ formatTime(agendamiento.agendamientoInicio) }} -
                {{ formatTime(agendamiento.agendamientoFin) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Navegación y leyenda -->
        <div class="mt-4 flex items-center justify-center">
          <div class="flex items-center space-x-4">
            <div class="flex items-center">
              <div
                class="w-4 h-4 bg-red-200 border border-red-500 rounded-sm mr-2"
              />
              <span class="text-sm text-gray-600">Agendados</span>
            </div>
            <div class="flex items-center">
              <div
                class="w-4 h-4 bg-gray-200 border border-gray-500 rounded-sm mr-2"
              />
              <span class="text-sm text-gray-600">Libre</span>
            </div>
            <div class="flex items-center">
              <div
                class="w-4 h-4 bg-teal-200 border border-teal-600 rounded-sm mr-2"
              />
              <span class="text-sm text-gray-600">Confirmados</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import TooltipButton from '@/components/TooltipButton.vue'

dayjs.locale('es');

const weekDays = ref([]);
const weekDates = ref([]);
const agendamientos = ref([]);

// const hours = ref([
//   '00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
//   '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
// ]);
const hours = ref([
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
]);

const currentWeekStart = ref(dayjs().startOf('week'));
const selectedYear = ref(dayjs().year());
const selectedMonth = ref(dayjs().month());

const yearOptions = computed(() => {
  const currentYear = dayjs().year();
  return [currentYear - 1, currentYear, currentYear + 1];
});

const monthOptions = computed(() => {
  return [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
});

const generateWeekDays = () => {
  weekDays.value = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.value.add(i, 'day').format('dddd')
  );
};

const generateWeekDates = () => {
  weekDates.value = Array.from({ length: 7 }, (_, i) =>
    currentWeekStart.value.add(i, 'day')
  );
};

const previousWeek = () => {
  const newDate = currentWeekStart.value.subtract(1, 'week');
  updateSelectedDate(newDate);
};

const nextWeek = () => {
  const newDate = currentWeekStart.value.add(1, 'week');
  updateSelectedDate(newDate);
};

const goToCurrentWeek = () => {
  const now = dayjs();
  updateSelectedDate(now);
};

const getAgendamientosForDate = (date) => {
  return agendamientos.value.filter((a) =>
    dayjs(a.agendamientoInicio).isSame(date, 'day')
  );
};

const updateSelectedDate = (newDate) => {
  currentWeekStart.value = newDate.startOf('week');
  selectedYear.value = currentWeekStart.value.year();
  selectedMonth.value = currentWeekStart.value.month();
  generateWeekDays();
  generateWeekDates();
  // Aquí deberías actualizar los agendamientos para la nueva semana seleccionada
};

watch(
  [selectedYear, selectedMonth],
  ([year, month]) => {
    const newDate = dayjs().year(year).month(month).date(1);
    if (!newDate.isSame(currentWeekStart.value, 'month')) {
      updateSelectedDate(newDate);
    }
  },
  { deep: true }
);

const getAgendamientoStyle = (agendamiento, date) => {
  const startOfDay = dayjs(date).startOf('day').hour(7); // 7:00 AM
  const start = dayjs(agendamiento.agendamientoInicio);
  const end = dayjs(agendamiento.agendamientoFin);

  const topPosition = (start.diff(startOfDay, 'minute') / 60) * 48; // 40px per hour
  const height = (end.diff(start, 'minute') / 60) * 48;

  return {
    top: `${topPosition}px`,
    height: `${height}px`,
    'margin-left': '4.1666%',
  };
};

const getAgendamientoClass = (agendamiento) => {
  switch (agendamiento.nombre) {
    case 'Guillermo Paiva':
      return 'bg-teal-200 text-teal-600 border border-teal-600 ';
    case 'Tobias Paiva':
      return 'bg-red-200 text-red-500 border border-red-500';
    case 'Hora libre':
      return 'bg-gray-200 text-gray-500 border border-gray-500';
    default:
      return 'bg-gray-200 text-gray-500 border border-gray-500';
  }
};
const today = computed(() => dayjs().startOf('day'));

const getDayClass = (date, isWeekDay = false) => {
  const baseClass = isWeekDay ? 'text-xs' : 'text-sm';
  if (date.isSame(today.value, 'day')) {
    return `${baseClass} font-bold text-gray-600`;
  }
  return `${baseClass} text-gray-400`;
};

const agendarPaciente= () => {

}

const formatTime = (date) => dayjs(date).format('HH:mm');

onMounted(() => {
  generateWeekDays();
  generateWeekDates();

  // Ejemplo de agendamientos
  agendamientos.value = [
    {
      id: '1',
      nombre: 'Tobias Paiva',
      agendamientoInicio: dayjs().day(2).hour(10).minute(0).toDate(),
      agendamientoFin: dayjs().day(2).hour(12).minute(0).toDate(),
    },
    {
      id: '2',
      nombre: 'Guillermo Paiva',
      agendamientoInicio: dayjs().day(3).hour(9).minute(0).toDate(),
      agendamientoFin: dayjs().day(3).hour(11).minute(0).toDate(),
    },
    {
      id: '3',
      nombre: 'Tobias Paiva',
      agendamientoInicio: dayjs().day(3).hour(11).minute(0).toDate(),
      agendamientoFin: dayjs().day(3).hour(11).minute(30).toDate(),
    },
    {
      id: '4',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(1).hour(12).minute(0).toDate(),
      agendamientoFin: dayjs().day(1).hour(13).minute(0).toDate(),
    },
    {
      id: '5',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(2).hour(12).minute(0).toDate(),
      agendamientoFin: dayjs().day(2).hour(13).minute(0).toDate(),
    },
    {
      id: '6',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(3).hour(12).minute(0).toDate(),
      agendamientoFin: dayjs().day(3).hour(13).minute(0).toDate(),
    },
    {
      id: '7',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(4).hour(12).minute(0).toDate(),
      agendamientoFin: dayjs().day(4).hour(13).minute(0).toDate(),
    },
    {
      id: '8',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(5).hour(12).minute(0).toDate(),
      agendamientoFin: dayjs().day(5).hour(13).minute(0).toDate(),
    },
    {
      id: '2',
      nombre: 'Guillermo Paiva',
      agendamientoInicio: dayjs().day(5).hour(14).minute(30).toDate(),
      agendamientoFin: dayjs().day(5).hour(15).minute(30).toDate(),
    },
    // Agrega más agendamientos según la imagen
  ];
});
</script>

<style>
body{background-color: #F8F9FA;}

@media (max-width: 727px) {
  .calendar-container {
    overflow-x:scroll;
  }

}
</style>