<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
  >
    <ais-configure :hitsPerPage="10" />

    <div class="containerV2">
      <div class="search-and-button">
        <ais-search-box style="width: 100% !important;">
          <template #default="{ currentRefinement, isSearchStalled, refine }">
            <BuscadorGenerico
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
          @click="infoSistemaStore.abrirSideBarOG('crear-cliente')"
        >
          Nuevo cliente
        </button>
      </div>

      <div class="table-container">
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
                  <!-- <td class="table-cell">
                    <a :href="`/cliente/${item.id}`" target="_blank">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5d5fef"
                        class="verCliente"
                      >
                        <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
                      </svg>
                    </a>
                  </td> -->
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
                    <a :href="`/ficha/${item.id}`" target="_blank">
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
                        dataInicial: { idCliente: item.id }
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

      <ais-pagination>
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
import { ref } from 'vue';
import algoliasearch from 'algoliasearch/lite';

import useInfoSistemaStore from '@/store/info-sistema.store';
import BuscadorGenerico from '@/components/BuscadorGenerico.vue';
import { TOperacionGlobalID } from '@/models/types';

const searchClient = algoliasearch(
  'BSDBYRKOOD',
  'a7ab8d03e87c362513e7ea4076a29be3'
);
const indexName = 'cliente';
const searchQuery = ref('');
const infoSistemaStore = useInfoSistemaStore();

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

</script>

<style scoped>
.containerV2 {
  font-family: Arial, sans-serif;
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 2px 2px 5px 2px rgba(0,0,0,0.2);
  width: 100%;
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

@media (max-width: 660px) {
  .containerV2 {
    font-family: Arial, sans-serif;
    background-color: white;
    border-radius: 0px;
    padding: 10px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    width: 100%;
  }
}

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