<template>
  <DefaultLayout/>
</template>

<script setup lang="ts">
import router from '@/router';
import { useProfesionalStore } from '@/store';

// Redireccionar esta pagina a otra
if (!useProfesionalStore().listaProfesional.length) {
  router.push('/perfil-profesional/crear');
} else {
  router.push('/agenda');
}

</script>

