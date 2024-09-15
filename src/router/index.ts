import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import * as routesHelper from './routes';
import { setMiddlewares } from './middlewares';

const routes: Array<RouteRecordRaw> = [
  ...routesHelper.routes,
  ...routesHelper.agenda.routes,
  ...routesHelper.autenticacion.routes,
  ...routesHelper.clientes.routes,
  ...routesHelper.pacientes.routes,
  ...routesHelper.perfilProfesional.routes,
  ...routesHelper.planesYSuscripciones.routes,
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_SOME_KEY),
  routes,
});

setMiddlewares(router);

export default router;
