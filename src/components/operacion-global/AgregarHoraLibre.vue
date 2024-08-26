<template>
  <div class="">
    <div class="card-content">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Agregar hora libre
      </h2>
    </div>
    <form
      @submit.prevent="crearHoraLibre"
    >
      <div class="mb-4 grid grid-cols-3 gap-4">
        <div class="col-span-1 pr-4 border-r">
          <p class="text-sm text-gray-600 mb-2">
            Los campos con * son obligatorios
          </p>
          <div>
            <label
              for="nota"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Nota *</label>
            <input
              v-model="nota"
              type="text"
              id="nota"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="fecha"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Fecha *</label>
            <input
              v-model="fecha"
              type="date"
              id="fecha"
              :required="false"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="horaInicio"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Hora inicio *</label>
            <input
              v-model="horaInicio"
              type="time"
              id="horaInicio"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div class="">
            <label
              for="horaFin"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Hora fin *</label>
            <input
              v-model="horaFin"
              type="time"
              id="horaFin"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <button
            type="submit"
            class="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Guardar
          </button>
        </div>
        <div class="col-span-2">
          <table class="patient-table text-sm">
            <thead>
              <tr>
                <th class="table-cell table-header">
                  Nota
                </th>
                <th class="table-cell table-header">
                  Fecha
                </th>
                <th class="table-cell table-header">
                  Hora Inicio
                </th>
                <th class="table-cell table-header">
                  Hora fin
                </th>
                <th class="table-cell table-header">
                  Operaciones
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in agendamientos"
                :key="item.id"
              >
                <td class="table-cell">
                  {{ item.nota }}
                </td>
                <td class="table-cell patient-name">
                  {{ obtenerFecha(item.agendamientoInicio) }}
                </td>
                <td class="table-cell">
                  {{ obtenerHora(item.agendamientoInicio) }}
                </td>
                <td class="table-cell">
                  {{ obtenerHora(item.agendamientoFin) }}
                </td>
                <td class="table-cell">
                  <a
                    :href="`/ficha/${item.id}`"
                    target="_blank"
                  >
                    <button
                      class="action-button"
                      style="font-size: small;"
                    >
                      Ver Ficha
                    </button>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const nota = ref('')
const fecha = ref('')
const horaInicio = ref('')
const horaFin = ref('')

const agendamientos = ref([])

const crearHoraLibre = async () => {
  // try {
  //   if (!nombre.value) {
  //     throw new Error('El nombre es obligatorio.');
  //   }

  //   if (!apellido.value) {
  //     throw new Error('El apellido es obligatorio.');
  //   }

  //   if (!direccion.value.referencia) {
  //     throw new Error('La direccion es obligatoria.');
  //   }

  //   if (contactos.value.length) {
  //     const infoValida = contactos.value.map(v => {
  //       if (v.tipo === 'telefono-movil') {
  //         return !!v.codigoTelefono && !!v.telefono;
  //       } else if (v.tipo === 'correo') {
  //         return !!v.correo
  //       } else {
  //         return false;
  //       }
  //     });

  //     const esValido = !infoValida.includes(false);
    
  //     if (!esValido) {
  //       throw new Error('Los campos de contacto tienen que estar completos.');
  //     }
  //   } else {
  //     throw new Error('Se necesita al menos un contacto.');
  //   }

  //   // Handle form submission
  //   console.log('Form submitted', {
  //     nombre: nombre.value,
  //     apellido: apellido.value,
  //     nota: nota.value,
  //     fechaNacimiento: fechaNacimiento.value,
  //     direccion: direccion,
  //     contactos: contactos.value
  //   });
  // } catch (error) {
  //   alert(error.message);
  // }
}

const obtenerFecha = (fecha) => {
  return dayjs(fecha).format('DD/MM/YYYY');
}

const obtenerHora = (fecha) => {
  return dayjs(fecha).format('HH:mm');
}

onMounted(() => {

  // Ejemplo de agendamientos
  agendamientos.value = [
  {
    id: 'ag001',
    idUsuarioProfesional: 'up001',
    idProfesional: 'prof001',
    idServicioProfesional: 'serv001',
    idCliente: 'cli001',
    idUsuarioCliente: 'uc001',
    tipo: '',  // Asumiendo que TAgendamientoTipo es desconocido
    nota: 'Primera consulta',
    agendamientoInicio: new Date('2024-08-24T10:00:00'),
    agendamientoFin: new Date('2024-08-24T11:00:00'),
    estado: '',  // Asumiendo que TAgendamientoEstado es desconocido
    fechaConfirmado: new Date('2024-08-20T14:30:00'),
    fechaCreacion: new Date('2024-08-15T09:00:00'),
    fechaEliminacion: null
  },
  {
    id: 'ag002',
    idUsuarioProfesional: 'up002',
    idProfesional: 'prof002',
    idServicioProfesional: null,
    idCliente: null,
    idUsuarioCliente: null,
    tipo: '',
    nota: null,
    agendamientoInicio: new Date('2024-08-25T15:30:00'),
    agendamientoFin: new Date('2024-08-25T16:30:00'),
    estado: '',
    fechaConfirmado: null,
    fechaCreacion: new Date('2024-08-18T11:45:00'),
    fechaEliminacion: null
  },
  {
    id: 'ag003',
    idUsuarioProfesional: 'up003',
    idProfesional: 'prof003',
    idServicioProfesional: 'serv002',
    idCliente: 'cli002',
    idUsuarioCliente: 'uc002',
    tipo: '',
    nota: 'Seguimiento mensual',
    agendamientoInicio: new Date('2024-08-26T09:00:00'),
    agendamientoFin: new Date('2024-08-26T10:00:00'),
    estado: '',
    fechaConfirmado: new Date('2024-08-22T16:00:00'),
    fechaCreacion: new Date('2024-08-10T08:30:00'),
    fechaEliminacion: new Date('2024-08-23T12:00:00')
  }
];
});

</script>


<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}

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

.patient-name {
  color: #4CAF50;
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