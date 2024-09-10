<template>
  <DefaultLayout>
    <div class="">
      <!-- Lista horizontal scrolleable -->
      <div class="list-prof-etiqueta overflow-x-auto whitespace-nowrap mt-3 mb-5">
        <ul class="inline-flex space-x-4">
          <li
            @click="procesoCrear();"
            class="cursor-pointer p-4 border rounded-lg bg-green-500 text-white"
            :class="{ 'bg-green-700 text-white': selectedIndex === -1 }"
          >
            + Nuevo profesional
          </li>
          <li
            v-for="(item, index) in profesionalStore.listaProfesional"
            :key="index"
            @click="selectItem(index);"
            class="cursor-pointer p-4 border rounded-lg"
            :class="{ 
              'bg-blue-300 text-white': selectedIndex === index,
              'bg-blue-500 text-white': selectedIndex !== index,
            }"
          >
            {{ getNombreEtiquetaProfesional(item.etiqueta, 'propio') }}
          </li>
        </ul>
      </div>
      
      <div class="containerAux mt-6 mb-6">
        <div class="left">
          <div :class="agendaliaBorderCard">
            <!-- Formulario -->
            <FormularioProfesional
              v-if="selectedItem"
              :accion="accionFormulario"
              :modeloInicial="selectedItem"
            />
          </div>
        </div>
        <div class="right">
          <div v-if="accionFormulario === 'crear'">
            <!-- Agregar terminos y condiciones de profesional aqui -->
            Terminos y condiciones
          </div>
          <div v-else>
            <!-- Agregar otras funcionalidades con relacion al profesional -->
            <CardFuncionalidad
              v-if="selectedItem"
              class="mb-4"
              :funcionalidad="{
                texto: 'Seleccionar profesional',
                tipo: 'seleccion-profesional',
                data: { idProfesional: selectedItem.id },
              }"
            />
            <CardFuncionalidad
              class="mb-4"
              :funcionalidad="{ texto: '¡Nuevas funcionalidades!' }"
              :etiqueta="{texto: 'Proximamente', mostrar: true}"
            />
          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount } from 'vue';
  import FormularioProfesional from '@/components/FormularioProfesional.vue';
  import CardFuncionalidad from '@/components/CardFuncionalidad.vue';
  import { etiquetaProfesional, getUbicacion, agendaliaBorderCard } from '@/helpers';
  import useProfesionalStore from '@/store/profesional.store';
  import useUsuarioStore from '@/store/usuario-logeado.store';
  import { TAccionFormularioProfesional } from '@/models/types';
  import router from '@/router';

  const profesionalStore = useProfesionalStore();
  const usuarioStore = useUsuarioStore();

  const accionFormulario = ref<TAccionFormularioProfesional>('actualizar');
  const selectedIndex = ref(0);
  const selectedItem = ref(null);

  const procesoCrear = () => {
    selectedIndex.value = -1;
    selectedItem.value = { 
      id: '',
      idUsuario: '',
      contactos: [],
      direccion: { referencia: '', ubicacion: getUbicacion() },
      etiqueta: 'otro',
      fotoPerfil: '',
      fotoPortada: '',
      estado: 'habilitado',
      fechaCreacion: new Date(),
      fechaEliminacion: null,
    };
    accionFormulario.value = 'crear';
  };

  const selectItem = (index: number) => {
    selectedIndex.value = index;
    selectedItem.value = { ...profesionalStore.listaProfesional[index] };
    accionFormulario.value = 'actualizar';
  };

  // const nombreEtiquetaProfesionalSimple = (etiqueta: string) => {
  //   return etiquetaProfesional.simple(etiqueta);
  //   etiquetaProfesional.propio(etiqueta)
  // };

  const getNombreEtiquetaProfesional = (etiqueta: string, tipo: string) => {
    return etiquetaProfesional[tipo](etiqueta);
  };

  onBeforeMount(async () => {
    const i1 = profesionalStore.listaProfesional.findIndex(v => {
      return v.id === profesionalStore.idProfesionalSeleccionado;
    });

    if (i1 === -1) {
      await profesionalStore.cargarListaProfesional(usuarioStore.getUid);

      const i2 = profesionalStore.listaProfesional.findIndex(v => {
        return v.id === profesionalStore.idProfesionalSeleccionado;
      });

      if (i2 === -1) return procesoCrear();

      if (router.currentRoute.value.query['creacion-profesional']) return procesoCrear();

      return selectItem(i2);
    }

    if (router.currentRoute.value.query['creacion-profesional']) return procesoCrear();
    selectItem(i1);
  });
</script>

<style scoped>
.containerAux {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 1200px;
  /* margin: 20px auto; */
}

.left {
  width: 55%;
  /* padding: 20px; */
  /* text-align: center; */
  transition: all 0.3s ease-in-out;
}

.right {
  width: 45%;
  /* padding: 20px; */
  /* text-align: center; */
  transition: all 0.3s ease-in-out;
}

/* Media query para cambiar el diseño al llegar a 500px de ancho del viewport */
@media (max-width: 900px) {
  .agendalia-border-card {
    width: 97%;
  }

  .containerAux {
    flex-direction: column;
  }
  
  .left, .right {
    width: 100%;
  }

  .left {
    margin-bottom: 20px;
  }
}

@media (max-width: 660px) {
  .list-prof-etiqueta {
    margin-left: 7px;
    margin-right: 7px;
  }
}
</style>