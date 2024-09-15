import { Router } from 'vue-router';

const nextFactory = (context: any, middlewares: any[], index: number) => {
  const middleware = middlewares[index];
  if (!middleware) return context.next;

  return (...parameters: any) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middlewares, index + 1);
    middleware({ ...context, next: nextMiddleware });
  };
};

export const setMiddlewares = (router: Router) => {
  router.beforeEach((to, from, next) => {
    const indexMiddleware = 0;
    console.log('to.meta.middlewares', to.meta.middlewares);
    const middlewares = to?.meta?.middlewares as any[] || [];

    const middleware = middlewares[indexMiddleware];
    if (!middleware) return next();
    
    const context = {
      from,
      next,
      router,
      to,
    };
    
    const nextMiddleware = nextFactory(context, middlewares, indexMiddleware + 1);
    return middleware({ ...context, next: nextMiddleware });
  });
};

// Todos los middlewares y agregar a los archivos necesarios en [@/router/routes]
export * from './autenticacion.mw';
export * from './tiene-profesional.mw';
export * from './redireccion.mw';
