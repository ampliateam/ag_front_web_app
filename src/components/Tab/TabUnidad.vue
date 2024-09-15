<template>
  <!-- :key="index" v-for="(tab, index) in tabs" -->
  <div>
    <button
      v-if="!props.tab.to"
      @click="retornarTabSeleccionado(props.tab)"
      :class="[
        'py-2 px-4 font-medium text-sm focus:outline-none flex-shrink-0 flex items-center',
        props.tab.activo
          ? classes.textoHabilitado
          : classes.textoDeshabilitado
      ]"
    >
      <svg class="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          :d="props.tab.icon"
          :stroke="
            props.tab.activo
              ? classes.iconoHabilitado
              : classes.iconoDeshabilitado
          "
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="whitespace-nowrap">{{ props.tab.name }}</span>
    </button>
    <router-link
      v-else
      :to="props.tab.to"
      :class="[
        'py-2 px-4 font-medium text-sm focus:outline-none flex-shrink-0 flex items-center',
        obtenerCurrentFullPath() === props.tab.to || obtenerCurrentFullPath().includes(props.tab.to)
          ? classes.textoHabilitado
          : classes.textoDeshabilitado
      ]"
    >
      <svg v-if="props.tab.icon" class="w-5 h-5 mr-2 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          :d="props.tab.icon"
          :stroke="
            obtenerCurrentFullPath() === props.tab.to || obtenerCurrentFullPath().includes(props.tab.to)
              ? classes.iconoHabilitado
              : classes.iconoDeshabilitado
          "
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span class="whitespace-nowrap">{{ props.tab.name }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onBeforeMount } from 'vue';
import router from '@/router';

const classes = ref<any>({});

type TElementoTab = {
  id: number | string,
  name?: string,
  icon?: string,
  to?: string,
  textColor?: { habilitado: string, deshabilitado: string },
  iconColor?: { habilitado: string, deshabilitado: string },
  activo?: boolean,
};

const emit = defineEmits<{
  (e: 'getTabSeleccionado', value: TElementoTab): void
}>();

const props = defineProps({
  tab: {
    type: Object as PropType<TElementoTab>,
    required: true
  },
});

const obtenerCurrentFullPath = () => {
  return router.currentRoute.value.fullPath;
};

const retornarTabSeleccionado = (teb: TElementoTab) => {
  emit('getTabSeleccionado', teb);
};

onBeforeMount(() => {
  let classesAux = {};
  
  const colorHabilitado = props.tab?.textColor?.habilitado || 'blue';
  const colorDeshabilitado = props.tab?.textColor?.deshabilitado || 'gray';

  classesAux = {
    textoHabilitado: `border-b-2 border-${colorHabilitado}-500 text-${colorHabilitado}-600`,
    textoDeshabilitado: `text-${colorDeshabilitado}-500 hover:text-${colorDeshabilitado}-700`,
    iconoHabilitado: props.tab?.iconColor?.habilitado || 'currentColor',
    iconoDeshabilitado: props.tab?.iconColor?.deshabilitado || '#6B7280',
  };

  classes.value = classesAux;
});
</script>