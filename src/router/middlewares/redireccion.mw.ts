export function redireccion (path: string) {
  return function ({ router }) {
    console.log('mw-redireccion');
    return router.push({ path });
    
  }
}



