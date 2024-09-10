import { getUbicacion } from '@/helpers';
import { Profesional } from '@/models/models';
type TTipoBusqueda = 'profesional' | 'usuario';

export const eliminarProfesional = async (tipo: TTipoBusqueda, valor: string): Promise<Profesional> => {
  console.log('tipo', tipo);
  console.log('valor', valor);
  
  return {
    id: `${Date.now()}`,
    idUsuario: 'S4b6fxmV2tNef8Mmz1YX0fGQ7RB3',
    contactos: [{codigoTelefono: '+595', contacto: '982139653', tipo: 'telefono-movil'}],
    direccion: { referencia: 'Por ahi', ubicacion: getUbicacion() as any, },
    etiqueta: 'odontologia',
    fotoPerfil: '',
    fotoPortada: '',
    estado: 'habilitado',
    fechaCreacion: new Date(),
    fechaEliminacion: null,
  };
};