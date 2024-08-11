import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/pacientes',
    name: 'pacientes',
    component: () => import('../../views/pacientes.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
];
