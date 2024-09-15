import { Profesional } from '@/models/models';
import { ag_profesional} from '../../repository';

type TTipoBusqueda = 'profesional' | 'usuario';

export const obtenerProfesional = async (tipo: TTipoBusqueda, valor: string): Promise<Profesional> => {
  const responseData = await ag_profesional.obtenerProfesional(tipo, valor);
  return responseData;
};

export const obtenerProfesionalesPorUsuario = async (idUsuario: string): Promise<Profesional[]> => {
  const responseData = await ag_profesional.obtenerProfesionalesPorUsuario(idUsuario);
  return responseData;
};
