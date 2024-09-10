import { createApp } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import InstantSearch from 'vue-instantsearch/vue3/es';
import App from './App.vue';
import router from './router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import './plugins/firebase';
import './assets/global.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

createApp(App)
  .component('DefaultLayout', DefaultLayout)
  .use(pinia)
  .use(router)
  .use(InstantSearch)
  .mount('#app');
