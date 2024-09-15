import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '@/config/firebase';
import { useInfoSistemaStore, useUsuarioLogeadoStore, useProfesionalStore } from '@/store';
import { getUsuarioLogeadoLS } from '@/helpers';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('user', user);
  }

  const infoSistemaStore = useInfoSistemaStore();
  const usuarioLogeadoStore = useUsuarioLogeadoStore();
  const profesionalStore = useProfesionalStore();

  infoSistemaStore.setCargando(true);
  
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const usuarioLogeadoLs = getUsuarioLogeadoLS();
    console.log('usuarioLogeadoLs', usuarioLogeadoLs);

    const uid = usuarioLogeadoLs.uid || user.uid;
    const email = usuarioLogeadoLs.email || (user.email || '');
    const token = usuarioLogeadoLs.token || await user.getIdToken();

    usuarioLogeadoStore.setUsuarioLogeado({
      uid,
      email,
      token
    });
    infoSistemaStore.setExisteUsuarioLogeado(true);
    await profesionalStore.cargarListaProfesional(uid);
  } else {
    // User is signed out
    usuarioLogeadoStore.setUsuarioLogeado();
    infoSistemaStore.setExisteUsuarioLogeado(false);
    profesionalStore.setIdProfesionalSeleccionado('');
    profesionalStore.setListaProfesional([]);
  }

  infoSistemaStore.setCargando(false);
});

export default app;
