<template>
  <div class="containerAux mt-6 mb-6">
    <div class="left">
      <div :class="agendaliaBorderCard">
        <!-- Formulario -->
        <FormularioProfesional
          v-if="profesional"
          :accion="accionFormulario"
          :modeloInicial="profesional"
        />
      </div>
    </div>
    <div class="right">
      <!-- Agregar terminos y condiciones de profesional aqui -->
      <CardFuncionalidad
        class="mb-4"
        titulo="Terminos y condiciones"
        :etiqueta="{ texto: 'Proximamente', mostrar: true }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import FormularioProfesional from '@/components/FormularioProfesional.vue';
import CardFuncionalidad from '@/components/CardFuncionalidad.vue';
import { TAccionFormularioProfesional } from '@/models/types';
import { agendaliaBorderCard, getUbicacion } from '@/helpers';

const profesional = ref(null);
const accionFormulario = ref<TAccionFormularioProfesional>('crear');

onMounted(async () => {
  profesional.value = { 
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