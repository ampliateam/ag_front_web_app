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
      <div class="main-content">
        <slot />
      </div>
      <div
        @click="minimizarSideBar"
        :class="{
          'overlay': infoSistemaStore.getSideBar,
          'no-overlay': !infoSistemaStore.getSideBar,
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
      <OperacionCliente
        v-if="infoSistemaStore.getOperacionGlobal.id === 'operacion-cliente'"
        :componenteVisible="esOperacionClienteVisible"
      />
      <AgendarCliente
        v-if="infoSistemaStore.getOperacionGlobal.id === 'agendar-cliente'"
        :componenteVisible="esAgendarClienteVisible"
      />
      <VerAgendamiento
        v-if="infoSistemaStore.getOperacionGlobal.id === 'ver-agendamiento'"
        :componenteVisible="esVerAgendamiento"
      />
    </SideBarOperacionGlobal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import NavBar from '@/components/NavBar.vue';
import SideBar from '@/components/SideBar.vue';
import OperacionCliente from '@/components/operacion-global/OperacionCliente.vue';
import SideBarOperacionGlobal from '@/components/SideBarOperacionGlobal.vue'
import AgendarCliente from '@/components/operacion-global/AgendarCliente.vue'
import VerAgendamiento from '@/components/operacion-global/VerAgendamiento.vue'
import useInfoSistemaStore from '@/store/info-sistema.store';

const infoSistemaStore = useInfoSistemaStore();

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

const esOperacionClienteVisible = computed(() => {
  return infoSistemaStore.getOperacionGlobal.id === 'operacion-cliente' && infoSistemaStore.getOperacionGlobal.sideBar;
});

const esAgendarClienteVisible = computed(() => {
  return infoSistemaStore.getOperacionGlobal.id === 'agendar-cliente' && infoSistemaStore.getOperacionGlobal.sideBar;
});

const esVerAgendamiento = computed(() => {
  return infoSistemaStore.getOperacionGlobal.id === 'ver-agendamiento' && infoSistemaStore.getOperacionGlobal.sideBar;
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

.overlay-og {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* Negro con 50% de opacidad */
  z-index: 600; /* Asegúrate de que esté por encima del contenido principal pero por debajo del sidebar */
  transition: 0.6s;
}

.no-overlay-og {
  display: none;
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

@media (max-width: 918px) {
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5); /* Negro con 50% de opacidad */
    z-index: 200; /* Asegúrate de que esté por encima del contenido principal pero por debajo del sidebar */
    transition: 0.6s;
  }

  .no-overlay {
    display: none;
    transition: 0.6s;
  }
}

</style>
