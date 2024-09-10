<template>
  <DefaultLayout>
    <div class="">
      <!-- Contenedor Principal -->
      <div class="lg:flex gap-4 items-stretch">
        <!-- Caja Grande -->
        <div
          class="bg-white md:p-2 p-6 rounded-lg border border-gray-200 mb-4 lg:mb-0 shadow-md
          lg:w-[35%]"
        >
          <div class="flex justify-center items-center space-x-5 h-full">
            <div>
              <p>Saldo actual</p>
              <h2 class="text-4xl font-bold text-gray-600">
                50.365
              </h2>
              <p>25.365 $</p>
            </div>
            <img
              src="https://www.emprenderconactitud.com/img/Wallet.png"
              alt="wallet"
              class="h-24 md:h-20 w-38"
            >
          </div>
        </div>

        <!-- Caja Blanca -->
        <div class="bg-white p-4 rounded-lg xs:mb-4 max-w-full shadow-md lg:w-[65%]">
          <!-- Cajas pequeñas -->
          <div class="flex flex-wrap justify-between h-full">
            <!-- Caja pequeña 1 -->
            <div
              class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex flex-col
              items-center justify-center p-4 space-y-2 border border-gray-200 m-2"
            >
              <i class="fas fa-hand-holding-usd text-white text-4xl" />
              <p class="text-white">
                Depositar
              </p>
            </div>

            <!-- Caja pequeña 2 -->
            <div
              class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex
              flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2"
            >
              <i class="fas fa-exchange-alt text-white text-4xl" />
              <p class="text-white">
                Transferir
              </p>
            </div>

            <!-- Caja pequeña 3 -->
            <div
              class="flex-1 bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-lg flex
              flex-col items-center justify-center p-4 space-y-2 border border-gray-200 m-2"
            >
              <i class="fas fa-qrcode text-white text-4xl" />
              <p class="text-white">
                Canjear
              </p>
            </div>
          </div>
        </div>
      </div>

      <br><br><br><br><br><br><br><br>

      <button
        class="cursor-pointer py-2 px-4 block mt-6 bg-indigo-500 text-white w-full
        text-center rounded-lg"
        @click="cerrarSesion"
      >
        Cerrar sesion
      </button>

      <AlgoliaListaCliente />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
  import AlgoliaListaCliente from '@/components/algolia/ListaCliente.vue';

  import usuarioLogeadoStore from '@/store/usuario-logeado.store';
  import router from '@/router';

  async function cerrarSesion() {
    const userStore = usuarioLogeadoStore();
    await userStore.logout();
    router.push('/inicio-sesion');
  }
</script>
