<template>
  <DefaultLayout>
    <div :class="`${agendaliaBorderCard} my-4`">
      <div class="calendar-container">
        <!-- Cabecera con selectores y botones -->
        <div class="flex flex-col md-custom:flex-row justify-between items-start md-custom:items-center mb-4 space-y-4 md-custom:space-y-0">
          <div class="flex space-x-2 calendario">
            <select
              v-model="selectedYear"
              class="bg-indigo-500 text-white rounded-md px-3 py-1"
              style="cursor: pointer;"
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
              style="cursor: pointer;"
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
            <div class="flex mt-2 sm:mt-0 mr-2 space-x-2">
              <TooltipHover 
                position="arriba"
                text="Semana anterior"
              >
                <button
                  @click="previousWeek"
                  class="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg"
                >
                  &lt; <!-- Flecha izquierda -->
                </button>
              </TooltipHover>
              <TooltipHover 
                position="arriba"
                text="Semana siguiente"
              >
                <button
                  @click="nextWeek"
                  class="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg"
                >
                  &gt; <!-- Flecha derecha -->
                </button>
              </TooltipHover>
            </div>
          </div>
          <div class="flex space-x-2 acciones">
            <TooltipHover 
              position="arriba"
              text="Agendar paciente"
            >
              <button
                class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
                @click="infoSistemaStore.abrirSideBarOG('agendar-cliente', {
                  dataInicial: { }
                })"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                ><path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z" /></svg>
              </button>
            </TooltipHover>

            <TooltipHover 
              position="arriba"
              text="Modificar agenda"
            >
              <button
                class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
                @click="infoSistemaStore.abrirSideBarOG('modificar-agenda', {
                  dataInicial: { }
                })"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                ><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v200h-80v-40H200v400h280v80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z" /></svg>
              </button>
            </TooltipHover>

            <TooltipHover 
              position="arriba"
              text="Agregar hora libre"
            >
              <button
                class="bg-indigo-500 text-white rounded-md px-3 py-1 text-sm"
                @click="infoSistemaStore.abrirSideBarOG('agregar-hora-libre', {
                  dataInicial: { }
                })"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                ><path d="M662-60 520-202l56-56 85 85 170-170 56 57L662-60ZM296-280l-56-56 64-64-64-64 56-56 64 64 64-64 56 56-64 64 64 64-56 56-64-64-64 64ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v254l-80 81v-175H200v400h250l79 80H200Zm0-560h560v-80H200v80Zm0 0v-80 80Z" /></svg>
              </button>
            </TooltipHover>
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
                class="absolute w-11/12 px-1 py-0.5 text-xs overflow-hidden rounded cursor-pointer"
                @click="infoSistemaStore.abrirSideBarOG('ver-agendamiento', {
                  dataInicial: {
                    agendamiento: agendamiento
                  }
                })"
              >
                {{ agendamiento.nombre || 'Hora libre' }}
                <br>
                {{ formatTime(agendamiento.agendamientoInicio) }} -
                {{ formatTime(agendamiento.agendamientoFin) }}
              </div>
              <div
                v-for="receso, indexR in agenda[index].recesos"
                :key="indexR"
                class="absolute w-11/12 px-1 py-0.5 text-xs overflow-hidden rounded cursor-pointer"
                :class="getAgendamientoClass(receso)"
                :style="getRecesoStyle(receso, date)"
                @click="infoSistemaStore.abrirSideBarOG('modificar-agenda', {
                  dataInicial: { }
                })"
              >
                Receso
                <br>
                {{ receso.horaInicio }} -
                {{ receso.horaFin }}
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
  </DefaultLayout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import TooltipHover from '@/components/TooltipHover.vue'
import { useInfoSistemaStore } from '@/store';
import { agendaliaBorderCard } from '@/helpers';

const infoSistemaStore = useInfoSistemaStore();

dayjs.locale('es');

const weekDays = ref([]);
const weekDates = ref([]);
const agendamientos = ref([]);

const agenda = ref([
          {
            dia: 'lunes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '08:00',
              horaFin: '19:00'
            },
            recesos: [{
              horaInicio: '12:00',
              horaFin: '13:00',
              nota: ''
            }],
          },
          {
            dia: 'martes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            recesos: [{
              horaInicio: '13:00',
              horaFin: '14:00',
              nota: ''
            }],
          },
          {
            dia: 'miercoles',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            recesos: [{
              horaInicio: '12:00',
              horaFin: '13:00',
              nota: ''
            }],
          },
          {
            dia: 'jueves',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            recesos: [{
              horaInicio: '12:00',
              horaFin: '13:00',
              nota: ''
            }],
          },
          {
            dia: 'viernes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            recesos: [{
              horaInicio: '12:00',
              horaFin: '13:00',
              nota: ''
            }],
          },
          {
            dia: 'sabado',
            esDiaLaboral: false,
            atencion: {
              horaInicio: '00:00',
              horaFin: '00:00',
            },
            recesos: [{
              horaInicio: '00:00',
              horaFin: '00:00',
              nota: ''
            }],
          },
          {
            dia: 'domingo',
            esDiaLaboral: false,
            atencion: {
              horaInicio: '00:00',
              horaFin: '00:00'
            },
            recesos: [{
              horaInicio: '00:00',
              horaFin: '00:00',
              nota: ''
            }],
          },
        ],)

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
const getRecesoStyle = (receso, dateString) => {
  const date = new Date(dateString);
  const startOfDay = dayjs(date).startOf('day').hour(7); // 7:00 AM
  const start = dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${receso.horaInicio}`);
  const end = dayjs(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${receso.horaFin}`);

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
    case 'Cris Velazquez':
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

const formatTime = (date) => dayjs(date).format('HH:mm');

onMounted(() => {
  generateWeekDays();
  generateWeekDates();

  // Ejemplo de agendamientos
  agendamientos.value = [
    {
      id: '1',
      idCliente: 'aaaaaaa00000000000000002',
      nombre: 'Cris Velazquez',
      agendamientoInicio: dayjs().day(2).hour(10).minute(0).toDate(),
      agendamientoFin: dayjs().day(2).hour(12).minute(0).toDate(),
      estado:'pendiente'
    },
    {
      id: '2',
      idCliente: 'aaaaaaa00000000000000000',
      nombre: 'Guillermo Paiva',
      agendamientoInicio: dayjs().day(3).hour(9).minute(0).toDate(),
      agendamientoFin: dayjs().day(3).hour(11).minute(0).toDate(),
      estado:'confirmado'
    },
    {
      id: '3',
      idCliente: 'aaaaaaa00000000000000002',
      nombre: 'Cris Velazquez',
      agendamientoInicio: dayjs().day(3).hour(11).minute(0).toDate(),
      agendamientoFin: dayjs().day(3).hour(11).minute(30).toDate(),
      estado:'pendiente'
    },
    {
      id: '7',
      idCliente: '',
      nombre: 'Hora libre',
      agendamientoInicio: dayjs().day(4).hour(16).minute(0).toDate(),
      agendamientoFin: dayjs().day(4).hour(17).minute(0).toDate(),
      estado:''
    },
    {
      id: '2',
      idCliente: 'aaaaaaa00000000000000000',
      nombre: 'Guillermo Paiva',
      agendamientoInicio: dayjs().day(5).hour(14).minute(30).toDate(),
      agendamientoFin: dayjs().day(5).hour(15).minute(30).toDate(),
      estado:'cancelado'
    },
    // Agrega más agendamientos según la imagen
  ];
});
</script>

<style>
@media (max-width: 727px) {
  .calendar-container {
    overflow-x:scroll;
  }

}
</style>