import { defineStore } from 'pinia';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const useUserStore = defineStore('user', {
  state: () => ({ uid: '', email: '', token: '' }),
  getters: {
    getUid: (state) => state.uid,
    getEmail: (state) => state.email,
    getToken: (state) => state.token,
  },
  actions: {
    setUser(uid: string, email: string | null, token: string) {
      this.uid = uid;
      this.email = email || '';
      this.token = token;
      localStorage.setItem('Token', this.token);
    },
    async login(email: string, password: string) {
      console.log('login');
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { user } = userCredential;
      this.uid = user.uid;
      this.email = user.email ? user.email : '';
      this.token = await user.getIdToken();
      localStorage.setItem('Token', this.token);
      // router.push('/');
    },
    async logout() {
      const auth = getAuth();
      await signOut(auth);
      this.uid = '';
      this.email = '';
      this.token = '';
      localStorage.setItem('Token', '');
    },
    async registrarse(email: string, password: string, passwordConfirmar: string) {
      console.log('registrarse');
    },
  },
});

export default useUserStore;
