import { IniciarSesionConCorreoYContrasenaDTO } from '@/interfaces/dto';
import { UserCredentialFirebase } from '@/interfaces/models';
import * as repository from '../../repository';

export const iniciarSesionConCorreoYContrasena = async (dto: IniciarSesionConCorreoYContrasenaDTO): Promise<UserCredentialFirebase> => {
  const response = await repository.firebaseAuthentication.iniciarSesionConCorreoYContrasena(dto);
  return response;
};
