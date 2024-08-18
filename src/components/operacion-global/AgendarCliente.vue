<template>
  <div class="">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">
      Agendar Cliente
    </h2>
    <p class="text-sm text-gray-600 mb-4">
      Los campos con * son obligatorios
    </p>
    <ais-instant-search
      :search-client="searchClient"
      :index-name="indexName"
    >
      <ais-configure :hits-per-page="10" />
      <form @submit.prevent="crearCliente">
        <div class="mb-4 grid grid-cols-2 gap-4">
          <ais-search-box style="width: 100% !important;">
            <template #default="{ currentRefinement, isSearchStalled, refine }">
              <BuscadorGenerico
                prop-placeholder="Busca clientes"
                @escritura="obtenerEscritura"
                :config-algolia="{
                  currentRefinement,
                  isSearchStalled,
                  refine
                }"
              />
            </template>
          </ais-search-box>
          <div>
            <label
              for="nombre"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Nombre *</label>
            <input
              v-model="nombre"
              type="text"
              id="nombre"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          <div>
            <label
              for="apellido"
              class="block text-sm font-medium text-gray-700 mb-1"
            >Apellido *</label>
            <input
              v-model="apellido"
              type="text"
              id="apellido"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
        </div>

        <div class="mb-4">
          <label
            for="nota"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Nota *</label>
          <input
            v-model="nota"
            type="text"
            id="nota"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <div class="mb-4">
          <label
            for="fechaNacimiento"
            class="block text-sm font-medium text-gray-700 mb-1"
          >Fecha De Cumpleaños *</label>
          <input
            v-model="fechaNacimiento"
            type="date"
            id="fechaNacimiento"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Guardar
        </button>
      </form>

      <div
        v-if="showModal"
        class="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75"
      >
        <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
          <button
            @click="closeModal"
            class="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h3 class="text-lg font-medium text-gray-800 mb-4">
            Seleccionar Código de País
          </h3>
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              @input="filterCodes"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Buscar por país o código"
            >
          </div>
          <div class="max-h-[400px] overflow-y-auto">
            <div
              v-for="country in filteredCodes"
              :key="country.codigoTelefono"
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
          <button
            @click="closeModal"
            class="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cerrar
          </button>
        </div>
      </div>
    </ais-instant-search>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import draggable from 'vuedraggable';
import { listaDataPais } from '@/helpers/data-pais.helper';
import useInfoSistemaStore from '@/store/info-sistema.store';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'BSDBYRKOOD',
  'a7ab8d03e87c362513e7ea4076a29be3'
);
const indexName = 'cliente';
const searchQuery = ref('');

const infoSistemaStore = useInfoSistemaStore();

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

// Variables del componente
const indexContactoSeleccionado = ref(-1);
const showModal = ref(false);
const filteredCodes = ref(listaDataPais);
const drag = ref(false);

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

const obtenerEscritura = async (val: string) => {
  searchQuery.value = val;
};
</script>





<style scoped>
.ghost-class {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>