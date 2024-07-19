import { UsuarioPersona } from '@/interfaces/models';
import * as repository from '../../repository';
import { ObtenerUsuarioPersonaDTO } from '@/interfaces/dto';

export const obtenerUsuarioPersona = async (dto: ObtenerUsuarioPersonaDTO): Promise<UsuarioPersona> => {
  const response = await repository.ag_usuario.obtenerUsuarioPersona(dto);
  return response;
};
