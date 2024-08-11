<template>
  <div>
    <pre :class="{ 'resaltar': accion === 'actualizar' }" @click="accion = 'actualizar'">
      actualizar
    </pre>

    <pre :class="{ 'resaltar': accion === 'eliminar' }" @click="accion = 'eliminar'">
      eliminar
    </pre>

    <FormularioCliente
      :idCliente="infoSistemaStore.getOperacionGlobal.dataInicial.idCliente"
      :accion="accion"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
import FormularioCliente from '@/components/operacion-global/FormularioCliente.vue';
import { TAccionFormularioCliente } from '@/models/types';

const infoSistemaStore = useInfoSistemaStore();
const accion = ref<TAccionFormularioCliente>('actualizar');
// const acciones = ref<TAccionFormularioCliente[]>([
//   'actualizar',
//   'eliminar',
// ]);

</script>

<style scoped>
.actualizar {
  
}

.eliminar {
  
}

</style>