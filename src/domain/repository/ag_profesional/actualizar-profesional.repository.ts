import { getUbicacion } from '@/helpers';
import { Profesional, ProfesionalOpcional } from '@/models/models';

type TTipoBusqueda = 'profesional' | 'usuario';

export const actualizarProfesional = async (tipo: TTipoBusqueda, valor: string, nuevoDato: ProfesionalOpcional): Promise<Profesional> => {
  console.log('tipo', tipo);
  console.log('valor', valor);
  console.log('nuevoDato', nuevoDato);
  
  return {
    id: `${Date.now()}`,
    idUsuario: nuevoDato.idUsuario || 'S4b6fxmV2tNef8Mmz1YX0fGQ7RB3',
    contactos: nuevoDato.contactos || [{codigoTelefono: '+595', contacto: '982139653', tipo: 'telefono-movil'}],
    direccion: nuevoDato.direccion || { referencia: 'Por ahi', ubicacion: getUbicacion() as any, },
    etiqueta: nuevoDato.etiqueta || 'odontologia',
    fotoPerfil: nuevoDato.fotoPerfil || '',
    fotoPortada: nuevoDato.fotoPortada || '',
    estado: nuevoDato.estado || 'habilitado',
    fechaCreacion: nuevoDato.fechaCreacion || new Date(),
    fechaEliminacion: nuevoDato.fechaEliminacion || null,
  };
};