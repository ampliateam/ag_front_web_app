<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">{{ tituloFormBTN }}</h2>
    <p class="text-sm text-gray-600 mb-4">Los campos con * son obligatorios</p>

    <form @submit.prevent="operacionFormulario">
      <div class="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input 
            v-model="nombre"
            type="text"
            id="nombre"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="['obtener', 'eliminar'].includes(props.accion)"
          >
        </div>
        <div>
          <label for="apellido" class="block text-sm font-medium text-gray-700 mb-1">Apellido *</label>
          <input 
            v-model="apellido"
            type="text"
            id="apellido"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            :disabled="['obtener', 'eliminar'].includes(props.accion)"
          >
        </div>
      </div>

      <div class="mb-4">
        <label for="nota" class="block text-sm font-medium text-gray-700 mb-1">Nota</label>
        <input
          v-model="nota"
          type="text"
          id="nota"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener', 'eliminar'].includes(props.accion)"
        >
      </div>

      <div class="mb-4">
        <label for="fechaNacimiento" class="block text-sm font-medium text-gray-700 mb-1">Fecha De Nacimiento</label>
        <input
          v-model="fechaNacimiento"
          type="date"
          id="fechaNacimiento"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener', 'eliminar'].includes(props.accion)"
        >
      </div>

      <div class="mb-6">
        <label for="direccion_referencia" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
        <input
          v-model="direccion.referencia"
          type="text"
          id="direccion_referencia"
          :required="false"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          :disabled="['obtener', 'eliminar'].includes(props.accion)"
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
          v-model="contactos" 
          item-key="id"
          group="people" 
          @start="drag=true" 
          @end="drag=false"
          handle=".drag-handle"
          :animation="200"
          ghost-class="ghost-class"
          :disabled="['obtener', 'eliminar'].includes(props.accion)"
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
                  :disabled="['obtener', 'eliminar'].includes(props.accion)"
                >
                  <span>{{ element.tipo === 'telefono-movil' ? 'Teléfono' : 'Correo' }}</span>
                </button>
                <template v-if="element.tipo === 'telefono-movil'">
                  <div class="flex items-center space-x-2">
                    <button
                      type="button"
                      @click="indexContactoSeleccionado = index; showModal = true;"
                      class="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
                      :disabled="['obtener', 'eliminar'].includes(props.accion)"
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
                      :disabled="['obtener', 'eliminar'].includes(props.accion)"
                    />
                  </div>
                </template>
                <template v-else>
                  <input
                    v-model="element.correo"
                    type="email"
                    placeholder="email@example.com"
                    class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    :disabled="['obtener', 'eliminar'].includes(props.accion)"  
                  />
                </template>
                <button
                  v-if="!['obtener', 'eliminar'].includes(props.accion)"
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
          v-if="!['obtener', 'eliminar'].includes(props.accion)"
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
        v-if="['crear', 'actualizar', 'eliminar'].includes(props.accion)"
        type="submit"
        :class="[
          '',
          { 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': props.accion === 'crear' },
          { 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': props.accion === 'actualizar' },
          { 'w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2': props.accion === 'eliminar' },
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
  idCliente: {
    type: String,
    required: false,
    default: ''
  }
});

// Data de cliente nuevo
const id = ref('');
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

// Variables del componente
const indexContactoSeleccionado = ref(-1);
const showModal = ref(false);
const filteredCodes = ref(listaDataPais);
const searchQuery = ref('');
const drag = ref(false);
const dataClienteInicial = {};
const tituloFormBTN = ref('');
const nombreFunctionBTN = ref('');

const addContact = () => {
  contactos.value.push({
    tipo: 'telefono-movil',
    codigoTelefono: '+595',
    telefono: '',
    correo: ''
  });
};

const removeContact = (index: number) => {
  contactos.value.splice(index, 1);
};

const selectPhoneCode = (code: string) => {
  contactos.value[indexContactoSeleccionado.value].codigoTelefono = code;
  showModal.value = false;
  indexContactoSeleccionado.value = -1;
};

const operacionFormulario = async () => {
  if (props.accion === 'crear') await crearCliente();
  // if (props.accion === 'actualizar') await actualizarCliente();
  // if (props.accion === 'eliminar') await eliminarCliente();
}

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
  contactos.value[index].tipo = contactos.value[index].tipo === 'telefono-movil' ? 'correo' : 'telefono-movil';
};

const inicializarDatosDeCliente = async () => {
  // TODO: Obtiene los datos del backend
  id.value = props.idCliente;
  nombre.value = 'Guillermo';
  apellido.value = 'Paiva';
  nota.value = '';
  fechaNacimiento.value = '2000-05-16';
  direccion.value.referencia = 'Una referencia';
  direccion.value.ubicacion = [1, 1];
  contactos.value.push({
    tipo: 'telefono-movil',
    codigoTelefono: '+595',
    telefono: '982139653',
    correo: null
  });
  contactos.value.push({
    tipo: 'correo',
    codigoTelefono: null,
    telefono: null,
    correo: 'guillepaivag@gmail.com'
  });

  dataClienteInicial['id'] = id.value;
  dataClienteInicial['nombre'] = nombre.value;
  dataClienteInicial['apellido'] = apellido.value;
  dataClienteInicial['nota'] = nota.value;
  dataClienteInicial['fechaNacimiento'] = fechaNacimiento.value;
  dataClienteInicial['direccion'] = JSON.parse(JSON.stringify( direccion.value ));
  dataClienteInicial['contactos'] = JSON.parse(JSON.stringify( contactos.value ));
};

const volverADatosActualesDeCliente = () => {
  id.value = dataClienteInicial['id'];
  nombre.value = dataClienteInicial['nombre'];
  apellido.value = dataClienteInicial['apellido'];
  nota.value = dataClienteInicial['nota'];
  fechaNacimiento.value = dataClienteInicial['fechaNacimiento'];
  direccion.value.referencia = dataClienteInicial['direccion'].referencia;
  direccion.value.ubicacion = dataClienteInicial['direccion'].ubicacion;
  contactos.value = dataClienteInicial['contactos'];
};

const actualizarNombresEnFormCliente = () => {
  if (props.accion === 'crear') {
    tituloFormBTN.value = 'Nuevo cliente';
    nombreFunctionBTN.value = 'Crear';
  }
  if (props.accion === 'actualizar') {
    tituloFormBTN.value = 'Actualizar cliente';
    nombreFunctionBTN.value = 'Actualizar';
  }
  if (props.accion === 'eliminar') {
    tituloFormBTN.value = 'Eliminar cliente';
    nombreFunctionBTN.value = 'Eliminar'; 
  }
};

watch(() => props.accion, () => {
  actualizarNombresEnFormCliente();
  volverADatosActualesDeCliente();
}, { deep: true });

watch(() => props.idCliente, async () => {
  await inicializarDatosDeCliente();
}, { deep: true });

onBeforeMount(async () => {
  actualizarNombresEnFormCliente();

  const operacionesParaObtener = ['obtener', 'actualizar', 'eliminar'];
  if (operacionesParaObtener.includes(props.accion)) {
    // Inicializar datos de cliente
    await inicializarDatosDeCliente();
  }
})
</script>





<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>