import { defineStore } from 'pinia';
import { InfoSistema, IOperacionGlobal } from '@/models/models';
import { TOperacionGlobalID, TIdIdiomaSistema } from '@/models/types';

const useInfoSistemaStore = defineStore('info-sistema', {
  persist: true,
  state: ():InfoSistema => {
    return {
      existeUsuarioLogeado: false,
      cargando: true,
      sideBar: false,
      menuPerfil: false,
      operacionGlobal: {
        sideBar: false,
        titulo: 'Operaciones',
        id: '',
        dataInicial: {},
        data: {},
        response: {}
      },
      idIdiomaSistema: 'espanol',
      cambiandoProfesional: false,
    }
  },
  getters: {
    getExisteUsuarioLogeado: (state) => state.existeUsuarioLogeado,
    getCargando: (state) => state.cargando,
    getSideBar: (state) => state.sideBar,
    getMenuPerfil: (state) => state.menuPerfil,
    getOperacionGlobal: (state) => state.operacionGlobal,
    getIdIdiomaSistema: (state) => state.idIdiomaSistema,
    getCambiandoProfesional: (state) => state.cambiandoProfesional,
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
    setSidebar(sideBar: boolean) {
      this.sideBar = sideBar;
    },
    setMenuPerfil(menuPerfil: boolean) {
      this.menuPerfil = menuPerfil;
    },
    setCambiandoProfesional(cambiandoProfesional: boolean) {
      this.cambiandoProfesional = cambiandoProfesional;
    },
    setOperacionGlobal(operacionGlobal: IOperacionGlobal) {
      let titulo = 'Operaciones';
      
      if (operacionGlobal.id === 'buscador-global') titulo = 'Buscador';
      else if (operacionGlobal.id === 'crear-cliente') titulo = 'Crear cliente';
      else if (operacionGlobal.id === 'operacion-cliente') titulo = 'Operaciones';
      else titulo = this.operacionGlobal.titulo;

      const data = {
        sideBar: operacionGlobal.sideBar !== undefined ? operacionGlobal.sideBar : this.operacionGlobal.sideBar,
        titulo,
        id: operacionGlobal.id !== undefined ? operacionGlobal.id : this.operacionGlobal.id,
        dataInicial: operacionGlobal.dataInicial || this.operacionGlobal.dataInicial,
        data: operacionGlobal.data || this.operacionGlobal.data,
        response: operacionGlobal.response || this.operacionGlobal.response,
      };

      this.operacionGlobal = data;
    },
    abrirSideBarOG(id: TOperacionGlobalID, extraData: any = {}) {
      const data: IOperacionGlobal = {
        sideBar: true,
        id,
        dataInicial: extraData.dataInicial || {},
        data: {},
        response: {},
      };

      if (id === this.operacionGlobal.id) {
        const cantidadDataInicial1 = Object.keys(extraData?.dataInicial || {}).length;
        const cantidadDataInicial2 = Object.keys(this.operacionGlobal.dataInicial).length;

        if (cantidadDataInicial1 && cantidadDataInicial2 && cantidadDataInicial1 === cantidadDataInicial2) {
          const verificador = Object.keys(extraData.dataInicial).map(campo => {
            return extraData.dataInicial[campo] === this.operacionGlobal.dataInicial[campo];
          });

          if (!verificador.includes(false)) {
            data.data = this.operacionGlobal.data;
            data.response = this.operacionGlobal.response;
          }
        } else if (!cantidadDataInicial1 && !cantidadDataInicial2) {
          data.data = this.operacionGlobal.data;
          data.response = this.operacionGlobal.response;
        }
      }
  
      this.setOperacionGlobal(data);
    },
    setIdIdiomaSistema(idIdiomaSistema: TIdIdiomaSistema) {
      this.idIdiomaSistema = idIdiomaSistema;
    },
  },
});

export const infoSistemaStore = () => useInfoSistemaStore();

export default useInfoSistemaStore;
