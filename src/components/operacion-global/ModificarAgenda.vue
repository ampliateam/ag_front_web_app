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
              Horario de almuerzo
            </div>
            <div class="text-center">
              Acciones
            </div>
          </div>

          <!-- Lista de días -->
          <ul>
            <!-- Lunes -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Lunes</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[0].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[0].atencion.horaInicio }} hasta {{ agendaActualizada[0].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[0].almuerzo.horaInicio }} hasta {{ agendaActualizada[0].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('lunes')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para Lunes -->
              <div
                id="dropdown-lunes"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-lunes"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-lunes"
                      type="time"
                      v-model="agendaActualizada[0].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-lunes"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-lunes"
                      type="time"
                      v-model="agendaActualizada[0].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-lunes"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-lunes"
                      type="time"
                      v-model="agendaActualizada[0].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-lunes"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-lunes"
                      type="time"
                      v-model="agendaActualizada[0].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>

            <!-- martes -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Martes</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[1].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[1].atencion.horaInicio }} hasta {{ agendaActualizada[1].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[1].almuerzo.horaInicio }} hasta {{ agendaActualizada[1].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('martes')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para martes -->
              <div
                id="dropdown-martes"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-martes"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-martes"
                      type="time"
                      v-model="agendaActualizada[1].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-martes"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-martes"
                      type="time"
                      v-model="agendaActualizada[1].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-martes"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-martes"
                      type="time"
                      v-model="agendaActualizada[1].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-martes"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-martes"
                      type="time"
                      v-model="agendaActualizada[1].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>
            
            <!-- miercoles -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Miércoles</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[2].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[2].atencion.horaInicio }} hasta {{ agendaActualizada[2].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[2].almuerzo.horaInicio }} hasta {{ agendaActualizada[2].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('miercoles')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para miercoles -->
              <div
                id="dropdown-miercoles"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-miercoles"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-miercoles"
                      type="time"
                      v-model="agendaActualizada[2].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-miercoles"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-miercoles"
                      type="time"
                      v-model="agendaActualizada[2].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-miercoles"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-miercoles"
                      type="time"
                      v-model="agendaActualizada[2].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-miercoles"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-miercoles"
                      type="time"
                      v-model="agendaActualizada[2].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>

            <!-- jueves -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Jueves</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[3].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[3].atencion.horaInicio }} hasta {{ agendaActualizada[3].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[3].almuerzo.horaInicio }} hasta {{ agendaActualizada[3].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('jueves')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para jueves -->
              <div
                id="dropdown-jueves"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-jueves"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-jueves"
                      type="time"
                      v-model="agendaActualizada[3].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-jueves"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-jueves"
                      type="time"
                      v-model="agendaActualizada[3].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-jueves"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-jueves"
                      type="time"
                      v-model="agendaActualizada[3].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-jueves"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-jueves"
                      type="time"
                      v-model="agendaActualizada[3].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>

            <!-- viernes -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Viernes</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[4].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[4].atencion.horaInicio }} hasta {{ agendaActualizada[4].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[4].almuerzo.horaInicio }} hasta {{ agendaActualizada[4].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('viernes')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para viernes -->
              <div
                id="dropdown-viernes"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-viernes"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-viernes"
                      type="time"
                      v-model="agendaActualizada[4].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-viernes"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-viernes"
                      type="time"
                      v-model="agendaActualizada[4].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-viernes"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-viernes"
                      type="time"
                      v-model="agendaActualizada[4].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-viernes"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-viernes"
                      type="time"
                      v-model="agendaActualizada[4].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>

            <!-- sabado -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Sábado</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[5].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[5].atencion.horaInicio }} hasta {{ agendaActualizada[5].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[5].almuerzo.horaInicio }} hasta {{ agendaActualizada[5].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('sabado')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para sabado -->
              <div
                id="dropdown-sabado"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-sabado"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-sabado"
                      type="time"
                      v-model="agendaActualizada[5].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-sabado"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-sabado"
                      type="time"
                      v-model="agendaActualizada[5].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-sabado"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-sabado"
                      type="time"
                      v-model="agendaActualizada[5].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-sabado"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-sabado"
                      type="time"
                      v-model="agendaActualizada[5].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>

            <!-- domingo -->
            <li class="border-b">
              <div class="p-4 grid grid-cols-5 gap-4 items-center">
                <div>Domingo</div>
                <div class="text-center">
                  <input
                    type="checkbox"
                    class="form-checkbox h-5 w-5 text-blue-600"
                    v-model="agendaActualizada[6].esDiaLaboral"
                  >
                </div>
                <div class="text-center">
                  {{ agendaActualizada[6].atencion.horaInicio }} hasta {{ agendaActualizada[6].atencion.horaFin }}
                </div>
                <div class="text-center">
                  {{ agendaActualizada[6].almuerzo.horaInicio }} hasta {{ agendaActualizada[6].almuerzo.horaFin }}
                </div>
                <div class="text-center">
                  <button
                    class="action-button"
                    @click="toggleDropdown('domingo')"
                  >
                    Modificar horas
                  </button>
                </div>
              </div>
              <!-- Dropdown para domingo -->
              <div
                id="dropdown-domingo"
                class="hidden p-4"
              >
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionInicio-domingo"
                    >
                      Atención - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionInicio-domingo"
                      type="time"
                      v-model="agendaActualizada[6].atencion.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="atencionFin-domingo"
                    >
                      Atención - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="atencionFin-domingo"
                      type="time"
                      v-model="agendaActualizada[6].atencion.horaFin"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoInicio-domingo"
                    >
                      Almuerzo - Hora Inicio
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"                      
                      id="almuerzoInicio-domingo"
                      type="time"
                      v-model="agendaActualizada[6].almuerzo.horaInicio"
                    >
                  </div>
                  <div>
                    <label
                      class="block text-gray-700 text-sm font-bold mb-2"
                      for="almuerzoFin-domingo"
                    >
                      Almuerzo - Hora Fin
                    </label>
                    <input
                      class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="almuerzoFin-domingo"
                      type="time"
                      v-model="agendaActualizada[6].atencion.horaFin"
                    >
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
  
        <div class="mt-4 text-right">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l">
            Cancelar
          </button>
          <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r">
            Actualizar
          </button>
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

const agenda = ref([])
const agendaActualizada = ref([
          {
            dia: 'lunes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '08:00',
              horaFin: '19:00'
            },
            almuerzo: {
              horaInicio: '12:00',
              horaFin: '13:00'
            },
          },
          {
            dia: 'martes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            almuerzo: {
              horaInicio: '13:00',
              horaFin: '14:00'
            },
          },
          {
            dia: 'miercoles',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            almuerzo: {
              horaInicio: '12:00',
              horaFin: '13:00'
            },
          },
          {
            dia: 'jueves',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            almuerzo: {
              horaInicio: '12:00',
              horaFin: '13:00'
            },
          },
          {
            dia: 'viernes',
            esDiaLaboral: true,
            atencion: {
              horaInicio: '09:00',
              horaFin: '18:00'
            },
            almuerzo: {
              horaInicio: '12:00',
              horaFin: '13:00'
            },
          },
          {
            dia: 'sabado',
            esDiaLaboral: false,
            atencion: {
              horaInicio: '00:00',
              horaFin: '00:00'
            },
            almuerzo: {
              horaInicio: '00:00',
              horaFin: '00:00'
            },
          },
          {
            dia: 'domingo',
            esDiaLaboral: false,
            atencion: {
              horaInicio: '00:00',
              horaFin: '00:00'
            },
            almuerzo: {
              horaInicio: '00:00',
              horaFin: '00:00'
            },
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