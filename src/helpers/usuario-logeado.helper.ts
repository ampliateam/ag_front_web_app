import { UsuarioLogeado } from "@/models/models";

export const setUsuarioLogeadoLS = (usuarioLogeado?: UsuarioLogeado) => {
  localStorage.setItem('usuario-logeado', JSON.stringify({
    uid: usuarioLogeado?.uid || '',
    email: usuarioLogeado?.email || '',
    token: usuarioLogeado?.token || '',
  }));
};

export const getUsuarioLogeadoLS = (): UsuarioLogeado => {
  const usuarioLogeadoLsString = localStorage.getItem('usuario-logeado') || '{}';
  const usuarioLogeadoLs = JSON.parse(usuarioLogeadoLsString);

  return {
    uid: usuarioLogeadoLs.uid || '',
    email: usuarioLogeadoLs.email || '',
    token: usuarioLogeadoLs.token || '',
  };
};

export const setUsuarioLogeadoTokenLS = (token: string = '') => {
  localStorage.setItem('token-usuario-logeado', token);
};

export const getUsuarioLogeadoTokenLS = (): string => {
  return localStorage.getItem('token-usuario-logeado') || '';
};
