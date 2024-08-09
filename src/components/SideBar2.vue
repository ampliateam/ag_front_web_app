<template>
  <div class="sidebar" :class="{ 'minimized': isMinimized }">
    <div class="sidebar-content" v-if="!isMinimized">
      <!-- Añade aquí el contenido de tu sidebar -->
      <h3>Mi Sidebar</h3>
      <ul>
        <li>Opción 1</li>
        <li>Opción 2</li>
        <li>Opción 3</li>
      </ul>
    </div>
    <div class="toggle-btn" @click="toggleSidebar">
      <span v-if="isMinimized">&#9654;</span>
      <span v-else>&#9664;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMinimized = ref(false);
const emit = defineEmits<{
  (e: 'cambioEstado', value: boolean): void
}>()


const toggleSidebar = () => {
  isMinimized.value = !isMinimized.value;
  emit('cambioEstado', isMinimized.value)
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 250px;
  background-color: #f0f0f0;
  transition: width 0.7s ease;
  overflow-x: hidden;
  z-index: 1000;
}

.minimized {
  width: 50px;
}

.toggle-btn {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}

.sidebar-content {
  padding: 20px;
}
</style>