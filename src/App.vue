<template>
  <div>
    <div v-if="infoSistemaStore.getCargando">
      <Cargando />
    </div>
    <div v-else>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Cargando from '@/components/Cargando.vue';
import { useInfoSistemaStore } from '@/store';
const infoSistemaStore = useInfoSistemaStore();
</script>

<style>
  body {
    background-color: #F8F9FA;
  }
</style>
