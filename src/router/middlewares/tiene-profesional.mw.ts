export function tieneProfesional({ next, router }) {
  console.log('mw-tieneProfesional');
  const profesionalLsString = localStorage.getItem('profesional') || '{}';
  const profesionalLs = JSON.parse(profesionalLsString);
  if (!profesionalLs.listaProfesional.length) {
    return router.push({ path: '/perfil-profesional?creacion-profesional=1' });
  }

  return next();
}
