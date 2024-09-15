<template>
  <div>
    <TooltipHover
      v-if="infoSistemaStore.getOperacionGlobal.dataInicial.accion !== 'crear-cliente' && !clienteEliminado"
      text="Eliminar cliente"
      position="derecha"
    >
      <button
        class="bg-red-500 text-white rounded-md px-3 py-1 mb-5 text-sm"
        @click="modalEliminarCliente = !modalEliminarCliente;"
        :disabled="!clienteData"
      >
        <svg
          style="display: inline-block;"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#e8eaed"
        >
          <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
        </svg>

        <span
          class="ml-1"
          style="display: inline-block;"
        >
          Eliminar
        </span>
      </button>
    </TooltipHover>

    <FormularioCliente
      v-if="clienteData && !clienteEliminado"
      :accion="accionFormulario"
      :modeloInicial="clienteData"
      @actualizacionFormulario="actualizarDataGlobal($event)"
    />

    <ConfirmarEliminacion
      v-if="clienteData && !clienteEliminado && modalEliminarCliente"
      @showModel="modalEliminarCliente = $event;"
      @dataConfirmacion="eliminarCliente($event)"
      :titulo="'Estas seguro de deseas eliminar este cliente?'"
      :advertencia="'Al eliminar este cliente, se perderan todos los datos y no se podra recuperar nuevamente'"
      :valorParaEliminar="infoSistemaStore.getOperacionGlobal.dataInicial.idCliente"
    />

    <div v-if="!!clienteEliminado">
      Cliente eliminado
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
} from 'vue';
import { useInfoSistemaStore } from '@/store';
import FormularioCliente from '@/components/FormularioCliente.vue';
import ConfirmarEliminacion from '@/components/ConfirmarEliminacion.vue';
import TooltipHover from '@/components/TooltipHover.vue';
import { TAccionFormularioCliente } from '@/models/types';
import { getUbicacion } from '@/helpers';

const infoSistemaStore = useInfoSistemaStore();
const accionFormulario = ref<TAccionFormularioCliente>('obtener');
const clienteData = ref(null);
const modalEliminarCliente = ref(false);
const clienteEliminado = ref(false);

const obtenerCliente = async (idCliente: string) => {
  const d = {};
  
  d['id'] = idCliente;
  d['nombre'] = 'Nombre ' + infoSistemaStore.getOperacionGlobal.dataInicial.idCliente;
  d['apellido'] = 'Apellido' + infoSistemaStore.getOperacionGlobal.dataInicial.idCliente;
  d['nota'] = '';
  d['fechaNacimiento'] = '2024-08-13';
  d['direccion'] = {};
  d['contactos'] = [];
  d['direccion'].referencia = 'Una referencia';
  d['direccion'].ubicacion = getUbicacion() as any;
  d['contactos'].push(...[
    {
      tipo: 'telefono-movil',
      codigoTelefono: '+595',
      telefono: '969696969',
      correo: null
    },
    {
      tipo: 'correo',
      codigoTelefono: null,
      telefono: null,
      correo: 'correo@gmail.com'
    }
  ]);

  return d;
}

const eliminarCliente = async (idCliente: string) => {
  console.log('Cliente eliminado: ', idCliente)
  clienteEliminado.value = true;
};

const inicializarDatosDeCliente = async () => {
  clienteData.value = null;
  
  // Si no hay data en OG quiere decir que hubo un cambio de operacion
  const hayDataEnOG = Object.keys(infoSistemaStore.getOperacionGlobal.data).length;
  const clienteDataAux = JSON.parse(JSON.stringify(infoSistemaStore?.getOperacionGlobal?.data || {}));

  if (infoSistemaStore.getOperacionGlobal.dataInicial.accion === 'crear-cliente') {
    accionFormulario.value = 'crear';
    if (hayDataEnOG) clienteData.value = clienteDataAux;
    else {
      clienteData.value = {
        id: '',
        nombre: '',
        apellido: '',
        nota: '',
        fechaNacimiento: '',
        direccion: { referencia: '', ubicacion: getUbicacion() },
        contactos: [],
      };
    }
  } else if (infoSistemaStore.getOperacionGlobal.dataInicial.accion === 'ver-cliente') {
    accionFormulario.value = 'obtener';
    if (hayDataEnOG) clienteData.value = clienteDataAux;
    else {
      const d = await obtenerCliente(infoSistemaStore.getOperacionGlobal.dataInicial.idCliente);
      clienteData.value = d;
    }
  } else if (infoSistemaStore.getOperacionGlobal.dataInicial.accion === 'actualizar-cliente') {
    accionFormulario.value = 'actualizar';
    if (hayDataEnOG) clienteData.value = clienteDataAux;
    else {
      const d = await obtenerCliente(infoSistemaStore.getOperacionGlobal.dataInicial.idCliente);
      clienteData.value = d;
    }
  }

  infoSistemaStore.setOperacionGlobal({
    data: clienteData.value,
  });
};

const actualizarDataGlobal = (data: object) => {
  infoSistemaStore.setOperacionGlobal({ data });
};

onMounted(async () => {
  await inicializarDatosDeCliente();
});
</script>

<style scoped>
.actualizar {
  
}

.eliminar {
  
}

</style>