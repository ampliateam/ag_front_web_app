import { UsuarioLogeado } from '@/models/models';

export const getUsuarioLogeadoLS = (): UsuarioLogeado => {
  const usuarioLogeadoLsString = localStorage.getItem('usuario-logeado') || '{}';
  return JSON.parse(usuarioLogeadoLsString) as UsuarioLogeado;
};
