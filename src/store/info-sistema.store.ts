import { defineStore } from 'pinia';
import { InfoSistema, IOperacionGlobal, TIdIdiomaSistema, TOperacionGlobalID } from '@/interfaces/models';

const useInfoSistemaStore = defineStore('info-sistema', {
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
        data: {},
        response: {}
      },
      idIdiomaSistema: 'espanol',
    }
  },
  getters: {
    getExisteUsuarioLogeado: (state) => state.existeUsuarioLogeado,
    getCargando: (state) => state.cargando,
    getSideBar: (state) => state.sideBar,
    getMenuPerfil: (state) => state.menuPerfil,
    getOperacionGlobal: (state) => state.operacionGlobal,
    getIdIdiomaSistema: (state) => state.idIdiomaSistema,
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
    setOperacionGlobal(operacionGlobal: IOperacionGlobal) {
      let titulo = 'Operaciones';
      
      if (operacionGlobal.id === 'buscador-global') titulo = 'Buscador';
      else if (operacionGlobal.id === 'crear-paciente') titulo = 'Crear paciente';
      else if (operacionGlobal.id === 'operacion-paciente') titulo = 'Operaciones';

      const data = {
        sideBar: operacionGlobal.sideBar !== undefined ? operacionGlobal.sideBar : this.operacionGlobal.sideBar,
        titulo,
        id: operacionGlobal.id !== undefined ? operacionGlobal.id : this.operacionGlobal.id,
        data: operacionGlobal.data || this.operacionGlobal.data,
        response: operacionGlobal.response || this.operacionGlobal.response,
      };

      this.operacionGlobal = data;
    },
    abrirSideBarOG(id: TOperacionGlobalID) {
      if (!this.getOperacionGlobal.id) {
        const data: IOperacionGlobal = {
          sideBar: !this.getOperacionGlobal.sideBar,
          id,
          data: {},
          response: {},
        };

        data.data[id] = {};
        data.response[id] = {};
    
        this.setOperacionGlobal(data);
      } else {
        const data: IOperacionGlobal = {
          sideBar: !this.getOperacionGlobal.sideBar,
          id,
          data: this.getOperacionGlobal.data,
          response: this.getOperacionGlobal.response,
        };

        if (id !== this.getOperacionGlobal.id) {
          data.data[id] = {};
          data.response[id] = {};
        }

        this.setOperacionGlobal(data);
      }
    },
    setIdIdiomaSistema(idIdiomaSistema: TIdIdiomaSistema) {
      this.idIdiomaSistema = idIdiomaSistema;
    },
  },
});

export default useInfoSistemaStore;
