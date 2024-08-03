import { createApp } from 'vue';
import { createPinia } from 'pinia';
import InstantSearch from 'vue-instantsearch/vue3/es';
import App from './App.vue';
import router from './router';
import './index.css';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import './plugins/firebase';

const pinia = createPinia();

createApp(App)
  .component('layout', DefaultLayout)
  .use(pinia)
  .use(router)
  .use(InstantSearch)
  .mount('#app');
