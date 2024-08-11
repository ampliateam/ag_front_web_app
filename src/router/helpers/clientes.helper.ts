import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('../../views/clientes.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
];
