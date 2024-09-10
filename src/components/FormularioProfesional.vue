<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ tituloFormBTN }}</h2>
    <p
      v-if="['crear', 'actualizar'].includes(props.accion)"
      class="text-sm text-gray-600 mb-4"
    >
      Los campos con * son obligatorios
    </p>

    <form v-if="props.accion === 'crear' || !!operacionData.id" @submit.prevent="operacionFormulario">
      <div
        v-if="['obtener', 'actualizar'].includes(props.accion)"
        class="mb-4"
      >
        <label
          for="id"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          ID Profesional
        </label>
        <input 
          v-model="operacionData.id"
          type="text"
          id="id"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'bg-gray-200': ['obtener', 'actualizar'].includes(props.accion) }"
          :disabled="['obtener', 'actualizar'].includes(props.accion)"
        >
      </div>

      <div class="mb-4">
        <!-- <label
          for="etiqueta"
          class="block text-sm font-medium text-gray-700 mb-1"
        >
          Etiqueta *
        </label> -->
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          Etiqueta *
        </h3>

        <select
          id="etiqueta"
          v-model="operacionData.etiqueta"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener'].includes(props.accion)"
        >
          <option disabled :value="''">
            Seleccionar
          </option>
          <option 
            v-for="option in etiquetaOptions"
            :key="option"
            :value="option"
            :disabled="modeloInicial.etiqueta !== option && profesionalStore.getListaProfesional.map(v => v.etiqueta).includes(option)"
          >
            <b style="font-size: 24px;" v-if="modeloInicial.etiqueta === option">{{ etiquetaProfesional.propio(option) }}</b>
            <span v-else>{{ etiquetaProfesional.propio(option) }}</span>
          </option>
        </select>
      </div>

      <div class="mb-4">
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          Mi dirección
        </h3>
        <textarea
          v-model="operacionData.direccion.referencia"
          type="text"
          id="direccion_referencia"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener'].includes(props.accion)"
          style="height: 40%;"
        />
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          Mi ubicación
          <span style="font-size: x-small;"> (Presione <b>Ctrl</b> para zoom)</span>
        </h3>
        <Map
          :ubicacion="ubicacionMapa"
          @cambioDePunto="operacionData.direccion.ubicacion = $event;"
        />
      </div>

      <div
        v-if="['obtener'].includes(props.accion)"
        class="mb-4"
      >
        <label for="fechaCreacion" class="block text-sm font-medium text-gray-700 mb-1">Fecha De Creacion</label>
        <input
          v-model="operacionData.fechaCreacion"
          type="date"
          id="fechaCreacion"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener', 'actualizar'].includes(props.accion)"
        >
      </div>

      <div class="mb-6">
        <h3 class="text-lg font-medium text-gray-800 mb-2">Contactos (Ordenado por prioridad) *</h3>
        <draggable 
          v-model="operacionData.contactos" 
          item-key="id"
          group="people" 
          @start="drag=true" 
          @end="drag=false"
          handle=".drag-handle"
          :animation="200"
          ghost-class="ghost-class"
          :disabled="['obtener'].includes(props.accion)"
        >
          <template #item="{ element, index }">
            <div class="mb-4 p-2 bg-gray-100 rounded-md">
              <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                <span class="drag-handle cursor-move">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </span>
                <button
                  type="button"
                  @click="toggleContactType(index)"
                  class="bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 flex items-center justify-between w-full sm:w-auto"
                  :disabled="['obtener'].includes(props.accion)"
                >
                  <span>{{ element.tipo === 'telefono-movil' ? 'Teléfono' : 'Correo' }}</span>
                </button>
                <template v-if="element.tipo === 'telefono-movil'">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                    <button
                      type="button"
                      @click="indexContactoSeleccionado = index; showModal = true;"
                      class="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                      :disabled="['obtener'].includes(props.accion)"
                    >
                      <span>{{ element.codigoTelefono }}</span>
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    <input
                      v-model="element.telefono"
                      type="tel"
                      placeholder="123456789"
                      class="w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      :disabled="['obtener'].includes(props.accion)"
                    />
                  </div>
                </template>
                <template v-else>
                  <input
                    v-model="element.correo"
                    type="email"
                    placeholder="email@example.com"
                    class="block w-full sm:flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :disabled="['obtener'].includes(props.accion)"  
                  />
                </template>
                <button
                  v-if="!['obtener'].includes(props.accion)"
                  type="button"
                  @click="removeContact(index)"
                  class="text-red-500 hover:text-red-600"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>
            </div>
          </template>
        </draggable>
        <button
          v-if="!['obtener'].includes(props.accion)"
          type="button"
          @click="addContact"
          class="text-blue-500 hover:text-blue-600"
        >
          <svg class="w-5 h-5 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Agregar Contacto
        </button>
      </div>

      <button
        v-if="['crear', 'actualizar'].includes(props.accion)"
        type="submit"
        :class="[
          '',
          { 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': props.accion === 'crear' },
          { 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': props.accion === 'actualizar' },
        ]"
      >
        {{ nombreFunctionBTN }}
      </button>
    </form>
  </div>

  <OverlayGenerico
    v-if="showModal"
    @cerrado="showModal = false;"
  >
    <button @click="closeModal" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
    <h3 class="text-lg font-medium text-gray-800 mb-4">Seleccionar Código de País</h3>
    <div class="mb-4">
      <input
        v-model="searchQuery" type="text" @input="filterCodes"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar por país o código">
    </div>
    <div class="max-h-[400px] overflow-y-auto">
      <div
        v-for="country in filteredCodes" :key="country.codigoTelefono"
        @click="selectPhoneCode(country.codigoTelefono)"
        class="flex items-center justify-between bg-white border border-blue-500 rounded-md py-2 px-4 cursor-pointer mb-2"
      >
        <div class="flex items-center">
          <span class="text-xl mr-2">{{ country.abreviatura }}</span>
          <span>{{ country.codigoTelefono }}</span>
        </div>
        <span>{{ getNombrePais(country.id) }}</span>
      </div>
    </div>
    <button @click="closeModal"
            class="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
      Cerrar
    </button>
  </OverlayGenerico>
</template>





<script setup lang="ts">
import {
  ref,
  defineProps,
  PropType,
  onBeforeMount,
  watch,
} from 'vue';
import draggable from 'vuedraggable';

import Map from '@/components/maps/Map.vue';
import OverlayGenerico from '@/components/OverlayGenerico.vue';
import { listaDataPais, etiquetaProfesional } from '@/helpers';
import useInfoSistemaStore from '@/store/info-sistema.store';
import useUsuarioLogeadoStore from '@/store/usuario-logeado.store';
import useProfesionalStore from '@/store/profesional.store';
import { TAccionFormularioProfesional } from '@/models/types';

// Variables globales y props
const infoSistemaStore = useInfoSistemaStore();
const usuarioLogeadoStore = useUsuarioLogeadoStore();
const profesionalStore = useProfesionalStore();

const props = defineProps({
  accion: {
    type: Object as PropType<TAccionFormularioProfesional>,
    required: false,
    default: 'obtener'
  },
  modeloInicial: {
    type: Object,
    required: false,
    default: {}
  },
});
const emit = defineEmits<{
  (e: 'actualizacionFormulario', value: object): void // Solo valido para "algolia" y "normal"
}>();

// Data nuevo
const operacionData = ref<any>({});
const ubicacionMapa = ref<any>([0, 0]);

// Variables del componente
const indexContactoSeleccionado = ref(-1);
const showModal = ref(false);
const filteredCodes = ref(listaDataPais);
const searchQuery = ref('');
const drag = ref(false);
const tituloFormBTN = ref('');
const nombreFunctionBTN = ref('');
const etiquetaOptions = [...etiquetaProfesional.etiquetasProfesional];

const addContact = () => {
  operacionData.value.contactos.push({
    tipo: 'telefono-movil',
    codigoTelefono: '+595',
    telefono: '',
    correo: ''
  });
};

const removeContact = (index: number) => {
  operacionData.value.contactos.splice(index, 1);
};

const selectPhoneCode = (code: string) => {
  operacionData.value.contactos[indexContactoSeleccionado.value].codigoTelefono = code;
  showModal.value = false;
  indexContactoSeleccionado.value = -1;
};

const filterCodes = () => {
  filteredCodes.value = listaDataPais.filter((dataPais) => {
    const idIdioma = infoSistemaStore.getIdIdiomaSistema;
    const codigoPaisMinuscula = dataPais.codigoTelefono.toLowerCase();
    const nombrePaisMinuscula = dataPais.porIdioma[idIdioma].titulo.toLowerCase()

    return codigoPaisMinuscula.includes(searchQuery.value) || nombrePaisMinuscula.includes(searchQuery.value.toLowerCase())
  }
  );
};

const getNombrePais = (idPais: string) => {
  return listaDataPais.find(v => v.id === idPais).porIdioma[infoSistemaStore.getIdIdiomaSistema].titulo;
};

const closeModal = () => {
  showModal.value = false;
  indexContactoSeleccionado.value = -1;
};

const toggleContactType = (index: number) => {
  operacionData.value.contactos[index].tipo = 
  operacionData.value.contactos[index].tipo === 'telefono-movil' ? 'correo' : 'telefono-movil';
};

// Otras funcionalidades 
const inicializarDatos = () => {
  operacionData.value = {};
  operacionData.value.id = props.modeloInicial['id'];
  operacionData.value.idUsuario = props.modeloInicial['idUsuario'];

  const aux = [ ...props.modeloInicial['contactos'] ];
  operacionData.value.contactos = aux.map(v => {
    return {
      tipo: v.tipo,
      codigoTelefono: v.tipo === 'telefono-movil' ? v.codigoTelefono : '',
      telefono: v.tipo === 'telefono-movil' ? v.contacto : '',
      correo: v.tipo !== 'telefono-movil' ? v.contacto : '',
    }
  });

  operacionData.value.direccion = { ...props.modeloInicial['direccion'] };
  ubicacionMapa.value = [ ...props.modeloInicial.direccion.ubicacion ];

  operacionData.value.etiqueta = props.modeloInicial['etiqueta'];
  operacionData.value.fotoPerfil = props.modeloInicial['fotoPerfil'];
  operacionData.value.fotoPortada = props.modeloInicial['fotoPortada'];
  operacionData.value.estado = props.modeloInicial['estado'];
  operacionData.value.fechaCreacion = props.modeloInicial['fechaCreacion'];
  operacionData.value.fechaEliminacion = props.modeloInicial['fechaEliminacion'];
};

const actualizarNombresEnForm = () => {
  if (props.accion === 'crear') {
    tituloFormBTN.value = 'Nuevo profesional';
    nombreFunctionBTN.value = 'Crear';
  } else if (props.accion === 'actualizar') {
    tituloFormBTN.value = 'Actualizar profesional';
    nombreFunctionBTN.value = 'Actualizar';
  }
};

const operacionFormulario = async () => {
  if (props.accion === 'crear') await crear();
  else if (props.accion === 'actualizar') await actualizar();
}

const crear = async () => {
  try {
    // Verificacion de existencia de datos
    if (!operacionData.value.etiqueta) {
      throw new Error('La etiqueta es obligatorio.');
    }

    if (operacionData.value.contactos.length) {
      const infoValida = operacionData.value.contactos.map(v => {
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
      // id: operacionData.value.id,
      idUsuario: usuarioLogeadoStore.getUid,
      contactos: operacionData.value.contactos,
      direccion: operacionData.value.direccion,
      etiqueta: operacionData.value.etiqueta,
      fotoPerfil: operacionData.value.fotoPerfil,
      fotoPortada: operacionData.value.fotoPortada,
      // estado: operacionData.value.estado,
      // fechaCreacion: operacionData.value.fechaCreacion,
      // fechaEliminacion: operacionData.value.fechaEliminacion,
    });
  } catch (error) {
    alert(error.message);
  }
}

const actualizar = async () => {
  try {
    // Verificacion de existencia de datos

    // Filtro de los nuevos datos

    // Handle form submission
    console.log('Form submitted', {
      // id: operacionData.value.id,
      // idUsuario: operacionData.value.idUsuario,
      contactos: operacionData.value.contactos,
      direccion: operacionData.value.direccion,
      etiqueta: operacionData.value.etiqueta,
      fotoPerfil: operacionData.value.fotoPerfil,
      fotoPortada: operacionData.value.fotoPortada,
      // estado: operacionData.value.estado,
      // fechaCreacion: operacionData.value.fechaCreacion,
      // fechaEliminacion: operacionData.value.fechaEliminacion,
    });
  } catch (error) {
    alert(error.message);
  }
}

// Al actualizar cualquier dato del formulario se envia los datos al componente padre
watch(() => operacionData, () => {
  ubicacionMapa.value = operacionData.value.direccion.ubicacion;

  const aux = JSON.parse(JSON.stringify(operacionData.value));
  emit('actualizacionFormulario', aux);
}, { deep: true });

// Al actualizar la accion, modificar los nombres del formulario
watch(() => props.accion, () => {
  actualizarNombresEnForm();
}, { deep: true });

// Al actualizar el modelo inicial se inicializan los datos nuevamente
watch(() => props.modeloInicial, async () => {
  inicializarDatos();
}, { deep: true });

// Inicializacion antes de inicializar el DOM
onBeforeMount(async () => {
  actualizarNombresEnForm();
  inicializarDatos();
});
</script>





<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}

.containerAux {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
}

.left {
  width: 50%;
  padding-right: 20px;
  /* text-align: center; */
  transition: all 0.3s ease-in-out;
}

.right {
  width: 50%;
  padding-left: 20px;
  /* text-align: center; */
  transition: all 0.3s ease-in-out;
}

/* Media query para cambiar el diseño al llegar a 500px de ancho del viewport */
@media (max-width: 780px) {
  .containerAux {
    flex-direction: column;
  }
  
  .left, .right {
    width: 100%;
  }

  .left {
    margin-bottom: 20px;
    padding-right: 0;
  }

  .right {
    margin-bottom: 20px;
    padding-left: 0;
  }
}





@media (max-width: 777px) {
  .flex-col {
    flex-direction: column;
  }
  .items-start {
    align-items: flex-start;
  }
  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }
  .space-x-2 > * + * {
    margin-left: 0;
  }
  .w-full {
    width: 100%;
  }
}
</style>