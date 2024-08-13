import { defineStore } from 'pinia';

import * as services from '../domain/services';
import { UsuarioLogeado } from '@/models/models';
import { IniciarSesionConCorreoYContrasenaDTO, RegistrarConCorreoYContrasenaDTO } from '@/models/dto';
import { setUsuarioLogeadoLS, setUsuarioLogeadoTokenLS } from '@/helpers';
import useInfoSistemaStore from './info-sistema.store';

const useUsuarioStore = defineStore('usuario-logeado', {
  state: ():UsuarioLogeado => {
    return {
      uid: '',
      email: '',
      token: ''
    }
  },
  getters: {
    getUid: (state) => state.uid,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
  },
  actions: {
    setUsuarioLogeado(dto?: UsuarioLogeado) {
      this.uid = dto?.uid || '';
      this.email = dto?.email || '';
      this.token = dto?.token || '';
      setUsuarioLogeadoTokenLS(this.token);
      setUsuarioLogeadoLS({
        uid: this.uid,
        email: this.email,
        token: this.token,
      });
    },
    async registrarUsuarioPersona(dto: RegistrarConCorreoYContrasenaDTO) {
      try {
        const servicesUsuarioPersona = services.usuarioPersona;
        await servicesUsuarioPersona.registrarConCorreoYContrasena(dto);
        await this.login({
          correo: dto.correo,
          contrasena: dto.contrasena
        });
      } catch (error) {
        console.error('Error en [registro]: ', error);
      }
    },
    async login(dto: IniciarSesionConCorreoYContrasenaDTO) {
      try {
        const servicesUsuarioPersona = services.usuarioPersona;
        const { userCredential } = await servicesUsuarioPersona.iniciarSesionConCorreoYContrasena(dto);
        const { user } = userCredential;
        
        const uid = user.uid;
        const email = user.email ? user.email : '';
        const token = await user.getIdToken();

        this.setUsuarioLogeado({
          uid,
          email,
          token
        });
      } catch (error) {
        console.error('Error en [login]: ', error);
      }
    },
    async logout() {
      try {
        const servicesUsuarioPersona = services.usuarioPersona;
        await servicesUsuarioPersona.cerrarSesion();

        this.setUsuarioLogeado();
        useInfoSistemaStore().setExisteUsuarioLogeado(false);
      } catch (error) {
        console.error('Error en [logout]: ', error);
      }
    }
  },
});

export default useUsuarioStore;
