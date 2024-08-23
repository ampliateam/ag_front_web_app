<template>
  <div class="">
    <div class="card-content">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Agendamiento
      </h2>

      <button
        class="action-button text-sm font-medium"
      >
        Nuevo cliente
      </button>
    </div>
    <form
      @submit.prevent="crearCliente"
      v-if="!!infoSistemaStore.getOperacionGlobal.dataInicial.idCliente"
    >
      <p class="text-sm text-gray-600 mb-4">
        Los campos con * son obligatorios
      </p>
      <div class="mb-4 grid grid-cols-2 gap-4">
        <!-- Formulario crear agendamiento -->
        <div>
          <div>
            <label
              for="nombre"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Nombre y apellido *</label>
            <input
              :value="infoSistemaStore.getOperacionGlobal.dataInicial.nombre"
              type="text"
              id="nombre"
              required
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="apellido"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Nota</label>
            <input
              :value="infoSistemaStore.getOperacionGlobal.dataInicial.nota"
              type="text"
              id="apellido"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="nota"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Contacto</label>
            <input
              :value="infoSistemaStore.getOperacionGlobal.dataInicial.contacto"
              type="text"
              id="nota"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="mb-4">
            <label
              for="nota"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Dirección</label>
            <input
              :value="infoSistemaStore.getOperacionGlobal.dataInicial.direccion"
              type="text"
              id="nota"
              disabled
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>

        <div>
          <div>
            <label
              for="fechaNacimiento"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Fecha *</label>
            <input
              :value="obtenerFecha(infoSistemaStore.getOperacionGlobal.dataInicial.agendamientoInicio)"
              type="date"
              id="fechaNacimiento"
              :required="false"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="apellido"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Hora inicio *</label>
            <input
              :value="obtenerHora(infoSistemaStore.getOperacionGlobal.dataInicial.agendamientoInicio)"
              type="time"
              id="apellido"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="mb-4">
            <label
              for="nota"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Hora fin *</label>
            <input
              :value="obtenerHora(infoSistemaStore.getOperacionGlobal.dataInicial.agendamientoFin)"
              type="time"
              id="nota"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Guardar
      </button>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const infoSistemaStore = useInfoSistemaStore();

dayjs.locale('es');

// Data de cliente nuevo
const nombre = ref('');
const apellido = ref('');
const nota = ref('');
const fechaNacimiento = ref('');
const direccion = ref<{
  referencia: string;
  ubicacion: [number, number];
}>({
  referencia: '',
  ubicacion: [0,0]
});
const contactos = ref<{
  tipo: 'telefono-movil' | 'correo'; 
  codigoTelefono: string;
  telefono: string;
  correo: string;
}[]>([]);

const crearCliente = async () => {
  try {
    if (!nombre.value) {
      throw new Error('El nombre es obligatorio.');
    }

    if (!apellido.value) {
      throw new Error('El apellido es obligatorio.');
    }

    if (!direccion.value.referencia) {
      throw new Error('La direccion es obligatoria.');
    }

    if (contactos.value.length) {
      const infoValida = contactos.value.map(v => {
        if (v.tipo === 'telefono-movil') {
          return !!v.codigoTelefono && !!v.telefono;
        } else if (v.tipo === 'correo') {
          return !!v.correo
        } else {
          return false;
        }
      });

      const esValido = !infoValida.includes(false);
    
      if (!esValido) {
        throw new Error('Los campos de contacto tienen que estar completos.');
      }
    } else {
      throw new Error('Se necesita al menos un contacto.');
    }

    // Handle form submission
    console.log('Form submitted', {
      nombre: nombre.value,
      apellido: apellido.value,
      nota: nota.value,
      fechaNacimiento: fechaNacimiento.value,
      direccion: direccion,
      contactos: contactos.value
    });
  } catch (error) {
    alert(error.message);
  }
}

const obtenerFecha = (fecha) => {
  return dayjs(fecha).format('YYYY-MM-DD');
}

const obtenerHora = (fecha) => {
  return dayjs(fecha).format('HH:mm');
}

</script>


<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}

/* .containerV2 {
  font-family: Arial, sans-serif;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
  width: 100%;
} */

.search-and-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
}

.table-cell {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table-header {
  background-color: #f8f8f8;
  font-weight: bold;
}

.patient-name {
  color: #4CAF50;
}

.action-button {
  background-color: #5d5fef;
  color: white;
  border: none;
  padding: 8px 8px;
  border-radius: 4px;
  height: fit-content;
  cursor: pointer;
}

.verCliente {
  cursor: pointer;
  margin-left: 0px;
}

.btnOperacionCliente {
  cursor: pointer;
}

.new-patient {
  /* float: right;
  margin-bottom: 10px; */
  white-space: nowrap;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.pagination {
  list-style-type: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination li {
  margin: 0 4px;
}

.pagination a {
  background-color: #5d5fef;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
}

.pagination .active a {
  background-color: #5d5fef;
}

.pagination .disabled a {
  background-color: #cccccc;
  cursor: not-allowed;
}

.card-content {
    /* min-height: 50%; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

@media (max-width: 600px) {
  .search-and-button {
    flex-direction: column-reverse;
    align-items: stretch;
  }

}
</style>