export type TIdIdiomaSistema = 'espanol' 
| 'portugues' 
| 'ingles';

export type TOperacionGlobalID = '' 
| 'buscador-global' 
| 'crear-cliente' 
| 'operacion-cliente';

export interface IOperacionGlobal {
  sideBar?: boolean;
  id?: TOperacionGlobalID;
  titulo?: string,
  data?: {
    'buscador-global'?: any,
    'crear-cliente'?: any,
    'operacion-cliente'?: any,
  };
  response?: {
    'buscador-global'?: any,
    'crear-cliente'?: any,
    'operacion-cliente'?: any,
  };
}

export interface InfoSistema {
  existeUsuarioLogeado: boolean;
  cargando: boolean;
  sideBar: boolean;
  menuPerfil: boolean;
  operacionGlobal: IOperacionGlobal;
  idIdiomaSistema: TIdIdiomaSistema
};
