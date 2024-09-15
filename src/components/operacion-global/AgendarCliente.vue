<template>
  <div class="">
    <div class="card-content">
      <h2 class="text-2xl font-bold mb-6 text-gray-800">
        Agendar Cliente
      </h2>

      <button
        class="action-button text-sm font-medium"
        @click="infoSistemaStore.abrirSideBarOG('operacion-cliente', {
          dataInicial: { accion: 'crear-cliente' }
        })"
      >
        Nuevo cliente
      </button>
    </div>
    <ais-instant-search
      :search-client="searchClient"
      :index-name="indexName"
    >
      <ais-configure :hitsPerPage="10" />
      
      <ais-search-box
        style="width: 100% !important;"
        class="mb-3"
      >
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
      <div
        class="table-container"
        v-if="!cliente"
      >
        <ais-hits :transform-items="transformItems">
          <template #default="{ items }">
            <table class="patient-table">
              <thead>
                <tr>
                  <!-- <th class="table-cell table-header">
                    Ver
                  </th> -->
                  <th class="table-cell table-header">
                    Nombre y apellido
                  </th>
                  <th class="table-cell table-header">
                    Nota
                  </th>
                  <th class="table-cell table-header">
                    Contacto
                  </th>
                  <th class="table-cell table-header">
                    Seleccionar
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.objectID"
                >
                  <td class="table-cell patient-name">
                    {{ item.nombre }} {{ item.apellido }}
                  </td>
                  <td class="table-cell">
                    {{ item.nota }}
                  </td>
                  <td class="table-cell">
                    {{ item.contactos[0].contacto }}
                  </td>
                  <td
                    class="table-cell"
                  >
                    <button
                      class="action-button"
                      @click="searchQuery='';cliente=item;"
                    >
                      Seleccionar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </ais-hits>
      </div>
      <!-- tabla de busqueda de cliente por buscador -->
      <form
        @submit.prevent="crearCliente"
        v-if="!!cliente"
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
                :value="cliente.nombre + ' ' + cliente.apellido "
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
                :value="cliente.nota"
                type="text"
                id="apellido"
                disabled
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
            <div class="mb-4">
              <label
                for="nota"
                class="block text-sm font-medium text-gray-700 mb-1"
              >Contacto</label>
              <input
                :value="cliente.contactos[0].contacto"
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
                :value="cliente.direccion.referencia"
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
                v-model="fecha"
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
                v-model="horaInicio"
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
                v-model="horaFin"
                type="time"
                id="nota"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
            </div>
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
    </ais-instant-search>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
import algoliasearch from 'algoliasearch/lite';
import BuscadorGenerico from '@/components/BuscadorGenerico.vue';

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

const cliente = ref(null)

const fecha = ref(null)
const horaInicio = ref(null)
const horaFin = ref(null)

const transformItems = (items: any[], data: any) => {
  const { results } = data;
  
  return items.map((item, index) => ({
    ...item,
    position: { index, page: results.page },
  }));
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

const obtenerEscritura = async (val: string) => {
  if (!!cliente){
    cliente.value = null
  }
  searchQuery.value = val;
};
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