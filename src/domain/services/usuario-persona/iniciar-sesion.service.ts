import { IniciarSesionConCorreoYContrasenaDTO } from '@/models/dto';
import { UserCredentialFirebase } from '@/models/models';
import * as repository from '../../repository';

export const iniciarSesionConCorreoYContrasena = async (dto: IniciarSesionConCorreoYContrasenaDTO): Promise<UserCredentialFirebase> => {
  const response = await repository.firebaseAuthentication.iniciarSesionConCorreoYContrasena(dto);
  return response;
};
