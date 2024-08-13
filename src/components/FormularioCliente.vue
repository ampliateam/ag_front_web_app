<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ tituloFormBTN }}</h2>
    <p class="text-sm text-gray-600 mb-4">Los campos con * son obligatorios</p>

    <form @submit.prevent="operacionFormulario">
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input 
            v-model="operacionGlobalData.nombre"
            type="text"
            id="nombre"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="['obtener'].includes(props.accion)"
          >
        </div>
        <div>
          <label for="apellido" class="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input 
            v-model="operacionGlobalData.apellido"
            type="text"
            id="apellido"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="['obtener'].includes(props.accion)"
          >
        </div>
      </div>

      <div class="mb-4">
        <label for="nota" class="block text-sm font-medium text-gray-700 mb-1">Nota</label>
        <input
          v-model="operacionGlobalData.nota"
          type="text"
          id="nota"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener'].includes(props.accion)"
        >
      </div>

      <div class="mb-4">
        <label for="fechaNacimiento" class="block text-sm font-medium text-gray-700 mb-1">Fecha De Nacimiento</label>
        <input
          v-model="operacionGlobalData.fechaNacimiento"
          type="date"
          id="fechaNacimiento"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener'].includes(props.accion)"
        >
      </div>

      <div class="mb-6">
        <label for="direccion_referencia" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
          v-model="operacionGlobalData.direccion.referencia"
          type="text"
          id="direccion_referencia"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener'].includes(props.accion)"
        >
      </div>

      <div class="mb-6">
        <!-- {{ contactos }} -->

        <h3 class="text-lg font-medium text-gray-800 mb-2">Contactos (Ordenado por prioridad)</h3>
        <!-- <draggable
          v-model="contactos"
          item-key="id"
          handle=".drag-handle"
          :animation="200"
          ghost-class="ghost-class"
        > -->

        <draggable 
          v-model="operacionGlobalData.contactos" 
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
              <div class="flex items-center space-x-2">
                <span class="drag-handle cursor-move">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                </span>
                <button
                  type="button"
                  @click="toggleContactType(index)"
                  class="bg-gray-200 hover:bg-gray-300 rounded-md py-2 px-4 flex items-center justify-between"
                  :disabled="['obtener'].includes(props.accion)"
                >
                  <span>{{ element.tipo === 'telefono-movil' ? 'Teléfono' : 'Correo' }}</span>
                </button>
                <template v-if="element.tipo === 'telefono-movil'">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      @click="indexContactoSeleccionado = index; showModal = true;"
                      class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
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
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      :disabled="['obtener'].includes(props.accion)"
                    />
                  </div>
                </template>
                <template v-else>
                  <input
                    v-model="element.correo"
                    type="email"
                    placeholder="email@example.com"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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

    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75">
      <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
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
      </div>
    </div>
  </div>
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
import { listaDataPais } from '@/helpers/data-pais.helper';
import useInfoSistemaStore from '@/store/info-sistema.store';
import { TAccionFormularioCliente } from '@/models/types';

// Variables globales y props
const infoSistemaStore = useInfoSistemaStore();
const props = defineProps({
  accion: {
    type: Object as PropType<TAccionFormularioCliente>,
    required: false,
    default: 'obtener'
  },
  dataCliente: {
    type: Object,
    required: false,
    default: {}
  },
  componenteVisible: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits<{
  (e: 'actualizacionFormulario', value: object): void // Solo valido para "algolia" y "normal"
}>();

// Data de cliente nuevo
const operacionGlobalData = ref<any>({});

// Variables del componente
const indexContactoSeleccionado = ref(-1);
const showModal = ref(false);
const filteredCodes = ref(listaDataPais);
const searchQuery = ref('');
const drag = ref(false);
const tituloFormBTN = ref('');
const nombreFunctionBTN = ref('');

const addContact = () => {
  operacionGlobalData.value.contactos.push({
    tipo: 'telefono-movil',
    codigoTelefono: '+595',
    telefono: '',
    correo: ''
  });
};

const removeContact = (index: number) => {
  operacionGlobalData.value.contactos.splice(index, 1);
};

const selectPhoneCode = (code: string) => {
  operacionGlobalData.value.contactos[indexContactoSeleccionado.value].codigoTelefono = code;
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
  operacionGlobalData.value.contactos[index].tipo = 
  operacionGlobalData.value.contactos[index].tipo === 'telefono-movil' ? 'correo' : 'telefono-movil';
};

const inicializarDatosDeCliente = () => {
  operacionGlobalData.value = {};
  operacionGlobalData.value.id = props.dataCliente['id'];
  operacionGlobalData.value.nombre = props.dataCliente['nombre'];
  operacionGlobalData.value.apellido = props.dataCliente['apellido'];
  operacionGlobalData.value.nota = props.dataCliente['nota'];
  operacionGlobalData.value.fechaNacimiento = props.dataCliente['fechaNacimiento'];
  operacionGlobalData.value.direccion = JSON.parse(JSON.stringify(props.dataCliente['direccion']));
  operacionGlobalData.value.contactos = JSON.parse(JSON.stringify(props.dataCliente['contactos']));
};

// const volverADatosActualesDeCliente = () => {
//   id.value = props.dataCliente['id'];
//   nombre.value = props.dataCliente['nombre'];
//   apellido.value = props.dataCliente['apellido'];
//   nota.value = props.dataCliente['nota'];
//   fechaNacimiento.value = props.dataCliente['fechaNacimiento'];
//   direccion.value = JSON.parse(JSON.stringify(props.dataCliente['direccion']));
//   contactos.value = JSON.parse(JSON.stringify(props.dataCliente['contactos']));
// };

const actualizarNombresEnFormCliente = () => {
  if (props.accion === 'crear') {
    tituloFormBTN.value = 'Nuevo cliente';
    nombreFunctionBTN.value = 'Crear';
  } else if (props.accion === 'actualizar') {
    tituloFormBTN.value = 'Actualizar cliente';
    nombreFunctionBTN.value = 'Actualizar';
  }
};

const verificacionDeExistenciaDeDatos = () => {
  if (!operacionGlobalData.value.nombre) {
    throw new Error('El nombre es obligatorio.');
  }

  if (!operacionGlobalData.value.apellido) {
    throw new Error('El apellido es obligatorio.');
  }

  if (!operacionGlobalData.value.direccion.referencia) {
    throw new Error('La direccion es obligatoria.');
  }

  if (operacionGlobalData.value.contactos.length) {
    const infoValida = operacionGlobalData.value.contactos.map(v => {
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
};

const operacionFormulario = async () => {
  if (props.accion === 'crear') await crearCliente();
  else if (props.accion === 'actualizar') await actualizarCliente();
}

const crearCliente = async () => {
  try {
    verificacionDeExistenciaDeDatos();

    // Handle form submission
    console.log('Form submitted', {
      nombre: operacionGlobalData.value.nombre,
      apellido: operacionGlobalData.value.apellido,
      nota: operacionGlobalData.value.nota,
      fechaNacimiento: operacionGlobalData.value.fechaNacimiento,
      direccion: operacionGlobalData.value.direccion,
      contactos: operacionGlobalData.value.contactos
    });
  } catch (error) {
    alert(error.message);
  }
}

const actualizarCliente = async () => {
  try {
    // Verificacion de existencia de datos
    verificacionDeExistenciaDeDatos();

    // Filtro de los nuevos datos

    // Handle form submission
    console.log('Form submitted', {
      nombre: operacionGlobalData.value.nombre,
      apellido: operacionGlobalData.value.apellido,
      nota: operacionGlobalData.value.nota,
      fechaNacimiento: operacionGlobalData.value.fechaNacimiento,
      direccion: operacionGlobalData.value.direccion,
      contactos: operacionGlobalData.value.contactos
    });
  } catch (error) {
    alert(error.message);
  }
}

watch(() => operacionGlobalData, () => {
  const aux = JSON.parse(JSON.stringify(operacionGlobalData.value));
  emit('actualizacionFormulario', aux);
}, { deep: true });

watch(() => props.accion, () => {
  actualizarNombresEnFormCliente();
  // volverADatosActualesDeCliente();
}, { deep: true });

watch(() => props.componenteVisible, async () => {
  if (props.componenteVisible) {
    actualizarNombresEnFormCliente();
    inicializarDatosDeCliente();
  }
}, { deep: true });

onBeforeMount(async () => {
  actualizarNombresEnFormCliente();
  inicializarDatosDeCliente();
});
</script>





<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>