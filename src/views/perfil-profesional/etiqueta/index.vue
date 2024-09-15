<template>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import router from '@/router';

// Verifica cuando la ruta es /perfil-profesional/etiqueta
const verificacionDeRutaInicial = () => {
  const routeParams = router.currentRoute.value.params;
  if (!routeParams.etiqueta) {
    return router.push('/perfil-profesional/crear');
  }

  const rutaParaVerificar = `/perfil-profesional/${routeParams.etiqueta}`
  if (router.currentRoute.value.fullPath === rutaParaVerificar) {
    return router.push(`${router.currentRoute.value.fullPath}/detalles`);
  }
};

watch(() => router.currentRoute.value.fullPath, () => {
  verificacionDeRutaInicial();
}, { deep: true });

onMounted(() => {
  verificacionDeRutaInicial();
});
</script>