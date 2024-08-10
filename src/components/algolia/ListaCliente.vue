<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
  >
    <ais-configure :hitsPerPage="1" />

    <div class="containerV2">
      <div class="search-and-button">
        <ais-search-box>
          <template #default="{ currentRefinement, isSearchStalled, refine }">
            <BuscadorGenerico
              :conSlot="true"
              @escritura="obtenerEscritura"
            >
              <input
                id="search"
                name="search"
                :value="currentRefinement"
                @input="refine($event.currentTarget.value)"
                class="outline outline-offset-2 outline-blue-500 block w-full pl-10 pr-3 py-2 bg-gray-100 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Busca clientes"
              >
            </BuscadorGenerico>
            <span :hidden="!isSearchStalled">Loading...</span>
          </template>
        </ais-search-box>

        <button class="action-button new-patient">
          Nuevo cliente
        </button>
      </div>

      <div class="table-container">
        <ais-hits>
          <template #default="{ items }">
            <table class="patient-table">
              <thead>
                <tr>
                  <th class="table-cell table-header">
                    Nro
                  </th>
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
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.objectID"
                >
                  <!-- {{ item }} -->
                  <td class="table-cell">
                    {{ index + 1 }}
                  </td>
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
                    <button class="action-button">
                      Ver Ficha
                    </button>
                  </td>
                  <td class="table-cell">
                    ...
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

import BuscadorGenerico from '@/components/BuscadorGenerico.vue';

const searchClient = algoliasearch(
  'BSDBYRKOOD',
  'a7ab8d03e87c362513e7ea4076a29be3'
);
const indexName = 'cliente';
const searchQuery = ref('');
// const items = ref([]);

const obtenerEscritura = async (val: string) => {
  searchQuery.value = val;
  // const r = await searchClient.search([{
  //   indexName,
  //   params: { query: val, hitsPerPage: 2 }
  // }], {});
  // const rr: any = r.results[0];
  // items.value = rr.hits;
}

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

.search-box {
  flex-grow: 1;
  margin-right: 10px;
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
  padding: 8px 16px;
  border-radius: 4px;
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
    padding: 20px;
    box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
    width: 100%;
  }
}

@media (max-width: 600px) {
  .search-and-button {
    flex-direction: column-reverse;
    align-items: stretch;
  }

  .search-box {
    margin-right: 0;
    margin-top: 10px;
  }

  .new-patient {
    width: 100%;
  }
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #5d5fef;
  font-size: 20px;
  cursor: pointer;
}


</style>