<template>
  <div class="containerAux mt-6 mb-6">
    <div class="left">
      <div :class="agendaliaBorderCard">
        <!-- Formulario -->
        <TooltipHover
          :text="'Onboarding en proceso...'"
          :position="'derecha'"
          :disabled="true"
        >
          <div>
            <FormularioProfesional
              v-if="profesionalSeleccionado"
              :accion="accionFormulario"
              :modeloInicial="profesionalSeleccionado"
            />
          </div>
        </TooltipHover>
      </div>
    </div>
    <div class="right">
      <!-- Agregar otras funcionalidades con relacion al profesional -->
      <CardFuncionalidad
        v-if="profesionalSeleccionado"
        class="mb-4"
        titulo="Seleccionar profesional"
        :funcionalidad="{
          tipo: 'seleccion-profesional',
          data: { idProfesional: profesionalSeleccionado.id },
        }"
      />
      <CardFuncionalidad
        class="mb-4"
        titulo="¡Nuevas funcionalidades!"
        :etiqueta="{ texto: 'Proximamente', mostrar: true }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from 'vue';
import FormularioProfesional from '@/components/FormularioProfesional.vue';
import CardFuncionalidad from '@/components/CardFuncionalidad.vue';
import TooltipHover from '@/components/TooltipHover.vue';
import { TAccionFormularioProfesional } from '@/models/types';
import { useProfesionalStore } from '@/store';
import { agendaliaBorderCard } from '@/helpers';
import router from '@/router';

const profesionalStore = useProfesionalStore();

const accionFormulario = ref<TAccionFormularioProfesional>('actualizar');
const indexProfesionalSeleccionado = ref(-1);
const profesionalSeleccionado = ref(null);

watch(() => router.currentRoute.value.fullPath, () => {
  const routeParams = router.currentRoute.value.params;
  if (!routeParams.etiqueta) return;
  
  indexProfesionalSeleccionado.value = profesionalStore.listaProfesional.findIndex(v => v.etiqueta === routeParams.etiqueta);
  profesionalSeleccionado.value = profesionalStore.listaProfesional[indexProfesionalSeleccionado.value];
}, { deep: true });

onBeforeMount(async () => {
  const routeParams = router.currentRoute.value.params;
  if (!routeParams.etiqueta) return;

  indexProfesionalSeleccionado.value = profesionalStore.listaProfesional.findIndex(v => v.etiqueta === routeParams.etiqueta);
  profesionalSeleccionado.value = profesionalStore.listaProfesional[indexProfesionalSeleccionado.value];
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