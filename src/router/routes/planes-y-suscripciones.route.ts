import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/planes-y-suscripciones',
    name: 'planes-y-suscripciones',
    component: () => import('../../views/planes-y-suscripciones.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [autenticacion],
    },
  },
];
