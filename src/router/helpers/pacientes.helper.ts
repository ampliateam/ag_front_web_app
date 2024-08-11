import { RouteRecordRaw } from 'vue-router';
import DefaulfLayout from '../../layouts/DefaultLayout.vue';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/pacientes',
    name: 'pacientes',
    component: () => import('../../views/pacientes.vue'),
    meta: {
      DefaulfLayout: DefaulfLayout,
    },
  },
];
