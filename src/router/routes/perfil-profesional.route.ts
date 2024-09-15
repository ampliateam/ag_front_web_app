import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '../../layouts/DefaultLayout.vue';
import { autenticacion } from '../middlewares';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/perfil-profesional',
    name: 'perfil-profesional',
    component: () => import('../../views/perfil-profesional.vue'),
    meta: {
      layout: DefaultLayout,
      middlewares: [autenticacion],
    },
    children: [
      {
        // /perfil-profesional/crear
        path: 'crear',
        component: () => import('../../views/perfil-profesional/crear.vue'),
      },
      {
        // /perfil-profesional/:etiqueta
        path: ':etiqueta',
        component: () => import('../../views/perfil-profesional/etiqueta/index.vue'),
        children: [
          {
            // /perfil-profesional/:etiqueta/detalles
            path: 'detalles',
            component: () => import('../../views/perfil-profesional/etiqueta/detalles.vue'),
          },
          {
            // /perfil-profesional/:etiqueta/config-ficha-profesional
            path: 'config-ficha-profesional',
            component: () => import('../../views/perfil-profesional/etiqueta/config-ficha-profesional.vue'),
          },
          {
            // /perfil-profesional/:etiqueta/locales
            path: 'locales',
            component: () => import('../../views/perfil-profesional/etiqueta/locales.vue'),
          },
          {
            // /perfil-profesional/:etiqueta/config-mensajeria-profesional
            path: 'config-mensajeria-profesional',
            component: () => import('../../views/perfil-profesional/etiqueta/config-mensajeria-profesional.vue'),
          },
        ]
      },
      
    ],
  },
];
