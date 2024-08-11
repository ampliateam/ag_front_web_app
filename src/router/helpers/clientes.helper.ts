import { RouteRecordRaw } from 'vue-router';
import DefaulfLayout from '../../layouts/DefaultLayout.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('../../views/clientes.vue'),
    meta: {
      DefaulfLayout: DefaulfLayout,
    },
  },
];
