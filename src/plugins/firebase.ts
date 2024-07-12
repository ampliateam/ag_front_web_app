import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '@/config/firebase';
import useUsuarioLogeadoStore from '@/store/usuario-logeado.store';
import useInfoSistemaStore from '@/store/info-sistema.store';
import { getUsuarioLogeadoLS } from '@/helpers';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

console.log('prueba-firebase');

onAuthStateChanged(auth, async (user) => {
  const infoSistemaStore = useInfoSistemaStore();
  infoSistemaStore.setCargando(true);

  const usuarioLogeadoStore = useUsuarioLogeadoStore();
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log(user);
 
    const usuarioLogeadoLs = getUsuarioLogeadoLS();

    const uid = usuarioLogeadoLs.uid || user.uid;
    const email = usuarioLogeadoLs.email || (user.email || '');
    const token = usuarioLogeadoLs.token || await user.getIdToken();

    usuarioLogeadoStore.setUsuarioLogeado({
      uid,
      email,
      token
    });
    infoSistemaStore.setExisteUsuarioLogeado(true);
  } else {
    // User is signed out
    usuarioLogeadoStore.setUsuarioLogeado();
    infoSistemaStore.setExisteUsuarioLogeado(false);
  }

  infoSistemaStore.setCargando(false);
});

export default app;
