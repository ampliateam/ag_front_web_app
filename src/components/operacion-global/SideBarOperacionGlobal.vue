<template>
  <div :class="{ 'sidebar-open': props.isOpen }">
    <div class="sidebar-operacion-global">
      <!-- Scroll -->
      <div class="modal">
        <header class="modal-header">
          <h2 class="modal-title">{{ infoSistemaStore.getOperacionGlobal.titulo }}</h2>
          <button class="modal-close" @click="close">×</button>
        </header>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
const infoSistemaStore = useInfoSistemaStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
});

const close = () => {
  infoSistemaStore.setOperacionGlobal({
    sideBar: !infoSistemaStore.getOperacionGlobal.sideBar
  });
}
</script>

<style scoped>
.sidebar-open {
  display: block;
}

.sidebar-operacion-global {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  transition: transform 0.3s ease-in-out;
  transform: translateX(100%);
  z-index: 700;
}

.sidebar-open .sidebar-operacion-global {
  transform: translateX(0);
}



/* Scroll */
.modal {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  width: 100%;
  max-width: 100%;
  background-color: white;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 15px;
}

.modal-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
}

@media (max-width: 918px) {
  .sidebar-operacion-global {
    width: 100%;
  }
}
</style>