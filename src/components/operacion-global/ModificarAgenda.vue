<template>
  <div class="">
    <div class="card-content">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Modificar agenda
      </h2>
    </div>
    <form
      @submit.prevent="modificarAgenda"
    >
      <div class="container">
        <div class="patient-table overflow-hidden text-sm">
          <!-- Encabezado -->
          <div class="table-cell table-header p-4 grid grid-cols-5 gap-4">
            <div>Día</div>
            <div class="text-center">
              Día laboral
            </div>
            <div class="text-center">
              Horario de atención
            </div>
            <div class="text-center">
              Cantidad de recesos
            </div>
            <div class="text-center">
              Acciones
            </div>
          </div>

          <!-- Lista de días -->
          <ul>
            <!-- Lunes -->
            <li
              v-for="dia, index in dias"
              :key="index"
              class="border-b"
            >
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>{{ dia.diaTitulo }}</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[index].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[index].atencion.horaInicio }} hasta {{ agendaActualizada[index].atencion.horaFin }}
                </div>
                <div
                  class="text-center"
                >
                  {{ agendaActualizada[index].recesos.length }} recesos
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown(dia.diaCodigo)"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para Lunes -->
              <div
                :id="'dropdown-'+dia.diaCodigo"
                class="hidden p-4"
              >
                <h2 class="text-gray-700 text-lg font-bold mb-2">
                  Horario de atención
                </h2>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm"
                    >
                      Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="time"
                      v-model="agendaActualizada[index].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm"
                    >
                      Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="time"
                      v-model="agendaActualizada[index].atencion.horaFin"
                    >
                  </div>
                </div>
                <h2 class="text-gray-700 text-lg font-bold mb-2 mt-2">
                  Horario de recesos
                </h2>
                <div
                  v-for="receso, indexReceso of agendaActualizada[index].recesos"
                  class="flex justify-between items-center mb-4"
                >
                  <div class="flex-1 mr-2">
                    <label
                      class="block text-gray-700 text-sm"
                    >
                      Nota
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      type="text"
                      v-model="receso.nota"
                    >
                  </div>
                  <div class="flex-1 mr-2">
                    <label
                      class="block text-gray-700 text-sm"
                    >
                      Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      type="time"
                      v-model="receso.horaInicio"
                    >
                  </div>
                  <div class="flex-1 mr-2">
                    <label
                      class="block text-gray-700 text-sm"
                    >
                      Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="time"
                      v-model="receso.horaFin"
                    >
                  </div>
                  <button
                    type="button"
                    @click="eliminarReceso(index, indexReceso)"
                    class="text-red-500 hover:text-red-600 mt-4"
                  >
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <button
                  type="button"
                  @click="addReceso(index)"
                  class="text-blue-500 hover:text-blue-600 mt-5 mb-5"
                >
                  <svg
                    class="w-5 h-5 inline-block mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  Agregar receso
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
  
      <div class="mt-4 text-right">
        <button
          type="submit"
          class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 "
        >
          Guardar
        </button>
      </div>
    </form>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

dayjs.locale('es');

const agenda = ref([])

const dias = ref([{diaCodigo: 'lunes', diaTitulo: 'Lunes'},
{diaCodigo: 'martes', diaTitulo: 'Martes'},
{diaCodigo: 'miercoles', diaTitulo: 'Miércoles'},
{diaCodigo: 'jueves', diaTitulo: 'Jueves'},
{diaCodigo: 'viernes', diaTitulo: 'Viernes'},
{diaCodigo: 'sabado', diaTitulo: 'Sábado'}, {diaCodigo: 'domingo', diaTitulo: 'Domingo'}
])


const agendaActualizada = ref([
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

function toggleDropdown(day) {
  const dropdown = document.getElementById(`dropdown-${day}`);
  dropdown.classList.toggle('hidden');
}

const modificarAgenda = async () => {
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

const addReceso = (index) => {
  agendaActualizada.value[index].recesos.push({
    horaInicio: '00:00',
    horaFin: '00:00',
    nota: ''
  })
}

const eliminarReceso = (index, indexReceso) => {
  agendaActualizada.value[index].recesos.splice(indexReceso, 1);
}


onMounted(() => {


});

</script>


<style scoped>
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
  padding: 4px 8px;
  border-radius: 4px;
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

/* @media (max-width: 660px) {
  .containerV2 {
    font-family: Arial, sans-serif;
    background-color: white;
    border-radius: 0px;
    padding: 10px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    width: 100%;
  }
} */

@media (max-width: 600px) {
  .search-and-button {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .new-patient {
    width: 100%;
  }

  .action-button {
    margin-bottom: 7px;
  }
}
</style>