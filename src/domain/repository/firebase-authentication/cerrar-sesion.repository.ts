import { getAuth, signOut } from 'firebase/auth';

export const cerrarSesion = async (): Promise<void> => {
  const auth = getAuth();
  await signOut(auth);
};

