import { ObtenerUsuarioPersonaDTO } from '@/interfaces/dto';
import { UsuarioPersona } from '@/interfaces/models';
import axios from '@/plugins/axios';

export const obtenerUsuarioPersona = async (obtenerUsuarioPersonaDTO: ObtenerUsuarioPersonaDTO): Promise<UsuarioPersona> => {
  const tipo = obtenerUsuarioPersonaDTO.tipo;
  const valor = obtenerUsuarioPersonaDTO.valor;
  
  const response = await axios.ag_usuario.get(`/entidad/persona/${tipo}/${valor}`, {
    headers: { 'Content-Type': 'application/json' }
  });

  return response.data;
};
