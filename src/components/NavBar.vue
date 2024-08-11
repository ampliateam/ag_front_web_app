<template>
  <nav class="bg-white">
    <div class="px-4 sm:px-3 lg:px-3">
      <div class="flex justify-between items-center h-16">
        <div class="flex-shrink-0 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
            class="boton-menu"
            @click="cambioEstadoSideBar"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
          <h1 class="tituloNavBar text-2xl font-bold text-gray-900">
            {{ obtenerTituloNavbar() }}
          </h1>
        </div>
        <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
          <div class="max-w-lg w-full lg:max-w-xs">
            <BuscadorGenerico :conSlot="true">
              <div class="appglobal-input-container">
                <input
                  class="buscadorFalso block w-full pl-10 pr-3 py-2 bg-gray-100 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Busca lo que necesites"
                  style="cursor: pointer;"
                  @click="abrirSideBarOG('buscador-global')"
                >
              </div>
            </BuscadorGenerico>
          </div>
        </div>
        <div class="ml-4 flex items-center md:ml-6">
          <div class="ml-3 relative">
            <div>
              <button
                type="button"
                class="max-w-xs bg-white flex items-center text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                id="user-menu-button"
                aria-expanded="false"
                aria-haspopup="true"
                @click="toggleProfileMenu"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-lg"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                >
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="profile-menu">
      <MenuPerfil />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
// import algoliasearch from 'algoliasearch/lite';
import useInfoSistemaStore from '@/store/info-sistema.store';
import BuscadorGenerico from '@/components/BuscadorGenerico.vue';
import MenuPerfil from '@/components/MenuPerfil.vue';
import { TOperacionGlobalID } from '@/interfaces/models';

// const searchClient = algoliasearch(
//   'BSDBYRKOOD',
//   'a7ab8d03e87c362513e7ea4076a29be3'
// );
// const indexName: 'cliente';
const selectedIndex = ref(0);
const infoSistemaStore = useInfoSistemaStore();

const abrirSideBarOG = (id: TOperacionGlobalID) => {
  infoSistemaStore.abrirSideBarOG(id);
};

const obtenerTituloNavbar = () => {
  if (selectedIndex.value === 1) return 'Agenda';
  else if (selectedIndex.value === 2) return 'Clientes';
  else if (selectedIndex.value === 3) return 'Configuracion';
  else if (selectedIndex.value === 4) return 'Perfil';
  else return 'Agendalia'
};

const cambioEstadoSideBar = () => {
  infoSistemaStore.setSidebar(!infoSistemaStore.getSideBar);
};

const toggleProfileMenu = () => {
  infoSistemaStore.setMenuPerfil(!infoSistemaStore.getMenuPerfil);
};

onMounted(() => {
  const route = useRoute();

  if (route.path.startsWith('/agenda')) {
    selectedIndex.value = 1;
  } else if (route.path.startsWith('/clientes') || route.path.startsWith('/pacientes')) {
    selectedIndex.value = 2;
  } else if (route.path.startsWith('/configuracion')) {
    selectedIndex.value = 3;
  } else if (route.path.startsWith('/perfil')) {
    selectedIndex.value = 4;
  } else {
    selectedIndex.value = 0;
  }
});

</script>

<style scoped>
.boton-menu {
  cursor: pointer;
  margin-left: 7px;
  margin-right: 12px;
}

.profile-menu {
  position: relative;
}

.buscadorFalso:hover {
  box-shadow: 0 1.1px 6.9px 1.1px rgba(0, 0, 0, 0.3);
}

@media (min-width: 919px) {
  .boton-menu {
    display: none;
  }
}

@media (max-width: 600px) {
  .tituloNavBar {
    display: none;
  }
}
</style>