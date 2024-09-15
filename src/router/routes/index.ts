import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion, tieneProfesional } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../../views/index.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [
        autenticacion,
        tieneProfesional,
      ],
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../../views/AboutView.vue'),
    meta: {
      layout: DefaultLayout,
    },
  },
];

export * as agenda from './agenda.route';
export * as autenticacion from './autenticacion.route';
export * as clientes from './clientes.route';
export * as pacientes from './pacientes.route';
export * as perfilProfesional from './perfil-profesional.route';
export * as planesYSuscripciones from './planes-y-suscripciones.route';
