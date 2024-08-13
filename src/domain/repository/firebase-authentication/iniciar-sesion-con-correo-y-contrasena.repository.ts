import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { UserCredentialFirebase } from '@/models/models';
import { IniciarSesionConCorreoYContrasenaDTO } from '@/models/dto';

export const iniciarSesionConCorreoYContrasena = async (iniciarSesionConCorreoYContrasenaDTO: IniciarSesionConCorreoYContrasenaDTO): Promise<UserCredentialFirebase> => {
  const auth = getAuth();

  const correo = iniciarSesionConCorreoYContrasenaDTO.correo;
  const contrasena = iniciarSesionConCorreoYContrasenaDTO.contrasena;
  const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);

  return { userCredential };
};
