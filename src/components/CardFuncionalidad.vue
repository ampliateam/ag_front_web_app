<template>
  <div class="card-funcionalidad bg-white p-4 border-2 rounded-lg relative w-full mx-auto">
    <!-- Etiqueta de "Proximamente" en la esquina superior derecha -->
    <div v-if="props.etiqueta.mostrar" class="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
      {{ props.etiqueta.texto }}
    </div>

    <!-- Contenido de la tarjeta -->
    <div class="">
      <p class="text-gray-800 text-lg font-semibold">
        {{ props.funcionalidad.texto }}
      </p>
      <hr class="mb-5">

      <div v-if="props.funcionalidad.tipo === 'seleccion-profesional'">
        <button
          :class="[
            'text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            {'bg-blue-500 hover:bg-blue-600': props.funcionalidad.data.idProfesional !== profesionalStore.getIdProfesionalSeleccionado},
            {'bg-gray-500': props.funcionalidad.data.idProfesional === profesionalStore.getIdProfesionalSeleccionado},
          ]"
          @click="cambiarProfesional"
          :disabled="props.funcionalidad.data.idProfesional === profesionalStore.getIdProfesionalSeleccionado"
        >
          <span v-if="props.funcionalidad.data.idProfesional !== profesionalStore.getIdProfesionalSeleccionado">
            Seleccionar
          </span>
          <span v-else>Seleccionado</span>
        </button>
      </div>
      <div v-else-if="props.funcionalidad.tipo === 'personalizado' || props.funcionalidad.tipo === ''">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

import useInfoSistemaStore from '@/store/info-sistema.store';
import useProfesionalStore from '@/store/profesional.store';

const infoSistemaStore = useInfoSistemaStore();
const profesionalStore = useProfesionalStore();

type TTipoFuncionalidad = 'seleccion-profesional'
| 'personalizado';

const props = defineProps({
  funcionalidad: {
    type: Object as PropType<{ texto: string, tipo?: TTipoFuncionalidad, data?: any }>,
    required: true,
    default: { texto: 'Ninguna', tipo: '', data: {} },
  },
  etiqueta: {
    type: Object as PropType<{ texto: string; mostrar: boolean }>,
    required: false,
    default: { texto: '', mostrar: false },
  },
});

const cambiarProfesional = async () => {
  const { idProfesional } = props?.funcionalidad?.data;
  if (!idProfesional) throw new Error('Hubo un problema al seleccionar el profesional.');
  if (profesionalStore.getIdProfesionalSeleccionado === idProfesional) return;

  infoSistemaStore.setCambiandoProfesional(true);
  await profesionalStore.cambiarProfesional(idProfesional);
  infoSistemaStore.setCambiandoProfesional(false);
};
</script>

<style scoped>
.card-funcionalidad {
  width: 90%
}

@media (max-width: 900px) {
  .card-funcionalidad {
    width: 100%
  }
}
</style>
