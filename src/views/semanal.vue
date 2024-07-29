<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Calendario Semanal</h1>
    <div class="grid grid-cols-7">
      <div v-for="date in weekDates" :key="date.format()"
      class="text-center">
        <p>{{ date.format('D') }}</p>
      </div>
      <div v-for="(day, index) in weekDays" :key="index" class="text-center ">
        {{ day }}
      </div>
      
    </div>
    <template v-for="hour in hours" :key="`${hour}`">
          <div class="border p-1 h-16 relative">
            {{ hour }}
          </div>
        </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const weekDays = ref([]);
const weekDates = ref([]);
const hours = ref([]);
const agendamientos = ref([]);

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

const getAgendamientosForDateAndHour = (date, hour) => {
  return agendamientos.value.filter(a => {
    const agendamientoDate = dayjs(a.agendamientoInicio);
    return agendamientoDate.isSame(date, 'day') && 
           agendamientoDate.format('HH') === hour.split(':')[0];
  });
};

const getAgendamientoClass = (agendamiento) => {
  const baseClass = 'rounded';
  switch (agendamiento.estado) {
    case 'pendiente': return `${baseClass} bg-yellow-200 text-yellow-800`;
    case 'confirmado': return `${baseClass} bg-green-200 text-green-800`;
    case 'cancelado': 
    case 'cancelado-por-profesional': return `${baseClass} bg-red-200 text-red-800`;
    case 'eliminado': return `${baseClass} bg-gray-200 text-gray-800`;
    default: return baseClass;
  }
};

const getAgendamientoStyle = (agendamiento, date, hour) => {
  const start = dayjs(agendamiento.agendamientoInicio);
  const end = dayjs(agendamiento.agendamientoFin);
  const cellStart = dayjs(date).hour(parseInt(hour));
  const cellEnd = cellStart.add(1, 'hour');

  const top = Math.max(0, start.diff(cellStart, 'minute')) / 60 * 100;
  const height = Math.min(100, end.diff(start, 'minute') / 60 * 100);

  return {
    top: `${top}%`,
    height: `${height}%`,
  };
};

const formatTime = (date) => dayjs(date).format('HH:mm');

onMounted(() => {
  generateWeekDays();
  generateWeekDates();
  generateHours();

  // Aquí deberías cargar los agendamientos reales
  agendamientos.value = [
    {
      id: '1',
      tipo: 'cliente',
      agendamientoInicio: new Date(2024, 6, 25, 10, 0),
      agendamientoFin: new Date(2024, 6, 25, 11, 30),
      estado: 'confirmado'
    },
    {
      id: '2',
      tipo: 'horaLibre',
      agendamientoInicio: new Date(2024, 6, 26, 14, 0),
      agendamientoFin: new Date(2024, 6, 26, 15, 0),
      estado: 'pendiente'
    },
    // Agrega más agendamientos de prueba aquí
  ];
});
</script>