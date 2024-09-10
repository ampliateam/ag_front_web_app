import { Profesional, ProfesionalOpcional } from '@/models/models';

export const crearProfesional = async (dto: ProfesionalOpcional): Promise<Profesional> => {
  return {
    id: `${Date.now()}`,
    idUsuario: dto.idUsuario,
    contactos: dto.contactos,
    direccion: dto.direccion,
    etiqueta: dto.etiqueta,
    fotoPerfil: dto.fotoPerfil,
    fotoPortada: dto.fotoPortada,
    estado: 'habilitado',
    fechaCreacion: dto.fechaCreacion,
    fechaEliminacion: null,
  }
};
