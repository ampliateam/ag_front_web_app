<template>
  <section>
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-2xl shadow-lg md:mt-0 sm:max-w-md xl:p-0"
      >
        <div class="p-10 space-y-2 md:space-y-4 sm:p-8">
          <h1 class="py-2 text-gray-700 font-extrabold text-2xl">
            Inicia Sesión
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
              <span
                class="me-2 rounded-full bg-blue-500 p-1 fill-white [&>svg]:mx-auto [&>svg]:h-3.5 [&>svg]:w-3.5"
              >
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
          <div>
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label
              for="email"
              htmlFor="email"
              class="text-gray-700"
            >Correo</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="@email"
              v-model="email"
              class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            >
          </div>
          <div>
            <!-- eslint-disable-next-line vuejs-accessibility/label-has-for -->
            <label
              for="password"
              class="text-gray-700"
            >Contraseña</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              v-model="pass"
              class="w-full border border-gray-300 py-2 pl-3 rounded-lg mt-2 outline-none focus:ring-indigo-600 :ring-indigo-600"
            >
          </div>

          <button
            class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white w-full
              text-center rounded-lg"
            @click="login"
          >
            Iniciar Sesión
          </button>
          <p class="text-sm font-medium text-gray-400 dark:text-primary-500">
            ¿No tienes una cuenta aun?
            <a
              href="#"
              class="text-sm font-medium text-blue-600 underline"
            >Registrarse</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUsuarioLogeadoStore } from '@/store';
import router from '@/router';

const pass = ref('');
const email = ref('');

async function login() {
  const userStore = useUsuarioLogeadoStore();
  await userStore.login({
    correo: email.value,
    contrasena: pass.value
  });
  router.push('/');
}

</script>
