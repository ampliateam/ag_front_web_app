<template>
  <div>
    <div v-if="infoSistemaStore.getCargando && !infoSistemaStore.getExisteUsuarioLogeado">
      Cargando!
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useInfoSistemaStore from '@/store/info-sistema.store';
const infoSistemaStore = useInfoSistemaStore();
</script>
