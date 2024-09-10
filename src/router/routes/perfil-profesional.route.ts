import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/perfil-profesional',
    name: 'perfil-profesional',
    component: () => import('../../views/perfil-profesional.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [autenticacion],
    },
  },
];
