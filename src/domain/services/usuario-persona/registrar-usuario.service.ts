import { RegistrarConCorreoYContrasenaDTO } from '@/interfaces/dto';
import { UsuarioPersona } from '@/interfaces/models';
import * as repository from '../../repository';

export const registrarConCorreoYContrasena = async (dto: RegistrarConCorreoYContrasenaDTO): Promise<UsuarioPersona> => {
  const response = await repository.ag_usuario.registrarConCorreoYContrasena(dto);
  return response;
};
