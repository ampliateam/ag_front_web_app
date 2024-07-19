import { defineStore } from 'pinia';
import { InfoSistema } from '@/interfaces/models';

const useInfoSistemaStore = defineStore('info-sistema', {
  state: ():InfoSistema => {
    return {
      existeUsuarioLogeado: false,
      cargando: true,
    }
  },
  getters: {
    getExisteUsuarioLogeado: (state) => state.existeUsuarioLogeado,
    getCargando: (state) => state.cargando,
  },
  actions: {
    setInfoSistema(dto: InfoSistema) {
      this.existeUsuarioLogeado = dto.existeUsuarioLogeado;
      this.cargando = dto.cargando;
    },
    setExisteUsuarioLogeado(existeUsuarioLogeado: boolean) {
      this.existeUsuarioLogeado = existeUsuarioLogeado;
    },
    setCargando(cargando: boolean) {
      this.cargando = cargando;
    },
  },
});

export default useInfoSistemaStore;
