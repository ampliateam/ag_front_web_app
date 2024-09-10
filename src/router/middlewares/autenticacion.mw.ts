export function autenticacion({ next, router }) {
  console.log('mw-autenticacion');
  const usuarioLogeadoLsString = localStorage.getItem('usuario-logeado') || '{}';
  const usuarioLogeadoLs = JSON.parse(usuarioLogeadoLsString);
  if (!usuarioLogeadoLs.uid || !usuarioLogeadoLs.token || !usuarioLogeadoLs.email) {
    return router.push({ path: '/inicio-sesion' });
  }

  return next();
}

export function noAutenticacion({ next, router }) {
  console.log('mw-noAutenticacion');
  const usuarioLogeadoLsString = localStorage.getItem('usuario-logeado') || '{}';
  const usuarioLogeadoLs = JSON.parse(usuarioLogeadoLsString);
  
  if (usuarioLogeadoLs.uid && usuarioLogeadoLs.token && usuarioLogeadoLs.email) {
    console.log('usuarioLogeadoLs', usuarioLogeadoLs)
    console.log('router', router)
    return router.push({ path: '/' });
  }

  return next();
}
