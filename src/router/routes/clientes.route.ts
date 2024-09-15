import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion, tieneProfesional } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/clientes',
    name: 'clientes',
    component: () => import('../../views/clientes.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [
        autenticacion,
        tieneProfesional,
      ],
    },
  },
];
