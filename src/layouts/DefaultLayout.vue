<template>
  <div
    class="app"
    @keydown.esc="minimizacionGlobal"
  >
    <SideBar />
    <div
      :class="[
        'main-container',
        { 'sidebar-open': infoSistemaStore.getSideBar },
        { 'sidebar-close': !infoSistemaStore.getSideBar },
      ]"
    >
      <NavBar />
      <div v-if="cargandoMainContent">
        <Cargando />
      </div>
      <div v-else class="main-content">
        <h1 v-if="titulo" class="tituloNavBar text-2xl font-bold text-gray-900">
          {{ titulo }}
        </h1>
        <slot />
      </div>

      <div
        @click="minimizarSideBar"
        :class="{
          'overlay-sidebar': infoSistemaStore.getSideBar,
          'no-overlay-sidebar': !infoSistemaStore.getSideBar,
        }"
      />
      <div
        @click="minimizarSideBarOG"
        :class="{
          'overlay-og': infoSistemaStore.getOperacionGlobal.sideBar,
          'no-overlay-og': !infoSistemaStore.getOperacionGlobal.sideBar,
        }"
      />
    </div>

    <!-- Modal de operaciones -->
    <SideBarOperacionGlobal :is-open="infoSistemaStore.getOperacionGlobal.sideBar">
      <OperacionCliente v-if="infoSistemaStore.getOperacionGlobal.id === 'operacion-cliente'" />
      <AgendarCliente v-if="infoSistemaStore.getOperacionGlobal.id === 'agendar-cliente'" />
      <VerAgendamiento v-if="infoSistemaStore.getOperacionGlobal.id === 'ver-agendamiento'" />
      <AgendarHoraLibre v-if="infoSistemaStore.getOperacionGlobal.id === 'agregar-hora-libre'" />
      <ModificarAgenda v-if="infoSistemaStore.getOperacionGlobal.id === 'modificar-agenda'" />
    </SideBarOperacionGlobal>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import OperacionCliente from '@/components/operacion-global/OperacionCliente.vue';
import SideBarOperacionGlobal from '@/components/SideBarOperacionGlobal.vue';
import Cargando from '@/components/Cargando2.vue';
import AgendarCliente from '@/components/operacion-global/AgendarCliente.vue';
import VerAgendamiento from '@/components/operacion-global/VerAgendamiento.vue';
import AgendarHoraLibre from '@/components/operacion-global/AgregarHoraLibre.vue';
import ModificarAgenda from '@/components/operacion-global/ModificarAgenda.vue';
import useInfoSistemaStore from '@/store/info-sistema.store';

const route = useRoute();
const infoSistemaStore = useInfoSistemaStore();
const titulo = ref('');

const minimizacionGlobal = () => {
  if (infoSistemaStore.getOperacionGlobal.sideBar) {
    infoSistemaStore.setOperacionGlobal({
      sideBar: !infoSistemaStore.getOperacionGlobal.sideBar
    });
  } else if (infoSistemaStore.getMenuPerfil) {
    infoSistemaStore.setMenuPerfil(!infoSistemaStore.getMenuPerfil);
  }
}

const minimizarSideBar = () => {
  if (infoSistemaStore.getSideBar) {
    infoSistemaStore.setSidebar(!infoSistemaStore.getSideBar);
  }
}

const minimizarSideBarOG = () => {
  if (infoSistemaStore.getOperacionGlobal.sideBar) {
    infoSistemaStore.setOperacionGlobal({
      sideBar: !infoSistemaStore.getOperacionGlobal.sideBar
    });
  }
};

const cargandoMainContent = computed(() => {
  return true && infoSistemaStore.getCambiandoProfesional;
});

const obtenerTituloNavbar = () => {
  titulo.value = '';

  if (route.path.startsWith('/agenda')) {
    titulo.value = 'Agenda';
  } else if (route.path.startsWith('/clientes') || route.path.startsWith('/pacientes')) {
    titulo.value = 'Clientes';
  } else if (route.path.startsWith('/configuracion')) {
    titulo.value = 'Configuracion';
  } else if (route.path.startsWith('/perfil-profesional')) {
    titulo.value = 'Perfil profesional';
  }  else if (route.path.startsWith('/perfil')) {
    titulo.value = 'Perfil';
  }
};

watch(() => route.path, () => {
  obtenerTituloNavbar();
}, { deep: true });

onBeforeMount(() => {
  obtenerTituloNavbar();
});
</script>

<style scoped>
.main-container {
  position: relative; /* Necesario para el posicionamiento del overlay */
}

.main-content {
  position: relative;
  z-index: 100;
  flex-grow: 1;
  margin-left: 20px;
  margin-right: 20px;
}

.sidebar-open {
  margin-left: 250px;
  transition: 0.6s;
}

.sidebar-close {
  margin-left: 100px;
  transition: 0.6s;
}



@media (max-width: 918px) {
  .sidebar-open {
    margin-left: 0px;
    transition: 0.6s;
  }

  .sidebar-close {
    margin-left: 0px;
    transition: 0.6s;
  }
}

@media (max-width: 660px) {
  .main-content {
    flex-grow: 1;
    margin-left: 0;
    margin-right: 0;
  }
}

</style>
