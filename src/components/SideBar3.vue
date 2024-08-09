<template>
  <!-- Barra lateral -->
  <div
    id="sideNav"
    class="sidebar lg:block bg-white w-64 h-screen fixed rounded-none border-none"
    :class="{ 'minimized': !infoSistemaStore.getSideBar }"
  >
    <!-- LOGO -->
    <router-link
      :to="'#'"
      class="pt-10 space-y-7"
    >
      <div class="flex align-center mt-2 ml-3 mb-3 pt-3">
        <div class="rhombus ml-5">
          <svg
            class="h-7 w-7 text-white pt-1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="rotate: -45deg"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
            />
            <rect
              x="4"
              y="5"
              width="16"
              height="16"
              rx="2"
            />
            <line
              x1="16"
              y1="3"
              x2="16"
              y2="7"
            />
            <line
              x1="8"
              y1="3"
              x2="8"
              y2="7"
            />
            <line
              x1="4"
              y1="6"
              x2="20"
              y2="6"
            />
            <line
              x1="4"
              y1="7"
              x2="20"
              y2="7"
            />
            <line
              x1="4"
              y1="8"
              x2="20"
              y2="8"
            />
          </svg>
        </div>
        <h2
          v-if="infoSistemaStore.getSideBar"
          class="px-4 font-extrabold text-lg text-blue-950"
        >
          Agendalía
        </h2>
      </div>
    </router-link>

    <hr class="h-px mt-6 bg-gray-200 border-10 dark:bg-gray-700">

    <!-- Items -->
    <div 
      class="sidebar-content"
    >
      <div class="text-sm">
        <router-link
          :to="'/agenda'"
          class="px-2 py-3 mx-3 flex items-center space-x-4 rounded-xl text-gray-500 group"
          :class="{
            'font-semibold bg-indigo-500 text-white': selectedIndex === 1,
          }"
          @click="selectItem(1)"
        >
          <i class="fas fa-exchange-alt" />
          <svg
            class="h-6 w-6"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              'text-white': selectedIndex === 1,
              'text-gray-500': selectedIndex !== 1,
            }"
          >
            <path
              stroke="none"
              d="M0 0h24v24H0z"
            />
            <rect
              x="4"
              y="5"
              width="16"
              height="16"
              rx="2"
            />
            <line
              x1="16"
              y1="3"
              x2="16"
              y2="7"
            />
            <line
              x1="8"
              y1="3"
              x2="8"
              y2="7"
            />
            <line
              x1="4"
              y1="11"
              x2="20"
              y2="11"
            />
            <line
              x1="11"
              y1="15"
              x2="12"
              y2="15"
            />
            <line
              x1="12"
              y1="15"
              x2="12"
              y2="18"
            />
          </svg>
          <span v-if="infoSistemaStore.getSideBar">Agenda</span>
        </router-link>

        <router-link
          :to="'/clientes'"
          class="px-2 py-3 my-4 mx-3 flex items-center space-x-4 rounded-xl text-gray-500 group"
          :class="{
            'font-semibold bg-indigo-500 text-white': selectedIndex === 2,
          }"
          @click="selectItem(2)"
        >
          <i class="fas fa-wallet" />
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              'text-white': selectedIndex === 2,
              'text-gray-500': selectedIndex !== 2,
            }"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle
              cx="9"
              cy="7"
              r="4"
            />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span v-if="infoSistemaStore.getSideBar">Pacientes</span>
        </router-link>

        <router-link
          :to="'configuracion'"
          class="px-2 py-3 my-4 mx-3 flex items-center space-x-4 rounded-xl text-gray-500 group"
          :class="{
            'font-semibold bg-indigo-500 text-white': selectedIndex === 3,
          }"
          @click="selectItem(3)"
        >
          <i class="fas fa-user" />
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              'text-white': selectedIndex === 3,
              'text-gray-500': selectedIndex !== 3,
            }"
          >
            <circle
              cx="12"
              cy="12"
              r="3"
            />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83
          2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33
          1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0
          1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2
          2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82
          1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0
          4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83
          0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2
          2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0
          0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2
          2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
            />
          </svg>
          <span v-if="infoSistemaStore.getSideBar">Configuración</span>
        </router-link>

        <hr class="h-px bg-gray-200 border-10 dark:bg-gray-700">

        <router-link
          :to="'#'"
          class="px-2 py-3 my-4 mx-3 flex items-center space-x-4 rounded-xl text-gray-500 group"
          :class="{
            'font-semibold bg-indigo-500 text-white': selectedIndex === 4,
          }"
          @click="
            selectItem(4);
            logout();
          "
        >
          <i class="fas fa-sign-out-alt" />
          <svg
            class="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            :class="{
              'text.white': selectedIndex === 4,
              'text-gray-500': selectedIndex !== 4,
            }"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line
              x1="21"
              y1="12"
              x2="9"
              y2="12"
            />
          </svg>
          <span v-if="infoSistemaStore.getSideBar">Cerrar sesión</span>
        </router-link>
      </div>
    </div>

    <div class="bottom-button-container">
      <div
        class="px-2 py-3 my-4 mx-3 flex items-center space-x-4 rounded-xl text-gray-500 group"
        style="cursor: pointer;"
        @click="cambioEstadoSideBar"
      >
        <i />
        <svg
          v-if="!infoSistemaStore.getSideBar"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#6b7280"
        >
          <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
        </svg>

        <svg
          v-if="infoSistemaStore.getSideBar"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-500"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#6b7280"
        >
          <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
        </svg>
        <span v-if="infoSistemaStore.getSideBar">Atras</span>
      </div>
    </div>

    <!-- <div class="bottom-button-container">
      <button
        class="bottom-button"
        @click="cambioEstadoSideBar"
      >
        Botón Inferior
      </button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import useInfoSistemaStore from '@/store/info-sistema.store';
import usuarioLogeadoStore from '@/store/usuario-logeado.store';
import router from '@/router';

const selectedIndex = ref(1);
const infoSistemaStore = useInfoSistemaStore();

const emit = defineEmits<{
  (e: 'cambioEstado', value: boolean): void
}>();

const cambioEstadoSideBar = () => {
  infoSistemaStore.setSidebar(!infoSistemaStore.getSideBar);
  emit('cambioEstado', !infoSistemaStore.getSideBar);
};

function selectItem(index: number) {
  if (selectedIndex.value === index) return;
  selectedIndex.value = index;
}

async function logout() {
  const userStore = usuarioLogeadoStore();
  await userStore.logout();
  router.push('/inicio-sesion');
}

onMounted(() => {
  const route = useRoute();

  if (route.path.startsWith('/agenda')) {
    selectedIndex.value = 1;
  } else if (route.path.startsWith('/clientes') || route.path.startsWith('/pacientes')) {
    selectedIndex.value = 2;
  } else if (route.path.startsWith('/configuracion')) {
    selectedIndex.value = 3;
  } else {
    selectedIndex.value = 0;
  }
});
</script>

<style scoped>
.rhombus {
  width: 33px; /* Adjust width as needed */
  height: 33px; /* Adjust height as needed */
  background-color: #5d5fef; /* Change color as desired */
  transform: rotate(45deg); /* Rotate 45 degrees for rhombus shape */
  border-radius: 17%; /* Set rounded corners with 50% radius (full circle) */
}

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #ffffff;
  transition: width 0.6s;
  overflow-x: hidden;
  z-index: 300;
}

.minimized {
  width: 100px;
}

.sidebar-content {
  padding-top: 20px;
  padding-left: -20px;
}

.bottom-button-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.bottom-button {
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.bottom-button:hover {
  background-color: #45a049;
}

@media (max-width: 918px) {
  .minimized {
    width: 0px;
  }
}
</style>
