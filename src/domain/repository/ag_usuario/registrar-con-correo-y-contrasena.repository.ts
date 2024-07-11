import { RegistrarConCorreoYContrasenaDTO } from "@/interfaces/dto";
import { UsuarioPersona } from "@/interfaces/models";
import axios from "@/plugins/axios";

export const registrarConCorreoYContrasena = async (registrarConCorreoYContrasenaDTO: RegistrarConCorreoYContrasenaDTO): Promise<UsuarioPersona> => {
  const response = await axios.ag_usuario.post('/entidad/persona', registrarConCorreoYContrasenaDTO, {
    headers: { 'Content-Type': 'application/json' }
  });

  return response.data;
};
