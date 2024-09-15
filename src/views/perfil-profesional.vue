<template>
  <DefaultLayout>
    <div class="my-5">
      <TabConjunto>
        <div v-for="tabProfesional in tabsProfesionales" :key="tabProfesional.id">
          <TabUnidad :tab="tabProfesional" />
        </div>
      </TabConjunto>
    </div>

    <div v-if="!estaEnPaginaCreacionProfesional()" class="my-5">
      <TabConjunto>
        <div v-for="tabFuncionalidad in tabsFuncionalidad" :key="tabFuncionalidad.id">
          <TabUnidad :tab="tabFuncionalidad" />
        </div>
      </TabConjunto>
    </div>

    <!-- <div class="my-5">
      <Tabs :tabs="tabsProfesionales" />
    </div> -->

    <!-- <div v-if="!estaEnPaginaCreacionProfesional()" class="my-5">
      <Tabs v-if="tabsFuncionalidad.length" :tabs="tabsFuncionalidad" />
    </div> -->

    <RouterView></RouterView>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import { ref, onBeforeMount, watch } from 'vue';
  import router from '@/router';
  import { useProfesionalStore } from '@/store';
  import { etiquetaProfesional } from '@/helpers';
  import TabConjunto from '@/components/Tab/TabConjunto.vue';
  import TabUnidad from '@/components/Tab/TabUnidad.vue';

  const profesionalStore = useProfesionalStore();

  // const indiceTabProfesionalSeleccionado = ref(0);
  const tabsProfesionales = ref([]);

  // const indiceTabFuncionalidadSeleccionado = ref(0);
  const tabsFuncionalidad = ref([]);

  // const procesoIndiceTabProfesionalSeleccionado = (indexTabProfesional: number) => {
  //   indiceTabProfesionalSeleccionado.value = indexTabProfesional;

  //   // Creacion de profesional
  //   if (indexTabProfesional === 0) return seleccionarProfesional(-1);
    
  //   // Proceso de operacion generico (detalles)
  //   seleccionarProfesional(indexTabProfesional-1);
  //   seleccionarFuncionalidad(0);
  // };

  // const procesoIndiceTabFuncionalidadSeleccionado = (indexTab: number) => {
  //   indiceTabFuncionalidadSeleccionado.value = indexTab;
  //   const idFuncionalidadSeleccionado = tabsFuncionalidad[indiceTabFuncionalidadSeleccionado.value].id;
    
  //   const idProfesionalSeleccionado = tabsProfesionales[indiceTabProfesionalSeleccionado.value].id;
  //   const profesionalSeleccionado = profesionalStore.listaProfesional.find(v => v.id === idProfesionalSeleccionado);
  //   const rutaRedireccion = `/perfil-profesional/${profesionalSeleccionado.etiqueta}/${idFuncionalidadSeleccionado}`;

  //   if (obtenerCurrentFullPath() !== rutaRedireccion) router.push(rutaRedireccion);    
  // };

  // const seleccionarProfesional = (index: number) => {
  //   indiceTabProfesionalSeleccionado.value = index;
    
  //   const idProfesionalSeleccionado = tabsProfesionales[indiceTabProfesionalSeleccionado.value].id;
  //   const profesionalSeleccionado = profesionalStore.listaProfesional.find(v => v.id === idProfesionalSeleccionado);

  //   if (index === -1 && !estaEnPaginaCreacionProfesional()) {
  //     // Proceso de creacion -> /perfil-profesional/crear
  //     router.push('/perfil-profesional/crear');
  //   } else {
  //     // Proceso de ir a detalles -> /perfil-profesional/:etiqueta/detalles
  //     const rutaRedireccion = `/perfil-profesional/${profesionalSeleccionado.etiqueta}/detalles`;
  //     if (obtenerCurrentFullPath() !== rutaRedireccion) router.push(rutaRedireccion);
  //   }
  // };

  // const seleccionarFuncionalidad = (index: number) => {
  //   indiceTabFuncionalidadSeleccionado.value = index;

  // };

  const actualizarTabDeProfesionales = () => {
    tabsProfesionales.value = [
      { 
        id: 'nuevo-profesional', 
        name: '+ Nuevo profesional', 
        icon: null,
        textColor: { habilitado: 'green', deshabilitado: 'green' },
        iconColor: { habilitado: '#16a34a', deshabilitado: '#22c55e' },
        to: '/perfil-profesional/crear',
      },
    ];

    profesionalStore.listaProfesional.map(v => {
      tabsProfesionales.value.push({
        id: v.id, 
        name: getNombreEtiquetaProfesional(v.etiqueta, 'propio'), 
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        textColor: undefined,
        iconColor: undefined,
        to: `/perfil-profesional/${v.etiqueta}`,
      });
    });
  };

  const actualizacionTabDeFuncionalidad = () => {
    // tabsFuncionalidad.value = [];
    tabsFuncionalidad.value = [
      {
        id: 'detalles', 
        name: 'Detalles', 
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        textColor: undefined,
        iconColor: undefined,
        to: `/perfil-profesional/${router.currentRoute.value.params.etiqueta}/detalles`,
      },
      {
        id: 'config-ficha-profesional', 
        name: 'Ficha', 
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        textColor: undefined,
        iconColor: undefined,
        to: `/perfil-profesional/${router.currentRoute.value.params.etiqueta}/config-ficha-profesional`,
      },
      {
        id: 'config-mensajeria-profesional', 
        name: 'Mensajería', 
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        textColor: undefined,
        iconColor: undefined,
        to: `/perfil-profesional/${router.currentRoute.value.params.etiqueta}/config-mensajeria-profesional`,
      },
      {
        id: 'locales', 
        name: 'Locales', 
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
        textColor: undefined,
        iconColor: undefined,
        to: `/perfil-profesional/${router.currentRoute.value.params.etiqueta}/locales`,
      },
    ];
  };

  const obtenerCurrentFullPath = () => {
    return router.currentRoute.value.fullPath;
  };

  const estaEnPaginaCreacionProfesional = () => {
    const fullPath = obtenerCurrentFullPath();
    return fullPath === '/perfil-profesional/crear';
  };

  const getNombreEtiquetaProfesional = (etiqueta: string, tipo: string) => {
    return etiquetaProfesional[tipo](etiqueta);
  };

  const verificacionDeRutaPadreInicial = () => {
    // Si esta en la rama inicial
    if (obtenerCurrentFullPath() === '/perfil-profesional') {
      // Comenzar busqueda del indice del profesional seleccionado
      const i1 = profesionalStore.listaProfesional.findIndex(v => {
        return v.id === profesionalStore.idProfesionalSeleccionado;
      });

      if (i1 === -1) return router.push('/perfil-profesional/crear');
      
      const rutaRedireccion = `/perfil-profesional/${profesionalStore.profesionalSeleccionado.etiqueta}/detalles`;
      return router.push(rutaRedireccion);
    }
  };

  watch(() => router.currentRoute.value.fullPath, () => {
    // Verificar si la ruta es la ruta padre (inicial)
    verificacionDeRutaPadreInicial();
    
    // Actualizar tab de funcionalidad
    actualizacionTabDeFuncionalidad();
  }, { deep: true });

  onBeforeMount(async () => {
    // Cargar los tab de profesional
    actualizarTabDeProfesionales();

    // Verificar si la ruta es la ruta padre (inicial)
    verificacionDeRutaPadreInicial();

    // Actualizar tab de funcionalidad
    actualizacionTabDeFuncionalidad();

    // if (!profesionalStore.listaProfesional.length || estaEnPaginaCreacionProfesional()) {
    //   // Si no tiene profesionales o esta en pagina de creacion,
    //   // seleccionar el indice del tab de profesionales
    //   indiceTabProfesionalSeleccionado.value = 0;
    //   return;
    // }

    // // Comenzar busqueda del indice del profesional seleccionado
    // const i1 = profesionalStore.listaProfesional.findIndex(v => {
    //   return v.id === profesionalStore.idProfesionalSeleccionado;
    // });

    // if (i1 === -1) {
    //   // Si no existe, proceder a seleccionar indice para creacion 
    //   indiceTabProfesionalSeleccionado.value = 0;
    //   return;
    // }
    
    // // Si tiene profesionales y no esta en la pagina de inicio
    // // inicializar tabs de funcionalidades por profesional
    // actualizacionTabDeFuncionalidad();
    // indiceTabProfesionalSeleccionado.value = tabsProfesionales.value.findIndex(v => {
    //   return v.id === profesionalStore.listaProfesional[i1].id;
    // });
    // indiceTabFuncionalidadSeleccionado.value = 0;

    // seleccionarProfesional(i1);
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