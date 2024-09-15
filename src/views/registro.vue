<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-2xl shadow-lg md:mt-0 sm:max-w-md xl:p-0">
        <div class="p-10 space-y-2 md:space-y-4 sm:p-8">
          <h1 class="py-2 text-gray-700 font-extrabold text-2xl">
            Registro
          </h1>
          <div class="flex flex-col md:flex-row items-center justify-center">
            <button
              class="w-full max-w-xs md:max-w-none font-bold shadow-sm rounded-lg py-2 bg-blue-100 text-gray-800 flex items-center justify-center transition-all duration-300 mb-3 md:mb-0 md:mr-3"
            >
              <div class="p-1 rounded-full">
                <svg
                  class="w-4"
                  viewBox="0 0 533.5 544.3"
                >
                  <path
                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7
                    63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                    fill="#4285f4"
                  />
                  <path
                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9
                            26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9
                            140.3 149.9
                            243.2 149.9z"
                    fill="#34a853"
                  />
                  <path
                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6
                            167.5 0 244.4l90.4-70.1z"
                    fill="#fbbc04"
                  />
                  <path
                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8
                            272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4
                            152.8-112.4z"
                    fill="#ea4335"
                  />
                </svg>
              </div>
              <span class="ml-1"> Google </span>
            </button>
            <button
              class="w-full max-w-xs md:max-w-none font-bold shadow-sm rounded-lg py-2 bg-blue-100 text-gray-800 flex items-center justify-center mb-3 md:mb-0 md:mr-3"
            >
              <!-- Facebook -->
              <span class="me-2 rounded-full bg-blue-500 p-1 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. -->
                  <path
                    d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7
                            20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4
                            0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                  />
                </svg>
              </span>
              Facebook
            </button>
          </div>
          <form class="space-y-2 md:space-y-4">
            <div>
              <label
                for="email"
                htmlFor="email"
                class="text-gray-700"
              >Correo</label>
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                placeholder="@email"
                class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                @input="esValidoRegistro()"
              >
              <label
                v-for="error, index in Object.keys(erroresCorreo)"
                :key="index"
                class="text-red-400"
              >{{ error }}
              </label>
            </div>
            <div>
              <label
                for="nombre"
                htmlFor="nombre"
                class="text-gray-700"
              >Nombre</label>
              <input
                id="nombre"
                v-model="nombre"
                type="nombre"
                name="nombre"
                placeholder="Nombre"
                class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                @input="esValidoRegistro()"
              >
              <label
                v-for="error, index in Object.keys(erroresNombre)"
                :key="index"
                class="text-red-400"
              >{{ error }}
              </label>
            </div>
            <div>
              <label
                for="codigo"
                htmlFor="codigo"
                class="text-gray-700"
              >Código</label>
              <input
                id="codigo"
                v-model="codigo"
                type="codigo"
                name="codigo"
                placeholder="codigo"
                class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                @input="esValidoRegistro()"
              >
              <label
                v-for="error, index in Object.keys(erroresCodigo)"
                :key="index"
                class="text-red-400"
              >{{ error }}
              </label>
            </div>
            <div>
              <label
                for="password"
                class="text-gray-700"
              >Contraseña</label>
              <input
                id="password"
                v-model="pass"
                type="password"
                name="password"
                placeholder="••••••••"
                class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                @input="esValidoRegistro()"
              >
              <label
                v-for="error, index in Object.keys(erroresPass)"
                :key="index"
                class="text-red-400"
              >{{ error
              }}</label>
            </div>
            <div>
              <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
              <label
                for="passwordConfirmar"
                class="text-gray-700"
              >Repite la contraseña</label>
              <input
                id="passwordConfirmar"
                v-model="passConfirmar"
                type="password"
                name="passwordConfirmar"
                placeholder="••••••••"
                class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
                @input="esValidoRegistro()"
              >
              <label
                v-for="error, index in Object.keys(errorespassConfirmar)"
                :key="index"
                class="text-red-400"
              >{{
                error }}</label>
            </div>

            <button
              :class="[
                'cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white w-full text-center rounded-lg',
                { 'btn-disabled': !esValidoRegistrarse },
              ]"
              :disabled="!esValidoRegistrarse"
              @click="registrarse()"
            >
              Registrarse {{ esValidoRegistrarse }}
            </button>
            <p class="text-sm font-medium text-gray-400 dark:text-primary-500">
              ¿Yo tienes una cuenta?
              <RouterLink
                to="/inicio-sesion"
                class="text-sm font-medium text-blue-600 underline"
              >
                Inicia Sesión
              </RouterLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsuarioLogeadoStore } from '@/store';
import router from '@/router';

const email = ref('');
const nombre = ref('');
const codigo = ref('');
const pass = ref('');
const passConfirmar = ref('');
const esValidoRegistrarse = ref(false);

// Lista de errores
const erroresCorreo = ref<{ [key: string]: boolean }>({});
const erroresPass = ref<{ [key: string]: boolean }>({});
const errorespassConfirmar = ref<{ [key: string]: boolean }>({});
const erroresNombre = ref<{ [key: string]: boolean }>({});
const erroresCodigo = ref<{ [key: string]: boolean }>({});

async function registrarse() {
  const userStore = useUsuarioLogeadoStore();
  await userStore.registrarUsuarioPersona({
    correo: email.value,
    codigo: codigo.value,
    nombre: nombre.value,
    contrasena: pass.value,
    confirmacionContrasena: passConfirmar.value,
  });
  router.push('/');
}

function validarCorreo() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Verifica si el correo cumple con la expresión regular
  if (regex.test(email.value)) {
    delete erroresCorreo.value['El formato del correo no es correcto'];
    return true;
  } else if (email.value) {
    erroresCorreo.value['El formato del correo no es correcto'] = true;
  }
  return false;
}

function validarPassword() {
  if (pass.value.length >= 7) {
    delete erroresPass.value[
      'La contraseña debe tener 7 caracteres como mínimo'
    ];
    return true;
  } else if (pass.value) {
    erroresPass.value['La contraseña debe tener 7 caracteres como mínimo'] =
      true;
  }
  return false;
}

function validarPasswords() {
  if (pass.value === passConfirmar.value) {
    delete errorespassConfirmar.value['Debe ser igual a la contraseña'];
    return true;
  } else if (passConfirmar.value) {
    errorespassConfirmar.value['Debe ser igual a la contraseña'] = true;
  }
  return false;
}

function validarNombre() {
  if (nombre.value.length > 80) {
    erroresNombre.value['La longitud del nombre debe ser menor a 80 caracteres'] = true;
    return false;
  } else if (nombre.value) {
    erroresNombre.value = {}
    return true;
  }
}

function validarCodigo() {
  console.log('aaaaaaaaaaa')
  const regex = /^[a-zA-Z0-9_]+$/;
  // Verifica si el correo cumple con la expresión regular
  if (regex.test(codigo.value)) {
    delete erroresCodigo.value['El formato del codigo no es correcto'];
    return true;
  } else if (codigo.value) {
    erroresCodigo.value['El formato del codigo no es correcto'] = true;
  }
  return false;
}

function esValidoRegistro() {
  const esValidoCorreo = validarCorreo();
  const esValidoPass = validarPassword();
  const esValidoPassRepetir = validarPasswords();
  const esValidoNombre = validarNombre();
  const esValidoCodigo = validarCodigo();

  if (esValidoCorreo && esValidoPass && esValidoPassRepetir && esValidoNombre && esValidoCodigo) {
    esValidoRegistrarse.value = true;
    return;
  }
  esValidoRegistrarse.value = false;
}
</script>
