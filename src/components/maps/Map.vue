<template>
  <div>
    <div
      id="ubicacion"
      style="height: 400px;"
    />
    <!-- <p>Coordenadas seleccionadas: {{ coordenadas.lat }}, {{ coordenadas.lng }}</p> -->
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  defineProps,
  watch,
  PropType,
  onBeforeUnmount,
} from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// import { getUbicacion } from '@/helpers'

let map = null;
let marker = null; // Variable para almacenar el marcador actual
const coordenadas = ref([0,0]);
const funcionalidadMapa = ref<{mover: boolean}>({mover: false});

const props = defineProps({
  ubicacion: {
    type: Object as PropType<[number, number]>,
    required: false,
    default: null,
    validator: (value: any) => {
      return value 
        && value.length === 2 
        && typeof value[0] === 'number' 
        && typeof value[1] === 'number';
    }
  },
});
const emit = defineEmits<{
  (e: 'cambioDePunto', value: any): void
}>();

const cambioDeUbicacion = () => {
  if (!props.ubicacion) return;
  if (!map) return;

  coordenadas.value = {...props.ubicacion};

  // Si ya hay un marcador, eliminarlo
  if (marker) map.removeLayer(marker);

  // Actualizar el mapa y el marcador
  marker = L.marker(props.ubicacion).addTo(map);
  map.setView(props.ubicacion, map.getZoom());
};

function handleKeyDown(event) {
  if (event.ctrlKey || event.shiftKey) {
    funcionalidadMapa.value.mover = true;
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();
  }
}

function handleKeyUp(event) {
  if (!event.ctrlKey || !event.shiftKey) {
    funcionalidadMapa.value.mover = false;
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
  }
}

watch(() => props.ubicacion, () => {
  cambioDeUbicacion();
});

onMounted(() => {
  map = L.map('ubicacion').setView(props.ubicacion, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors',
  }).addTo(map);

  // Añadir un nuevo marcador
  marker = L.marker(props.ubicacion).addTo(map);
  map.setView(props.ubicacion, map.getZoom());

  // Manejador de eventos para obtener las coordenadas cuando se haga clic en el mapa
  map.on('click', (e) => {
    const { lat, lng } = e.latlng;
    coordenadas.value = [lat, lng];

    // Si ya hay un marcador, eliminarlo
    if (marker) map.removeLayer(marker);

    // Añadir un nuevo marcador
    marker = L.marker(coordenadas.value).addTo(map);
    map.setView(coordenadas.value, map.getZoom());

    emit('cambioDePunto', coordenadas.value);
  });

  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();

  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('keyup', handleKeyUp);
});

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown);
  window.removeEventListener('keyup', handleKeyUp);
})
</script>

<style>
#ubicacion {
  width: 100%;
  height: 400px;
  z-index: 1;
}
</style>
