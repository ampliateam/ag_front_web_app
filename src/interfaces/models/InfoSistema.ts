export type TIdIdiomaSistema = 'espanol' 
| 'portugues' 
| 'ingles';

export type TOperacionGlobalID = '' 
| 'buscador-global' 
| 'crear-paciente' 
| 'operacion-paciente';

export interface IOperacionGlobal {
  sideBar?: boolean;
  id?: TOperacionGlobalID;
  titulo?: string,
  data?: {
    'buscador-global'?: any,
    'crear-paciente'?: any,
    'operacion-paciente'?: any,
  };
  response?: {
    'buscador-global'?: any,
    'crear-paciente'?: any,
    'operacion-paciente'?: any,
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
