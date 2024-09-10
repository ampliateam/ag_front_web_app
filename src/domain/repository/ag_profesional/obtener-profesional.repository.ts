import { getUbicacion } from '@/helpers';
import { Profesional } from '@/models/models';

type TTipoBusqueda = 'profesional' | 'usuario';

const l = [
  { 
    id: '66d71e303542a5e349c4fcd3',
    idUsuario: 'S4b6fxmV2tNef8Mmz1YX0fGQ7RB3',
    contactos: [{ codigoTelefono: '+595', contacto: '982000000', tipo: 'telefono-movil' }],
    direccion: { referencia: 'Por ahi', ubicacion: getUbicacion() as any, },
    etiqueta: 'odontologia',
    fotoPerfil: '',
    fotoPortada: '',
    estado: 'habilitado',
    fechaCreacion: new Date(),
    fechaEliminacion: null,
  },
  { 
    id: '66d720d4bad9e384757da1be',
    idUsuario: 'S4b6fxmV2tNef8Mmz1YX0fGQ7RB3',
    contactos: [{ codigoTelefono: '+595', contacto: '982000001', tipo: 'telefono-movil' }],
    direccion: { referencia: 'Por ahi (v2)', ubicacion: [1,1] },
    etiqueta: 'entrenamiento',
    fotoPerfil: '',
    fotoPortada: '',
    estado: 'habilitado',
    fechaCreacion: new Date(),
    fechaEliminacion: null,
  },
];

export const obtenerProfesional = async (tipo: TTipoBusqueda, valor: string): Promise<Profesional> => {
  console.log('tipo', tipo);
  console.log('valor', valor);
  
  const d = l[0] as Profesional;
  return d || null;
};

export const obtenerProfesionalesPorUsuario = async (idUsuario: string): Promise<Profesional[]> => {
  console.log('idUsuario', idUsuario);
  return l as Profesional[];
};
