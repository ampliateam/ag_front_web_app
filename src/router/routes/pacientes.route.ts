import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion, tieneProfesional } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/pacientes',
    name: 'pacientes',
    component: () => import('../../views/pacientes.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [
        autenticacion,
        tieneProfesional,
      ],
    },
  },
];
