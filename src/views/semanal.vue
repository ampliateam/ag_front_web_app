<template>
  <div class="container mx-auto p-4">
    <div class="grid grid-cols-8 gap-0 border-t border-l">
      <!-- Time column -->
      <div class="col-span-1 border-r">
        <div class="h-12 text-sm font-semibold flex items-center justify-end pr-2 border-b">Semana</div>
        <div v-for="hour in hours" :key="hour" class="h-12 text-right pr-2 text-sm text-gray-500 flex items-center justify-end border-b">
          {{ hour }}
        </div>
      </div>

      <!-- Days columns -->
      <div v-for="(date, index) in weekDates" :key="date.format()" class="col-span-1 border-r">
        <div class="h-12 text-center border-b flex flex-col justify-center">
          <p class="text-sm font-semibold">{{ date.format('D') }}</p>
          <p class="text-xs text-gray-500">{{ weekDays[index] }}</p>
        </div>
        <div class="relative" style="height: 576px;"> <!-- 48px per hour, 12 hours -->
          <div v-for="hour in hours" :key="`line-${hour}`" 
               class="absolute w-full border-b border-gray-200" 
               :style="`top: ${(hours.indexOf(hour) + 1) * 48}px`">
          </div>
          <div v-for="agendamiento in getAgendamientosForDate(date)" :key="agendamiento.id"
               :class="getAgendamientoClass(agendamiento)"
               :style="getAgendamientoStyle(agendamiento, date)"
               class="absolute w-full px-1 py-0.5 text-xs overflow-hidden rounded">
            {{ agendamiento.nombre || 'Hora libre' }}
            <br>
            {{ formatTime(agendamiento.agendamientoInicio) }} - {{ formatTime(agendamiento.agendamientoFin) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const weekDays = ref([]);
const weekDates = ref([]);
const agendamientos = ref([]);

const hours = ref([
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
]);

const generateWeekDays = () => {
  const startOfWeek = dayjs().startOf('week');
  weekDays.value = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day').format('dddd')
  );
};

const generateWeekDates = () => {
  const startOfWeek = dayjs().startOf('week');
  weekDates.value = Array.from({ length: 7 }, (_, i) =>
    startOfWeek.add(i, 'day')
  );
};

const generateHours = () => {
  hours.value = Array.from({ length: 24 }, (_, i) =>
    dayjs().startOf('day').add(i, 'hour').format('HH:mm')
  );
};

const getAgendamientosForDate = (date) => {
  return agendamientos.value.filter(a => 
    dayjs(a.agendamientoInicio).isSame(date, 'day')
  );
};

const getAgendamientosForDateAndHour = (date, hour) => {
  return agendamientos.value.filter(a => {
    const agendamientoDate = dayjs(a.agendamientoInicio);
    return agendamientoDate.isSame(date, 'day') && 
           agendamientoDate.format('HH') === hour.split(':')[0];
  });
};

const getAgendamientoStyle = (agendamiento, date) => {
  const startOfDay = dayjs(date).startOf('day').hour(9); // 9:00 AM
  const start = dayjs(agendamiento.agendamientoInicio);
  const end = dayjs(agendamiento.agendamientoFin);

  const topPosition = start.diff(startOfDay, 'minute') / 60 * 48; // 40px per hour
  const height = end.diff(start, 'minute') / 60 * 48;

  return {
    top: `${topPosition}px`,
    height: `${height}px`,
  };
};

const getAgendamientoClass = (agendamiento) => {
  switch (agendamiento.nombre) {
    case 'Guillermo Paiva':
      return 'bg-blue-200 text-blue-800';
    case 'Tobias Paiva':
      return 'bg-orange-200 text-orange-800';
    case 'Hora libre':
      return 'bg-gray-200 text-gray-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};
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