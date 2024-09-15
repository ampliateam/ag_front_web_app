<template>
  <div class="relative" ref="dropdown">
    <button 
      @click="toggleDropdown"
      class="text-gray-800 bg-transparent border-none inline-flex items-center"
    >
      {{ etiquetaProfesional.propio(sections[0]?.profesional[0]?.etiqueta) }}
      <svg class="ml-1 w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 7l4.5 4 4.5-4H5.5z"/>
      </svg>
    </button>

    <!-- Dropdown menu -->
    <ul
      v-if="isOpen"
      class="listaProfesional absolute left-0 mt-2 w-64 max-h-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-y-auto"
    >
      <div v-for="(section, index) in sections" :key="section.title">
        <div v-if="section.profesional.length && index !== 0">
          <li
            class="px-4 py-2 text-gray-500 font-bold"
          >
            {{ section.title }}
          </li>
          
          <li 
            v-for="item in section.profesional" 
            :key="item"
            class="text-center px-4 py-2"
            :class="{
              'hover:bg-gray-100': index !== 0,
              'cursor-pointer': profesionalStore.getIdProfesionalSeleccionado !== item.id,
              'bg-blue-200 hover:bg-blue-200': profesionalStore.getIdProfesionalSeleccionado === item.id && index !== 0,
            }"
            @click="cambiarProfesional(item.id)"
          >
            <!-- <b v-if="profesionalStore.getIdProfesionalSeleccionado === item.id">{{ etiquetaProfesional.propio(item.etiqueta) }}</b> -->
            <span>{{ etiquetaProfesional.propio(item.etiqueta) }}</span>
          </li>
          <hr class="border-gray-300" />
        </div>
      </div>

      <!-- Otros botones -->
      <div>
        <div>
          <li
            class="px-4 py-2 text-gray-500 font-bold"
          >
            Otros
          </li>
          
          <li 
            class="text-center px-4 py-2 cursor-pointer bg-green-200 hover:bg-green-100"
            @click="direccionarCreacionProfesional()"
          >
            + Nuevo profesional
          </li>
          <hr class="border-gray-300" />
        </div>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
import { etiquetaProfesional } from '@/helpers';
import router from '@/router';
import { useInfoSistemaStore, useProfesionalStore } from '@/store';

const infoSistemaStore = useInfoSistemaStore();
const profesionalStore = useProfesionalStore();

const isOpen = ref(false);
const dropdown = ref(null);

// Estructura de secciones con títulos y botones
const sections = ref([
  {
    title: 'Profesional seleccionado',
    profesional: [],
  },
  {
    title: 'Recientes',
    profesional: [],
  },
  {
    title: 'Mis profesiones',
    profesional: [],
  },
]);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
};

const cambiarProfesional = async (idProfesional: string) => {
  if (profesionalStore.getIdProfesionalSeleccionado === idProfesional) return;

  isOpen.value = false;
  infoSistemaStore.setCambiandoProfesional(true);
  await profesionalStore.cambiarProfesional(idProfesional);
  infoSistemaStore.setCambiandoProfesional(false);
};

const direccionarCreacionProfesional = () => {
  router.push('/perfil-profesional?creacion-profesional=1')
};

watch(() => profesionalStore.profesionalSeleccionado, () => {
  if (!profesionalStore.profesionalSeleccionado) return;
  sections.value[0].profesional = [{...profesionalStore.profesionalSeleccionado}];
  sections.value[2].profesional = [...profesionalStore.listaProfesional];
});

watch(() => profesionalStore.listaProfesional, () => {
  sections.value[2].profesional = [...profesionalStore.listaProfesional];
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);

  if (profesionalStore.listaProfesional.length && profesionalStore.profesionalSeleccionado) {
    sections.value[0].profesional = [{...profesionalStore.profesionalSeleccionado}];
    sections.value[2].profesional = [...profesionalStore.listaProfesional];
  };
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.listaProfesional {
  z-index: 800;
}
</style>
