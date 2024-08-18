export interface ObtenerUsuarioPersonaDTO {
  tipo: 'uid' | 'correo' | 'codigo';
  valor: string;
};
