<template>
  <div>
    <TooltipButton 
      v-if="!clienteEliminado"
      button-class="bg-red-500 text-white rounded-md px-3 py-1 mb-5 text-sm"
      tooltip-text="Eliminar cliente"
      @click="showModal = !showModal;"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="#e8eaed"
      >
        <path d="M662-60 520-202l56-56 85 85 170-170 56 57L662-60ZM296-280l-56-56 64-64-64-64 56-56 64 64 64-64 56 56-64 64 64 64-56 56-64-64-64 64ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v254l-80 81v-175H200v400h250l79 80H200Zm0-560h560v-80H200v80Zm0 0v-80 80Z" />
      </svg>
    </TooltipButton>

    <FormularioCliente
      v-if="!clienteEliminado"
      :idCliente="infoSistemaStore.getOperacionGlobal.dataInicial.idCliente"
      :accion="'actualizar'"
    />

    <ConfirmarEliminacion
      v-if="!clienteEliminado && showModal"
      @showModel="showModal = $event;"
      @dataConfirmacion="eliminarCliente($event)"
      :titulo="'Estas seguro de deseas eliminar este cliente?'"
      :advertencia="'Al eliminar este cliente, se perderan todos los datos y no se podra recuperar nuevamente'"
      :valorParaEliminar="infoSistemaStore.getOperacionGlobal.dataInicial.idCliente"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
import FormularioCliente from '@/components/operacion-global/FormularioCliente.vue';
import ConfirmarEliminacion from '@/components/ConfirmarEliminacion.vue';
import TooltipButton from '@/components/TooltipButton.vue';

const infoSistemaStore = useInfoSistemaStore();
const showModal = ref(false);
const clienteEliminado = ref(null);

const eliminarCliente = (idCliente: string) => {
  clienteEliminado.value = {};
}

</script>

<style scoped>
.actualizar {
  
}

.eliminar {
  
}

</style>