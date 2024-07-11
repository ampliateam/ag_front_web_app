import * as repository from '../../repository';

export const cerrarSesion = async (): Promise<void> => {
  await repository.firebaseAuthentication.cerrarSesion();
};
