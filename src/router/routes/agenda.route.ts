import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion, tieneProfesional } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('../../views/agenda.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [
        autenticacion,
        tieneProfesional,
      ],
    },
  },
];
