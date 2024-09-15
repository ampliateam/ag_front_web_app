import { RouteRecordRaw } from 'vue-router';
import { noAutenticacion } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/inicio-sesion',
    name: 'inicio-sesion',
    // ruta de la vista del login
    component: () => import('../../views/inicio-sesion.vue'),
    meta: {
      middlewares: [noAutenticacion],
    },
  },
  {
    path: '/registro',
    name: 'registro',
    // ruta de la vista del login
    component: () => import('../../views/registro.vue'),
    meta: {
      middlewares: [noAutenticacion],
    },
  },
];
