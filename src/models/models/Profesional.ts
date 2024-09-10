import {
  TProfesionalContactoTipo,
  TProfesionalEstado,
  TProfesionalEtiqueta
} from '../types';

interface IProfesionalContacto {
  codigoTelefono: string | null;
  contacto: string;
  tipo: TProfesionalContactoTipo;
}

interface IProfesionalDireccion {
  referencia: string;
  ubicacion: [number, number] | null;
}

export interface Profesional {
  id: string;
  idUsuario: string;
  contactos: IProfesionalContacto[];
  direccion: IProfesionalDireccion;
  etiqueta: TProfesionalEtiqueta;
  fotoPerfil: string,
  fotoPortada: string,
  estado: TProfesionalEstado;
  fechaCreacion: Date;
  fechaEliminacion: Date | null;
}

export interface ProfesionalOpcional {
  id?: string;
  idUsuario?: string;
  contactos?: IProfesionalContacto[];
  direccion?: IProfesionalDireccion;
  etiqueta?: TProfesionalEtiqueta;
  fotoPerfil?: string,
  fotoPortada?: string,
  estado?: TProfesionalEstado;
  fechaCreacion?: Date;
  fechaEliminacion?: Date | null;
}
