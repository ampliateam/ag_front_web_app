import { onAuthStateChanged, getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '@/config/firebase';
import useUserStore from '@/store/use-user-store.store';

const app = initializeApp(firebaseConfig);

const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const userStore = useUserStore();
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    console.log(user);

    userStore.setUser(user.uid, user.email, await user.getIdToken());
    // ...
  } else {
    // User is signed out
    // ...
  }
});

export default app;
