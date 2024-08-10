<template>
  <div class="app" @keydown.esc="minimizacionGlobal">
    <SideBar3 />
    <div
      :class="[
        'main-container',
        { 'sidebar-open': infoSistemaStore.getSideBar },
        { 'sidebar-close': !infoSistemaStore.getSideBar },
      ]"
    >
      <NavBar2 />
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
    <!-- <div :class="{
      'operacion-habilitada': !!infoSistemaStore.getOperacionGlobal.id,
      'operacion-deshabilitada': !infoSistemaStore.getOperacionGlobal.id
    }">
      <Componente1 v-if="infoSistemaStore.getOperacionGlobal.id === 'buscador-global'" />
    </div> -->
    <SideBarOperacionGlobal :isOpen="infoSistemaStore.getOperacionGlobal.sideBar">
      <!-- Contenido del sidebar aquí -->
      <!-- <h2>Sidebar: {{ infoSistemaStore.getOperacionGlobal.id }}</h2>
      <ul>
        <li>Opción 1</li>
        <li>Opción 2</li>
        <li>Opción 3</li>
      </ul> -->
      <CrearCliente v-if="infoSistemaStore.getOperacionGlobal.id === 'crear-cliente'" />
    </SideBarOperacionGlobal>
  </div>
</template>

<script lang="ts" setup>
import NavBar2 from '@/components/NavBar2.vue';
import SideBar3 from '@/components/SideBar3.vue';
import CrearCliente from '@/components/operacion-global/CrearCliente.vue';
import SideBarOperacionGlobal from '@/components/operacion-global/SideBarOperacionGlobal.vue'
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
}
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
  margin-left: 110px;
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
