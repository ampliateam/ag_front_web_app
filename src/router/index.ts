import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import DefaulfLayout from '../layouts/DefaultLayout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      layout: DefaulfLayout,
    },
  },
  {
    path: '/agenda',
    name: 'agenda',
    component: () => import('../views/agenda.vue'),
    meta: {
      layout: DefaulfLayout,
    },
  },
  {
    path: '/semanal',
    name: 'semanal',
    component: () => import('../views/semanal.vue'),
    meta: {
      layout: DefaulfLayout,
    },
  },
  {
    path: '/inicio-sesion',
    name: 'inicio-sesion',
    // ruta de la vista del login
    component: () => import('../views/inicio-sesion.vue'),
  },
  {
    path: '/registro',
    name: 'registro',
    // ruta de la vista del login
    component: () => import('../views/registro.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_SOME_KEY),
  routes,
});

export default router;
