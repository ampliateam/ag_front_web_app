<template>
  <ais-instant-search
    v-if="filtros"
    :search-client="searchClient"
    :index-name="indexName"
  >
  <ais-configure :filters="filtros" :hitsPerPage="10" />

    <div :class="agendaliaBorderCard">
      <div class="search-and-button">
        <ais-search-box style="width: 100% !important;">
          <template #default="{ currentRefinement, isSearchStalled, refine }">
            <!-- <span v-if="isSearchStalled">Loading...</span> -->
            <BuscadorGenerico
              :disabled="!cantidadClientePorProfesional"
              propPlaceholder="Busca clientes"
              @escritura="obtenerEscritura"
              :configAlgolia="{
                currentRefinement,
                isSearchStalled,
                refine
              }"
            />
          </template>
        </ais-search-box>

        <button
          class="action-button new-patient"
          style="font-size: medium;"
          @click="infoSistemaStore.abrirSideBarOG('operacion-cliente', {
            dataInicial: { accion: 'crear-cliente' }
          })"
        >
          Nuevo cliente
        </button>
      </div>

      <div v-if="cantidadClientePorProfesional > 0" class="table-container">
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
                    Dirección
                  </th>
                  <th class="table-cell table-header">
                    Doble recordatorio
                  </th>
                  <th class="table-cell table-header">
                    Ficha
                  </th>
                  <th class="table-cell table-header">
                    Operaciones
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
                  <td class="table-cell">
                    {{ item.direccion.referencia }}
                  </td>
                  <td class="table-cell">
                    {{ item.doble_recordatorio ? 'Si' : 'No' }}
                  </td>
                  <td class="table-cell">
                    <a :href="`/ficha/${item._id}`" target="_blank">
                      <button class="action-button" style="font-size: small;">
                        Ver Ficha
                      </button>
                    </a>
                  </td>
                  <td class="table-cell">
                    <svg
                      class="ml-6 btnOperacionCliente"
                      xmlns="http://www.w3.org/2000/svg"
                      height="28px"
                      viewBox="0 -960 960 960"
                      width="28px"
                      fill="#6b7280"
                      @click="infoSistemaStore.abrirSideBarOG('operacion-cliente', {
                        dataInicial: {
                          accion: 'actualizar-cliente',
                          idCliente: item._id
                        }
                      })"
                    >
                      <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>
        </ais-hits>
      </div>

      <div v-else-if="cantidadClientePorProfesional === 0" class="flex items-center justify-center">
        <div class="text-center bg-white p-8 rounded-lg">
          <!-- Imagen arriba -->
          <img src="@/assets/images/searching.png" alt="Placeholder Image" class="mx-auto mb-4" />

          <!-- Texto debajo -->
          <p class="text-lg font-semibold mb-4">
            Aún no tienes clientes <span>:(</span>
          </p>

          <!-- Botón debajo del texto -->
          <button
            class="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            @click="infoSistemaStore.abrirSideBarOG('operacion-cliente', {
              dataInicial: { accion: 'crear-cliente' }
            })"
          >
            Agregar mi primer cliente
          </button>
        </div>
      </div>

      <div v-else>
        Cargando..
      </div>

      <ais-pagination class="mb-5">
        <template #default="{ currentRefinement, nbPages, pages, isFirstPage, isLastPage, refine, createURL }">
          <ul class="pagination">
            <li :class="{ 'disabled': isFirstPage }">
              <a
                href="#"
                @click.prevent="refine(currentRefinement - 1)"
              >&laquo;</a>
            </li>
            <li
              v-for="page in pages"
              :key="page"
              :class="{ 'active': currentRefinement === page }"
            >
              <a
                href="#"
                @click.prevent="refine(page)"
              >{{ page + 1 }}</a>
            </li>
            <li :class="{ 'disabled': isLastPage }">
              <a
                href="#"
                @click.prevent="refine(currentRefinement + 1)"
              >&raquo;</a>
            </li>
          </ul>
        </template>
      </ais-pagination>
    </div>
  </ais-instant-search>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, onMounted } from 'vue';
import algoliasearch from 'algoliasearch/lite';

import useInfoSistemaStore from '@/store/info-sistema.store';
import useProfesionalStore from '@/store/profesional.store';
import { agendaliaBorderCard } from '@/helpers';
import BuscadorGenerico from '@/components/BuscadorGenerico.vue';

const searchClient = algoliasearch(
  'BSDBYRKOOD',
  'a7ab8d03e87c362513e7ea4076a29be3'
);
const { VITE_ID_DEV_AMPLIA: idDevAmplia } = import.meta.env;
const indexName = 'cliente';
const searchQuery = ref('');
const infoSistemaStore = useInfoSistemaStore();
const profesionalStore = useProfesionalStore();
const filtros = ref('');
const cantidadClientePorProfesional = ref(-1);

const obtenerEscritura = async (val: string) => {
  searchQuery.value = val;
  // NO ELIMINAR: Sirve como referencia para realizar multiples busquedas
  // const r = await searchClient.search([{
  //   indexName,
  //   params: { query: val, hitsPerPage: 2 }
  // }], {});
  // const rr: any = r.results[0];
  // items.value = rr.hits;
};

const transformItems = (items: any[], data: any) => {
  const { results } = data;
  
  return items.map((item, index) => ({
    ...item,
    position: { index, page: results.page },
  }));
};

obtenerEscritura('');

onMounted(() => {
  filtros.value += `idDevAmplia:${idDevAmplia} `;
  filtros.value += `AND idProfesional:${profesionalStore.getIdProfesionalSeleccionado} `;
});

onBeforeMount(() => {
  cantidadClientePorProfesional.value = 1;
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