<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
  >
    <div class="container">
      <ais-search-box placeholder="Buscar pacientes..." class="search-box" />
      <button class="action-button new-patient">Nuevo Paciente</button>
      
      <ais-hits>
        <template v-slot="{ items }">
          <table class="patient-table">
            <thead>
              <tr>
                <th class="table-cell table-header">Nro</th>
                <th class="table-cell table-header">Nombre y apellido</th>
                <th class="table-cell table-header">Nota</th>
                <th class="table-cell table-header">Contacto</th>
                <th class="table-cell table-header">Dirección</th>
                <th class="table-cell table-header">Doble recordatorio</th>
                <th class="table-cell table-header">Ficha</th>
                <th class="table-cell table-header">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in items" :key="item.objectID">
                <td class="table-cell">{{ index + 1 }}</td>
                <td class="table-cell patient-name">{{ item.nombre_apellido }}</td>
                <td class="table-cell">{{ item.nota }}</td>
                <td class="table-cell">{{ item.contacto }}</td>
                <td class="table-cell">{{ item.direccion.referencia }}</td>
                <td class="table-cell">{{ item.doble_recordatorio ? 'Si' : 'No' }}</td>
                <td class="table-cell">
                  <button class="action-button">Ver Ficha</button>
                </td>
                <td class="table-cell">...</td>
              </tr>
            </tbody>
          </table>
        </template>
      </ais-hits>
      
      <ais-pagination>
        <template v-slot="{ currentRefinement, nbPages, pages, isFirstPage, isLastPage, refine, createURL }">
          <ul class="pagination">
            <li :class="{ 'disabled': isFirstPage }">
              <a href="#" @click.prevent="refine(currentRefinement - 1)">&laquo;</a>
            </li>
            <li v-for="page in pages" :key="page" :class="{ 'active': currentRefinement === page }">
              <a href="#" @click.prevent="refine(page)">{{ page + 1 }}</a>
            </li>
            <li :class="{ 'disabled': isLastPage }">
              <a href="#" @click.prevent="refine(currentRefinement + 1)">&raquo;</a>
            </li>
          </ul>
        </template>
      </ais-pagination>
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite';

export default {
  data() {
    return {
      searchClient: algoliasearch(
        'BSDBYRKOOD',
        'a7ab8d03e87c362513e7ea4076a29be3'
      ),
      indexName: 'cliente',
    };
  },
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.search-box {
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
  background-color: #6200EE;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.new-patient {
  float: right;
  margin-bottom: 10px;
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
  background-color: #6200EE;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
}

.pagination .active a {
  background-color: #3700B3;
}

.pagination .disabled a {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>