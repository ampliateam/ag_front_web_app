<template>
  <DefaultLayout>
    <div class="lg:ml-64 lg:pl-4 lg:flex lg:flex-col lg:w-75% mt-5 mx-2">
      <div class="flex">
        <button class="btn-primary" @click="reset()">Hoy</button>
        <button class="btn" @click="shiftMonth(-1)">Anterior</button>
        <button class="btn" @click="shiftMonth(1)">Siguiente</button>
      </div>
      <span class="text-3xl">{{ viewDate.format('MMMM YYYY') }}</span>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="d in weekDays" class="text-center">
          <div>{{ d }}</div>
        </div>
      </div>
      <div class="grid grid-cols-7">
        <div v-for="p in daystoPrepend"></div>
        <div
          v-for="d in units"
          class="border border-slate-200 flex flex-col h-32"
        >
          <div :class="[d.isToday() ? 'bg-red-300' : '']" class="text-center">
            {{ d.format('D') }}
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import 'dayjs/locale/es'; // Importa el locale español

dayjs.extend(isToday);
dayjs.locale('es'); // Configura dayjs para usar el locale español

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  modelValue?: any;
  startDate?: string;
  display?: 'month' | 'year' | 'week' | 'day';
};
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => null,
  display: () => 'month',
  startDate: () => '2022-12-05',
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emits = defineEmits(['update:modelValue']);

const viewDate = ref(dayjs(props.startDate));

const daystoPrepend = computed(() => {
  const startOfMonth = viewDate.value.startOf('month');
  const startOfFirstWeek = startOfMonth.startOf('week');
  const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, 'day');
  return Array.from(new Array(daysToFirstDay).keys());
});

const units = computed(() => {
  let ranges = [];
  let startOfRange = viewDate.value.startOf('month').add(-1, 'day');
  let endOfRange = viewDate.value.endOf('month').add(-1, 'day');

  let currentDate = startOfRange;

  while (currentDate.isBefore(endOfRange) || currentDate.isSame(endOfRange)) {
    currentDate = currentDate.add(1, 'day');
    ranges.push(currentDate);
  }
  return ranges;
});

const shiftMonth = function (amount: number) {
  viewDate.value = viewDate.value.add(amount, 'month');
};
const reset = function () {
  viewDate.value = dayjs();
};

const weekDays = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
  'Domingo',
];
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
