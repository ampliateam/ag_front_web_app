import { TIdIdiomaSistema, TOperacionGlobalID } from '../types';

export interface IOperacionGlobal {
  sideBar?: boolean;
  id?: TOperacionGlobalID;
  titulo?: string,
  dataInicial?: any;
  data?: any;
  response?: any;
}

export interface InfoSistema {
  existeUsuarioLogeado: boolean;
  cargando: boolean;
  sideBar: boolean;
  menuPerfil: boolean;
  operacionGlobal: IOperacionGlobal;
  idIdiomaSistema: TIdIdiomaSistema;
  cambiandoProfesional: boolean;
};
