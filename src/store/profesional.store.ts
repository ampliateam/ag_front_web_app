import { defineStore } from 'pinia';

import * as services from '../domain/services';
import { Profesional } from '@/models/models';
import {
  getProfesionalLS,
} from '@/helpers/profesional.helper';

const useProfesionalStore = defineStore('profesional', {
  persist: true,
  state: () => {
    return {
      idProfesionalSeleccionado: '',
      listaProfesional: [],
    }
  },
  getters: {
    getIdProfesionalSeleccionado: (state) => state.idProfesionalSeleccionado,
    getListaProfesional: (state) => state.listaProfesional,
    ultomoProfesionalSeleccionado: () => {
      return getProfesionalLS().idProfesionalSeleccionado || '';
    },
    cantidadProfesionales: (state) => {
      return state.listaProfesional.length;
    },
    profesionalSeleccionado: (state) => {
      return state.listaProfesional.find(v => v.id === state.idProfesionalSeleccionado) || null;
    },
  },
  actions: {
    setIdProfesionalSeleccionado(id: string) {
      this.idProfesionalSeleccionado = id;
    },
    setListaProfesional(lista: Profesional[]) {
      this.listaProfesional = lista;
    },
    async cargarListaProfesional(idUsuario: string) {
      try {
        const servicesProfesional = services.profesional;
        const profesionales = await servicesProfesional.obtenerProfesionalesPorUsuario(idUsuario);
        this.setListaProfesional(profesionales);
        
        if (profesionales.length) {
          const idProfesionalSeleccionadoLs = getProfesionalLS().idProfesionalSeleccionado || '';
          const lsExisteEnProfesionales = profesionales.map(v => v.id).includes(idProfesionalSeleccionadoLs);
          if (profesionales.length > 1 && lsExisteEnProfesionales) {
            this.setIdProfesionalSeleccionado(idProfesionalSeleccionadoLs);
          } else {
            this.setIdProfesionalSeleccionado(profesionales[0].id);
          }
        } else {
          this.setIdProfesionalSeleccionado('');
        }
      } catch (error) {
        console.error('Error en [cargarListaProfesional]: ', error);
      }
    },
    async cambiarProfesional (idProfesional: string) {
      await new Promise<void>((res) => {
        setTimeout(() => {
          res()
        }, 2000);
      });
      this.setIdProfesionalSeleccionado(idProfesional);
    },
  },
});

export const profesionalStore = () => useProfesionalStore();

export default useProfesionalStore;
