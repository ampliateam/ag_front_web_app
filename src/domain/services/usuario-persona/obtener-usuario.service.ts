import { UsuarioPersona } from '@/models/models';
import * as repository from '../../repository';
import { ObtenerUsuarioPersonaDTO } from '@/models/dto';

export const obtenerUsuarioPersona = async (dto: ObtenerUsuarioPersonaDTO): Promise<UsuarioPersona> => {
  const response = await repository.ag_usuario.obtenerUsuarioPersona(dto);
  return response;
};
