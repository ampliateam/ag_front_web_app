<template>
  <div
    v-if="infoSistemaStore.getMenuPerfil"
    class="profile-card"
    ref="profileCard"
  >
    <button
      class="close-button"
      @click="cambiarEstado"
    >
      ×
    </button>
    <div class="card-content">
      <div class="profile-info">
        <img
          src="https://router.vuejs.org/mp-pinia-logo.svg"
          alt="Profile"
          class="profile-image"
        >
        <p class="greeting">
          ¡Hola, <span class="name">{{ 'Guillermo Paiva' }}!</span>
        </p>
      </div>

      <hr class="divider">

      <router-link to="/perfil" @click="clickCerrarMenu();">
        <button class="action-button-menu-perfil">
          Administrar tu cuenta
        </button>
      </router-link>

      <router-link to="/perfil-profesional" @click="clickCerrarMenu();">
        <button class="action-button-menu-perfil">
          Perfil profesional
        </button>
      </router-link>

      <router-link to="/planes-y-suscripciones" @click="clickCerrarMenu();">
        <button class="action-button-menu-perfil">
          Planes y suscripciones
        </button>
      </router-link>

      <hr class="divider">

      <button
        class="action-button-menu-perfil"
        @click="clickCerrarMenu(); logout();"
      >
        Cerrar sesión
      </button>
      <div class="footer">
        <a
          href="#"
          class="footer-link"
        >Política de Privacidad</a>
        <span class="dot">•</span>
        <a
          href="#"
          class="footer-link"
        >Condiciones del Servicio</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import useInfoSistemaStore from '@/store/info-sistema.store';
import usuarioLogeadoStore from '@/store/usuario-logeado.store';
import router from '@/router';

const infoSistemaStore = useInfoSistemaStore();
const profileCard = ref(null);

const cambiarEstado = () => {
  infoSistemaStore.setMenuPerfil(!infoSistemaStore.getMenuPerfil);
};

const logout = async () => {
  const userStore = usuarioLogeadoStore();
  await userStore.logout();
  router.push('/inicio-sesion');
};

const clickCerrarMenu = () => {
  infoSistemaStore.setMenuPerfil(!infoSistemaStore.getMenuPerfil);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;

  // Verificaciones adicionales para ignorar componentes específicos
  const ignoredElements = [
    // Atributos
    '[ignore-click-menu-perfil]'
  ];
  const isIgnored = ignoredElements.some(selector => target.closest(selector));
  
  if (profileCard.value && !profileCard.value.contains(event.target as Node) && !isIgnored) {
    infoSistemaStore.setMenuPerfil(false);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.divider {
  width: 350px;
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 0 0 15px 0;
}

.profile-card {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: rgb(244, 244, 244);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-color: black;
  border-radius: 20px;
  padding: 10px 60px 40px 60px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: height 0.3s ease;
  z-index: 150;
  margin-right: 10px;
  transition: all 0.3s ease-in-out;
}

.close-button {
  margin: 5px 19px 0 0;
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  color: #5f6368;
  cursor: pointer;
}

.card-content {
  padding: 16px 16px 1px 16px;
}

.email {
  display: block;
  font-size: 14px;
  color: #5f6368;
  margin-bottom: 16px;
}

.profile-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.profile-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
}

.greeting {
  font-size: 16px;
  margin: 0;
}

.name {
  font-weight: bold;
}

.action-button-menu-perfil {
  width: 100%;
  padding: 8px 0;
  background-color: #fff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  color: #1a73e8;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 16px;
}

.footer {
  font-size: 12px;
  color: #5f6368;
  text-align: center;
}

.footer-link {
  color: #5f6368;
  text-decoration: none;
}

.dot {
  margin: 0 4px;
}

@media screen and (max-width: 450px) {
  .profile-card {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 0;
    overflow-y: auto;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .close-button {
    position: fixed;
    top: 16px;
    right: 16px;
  }

  .divider {
    width: 350px;
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 0 0 15px 0;
  }

  .action-button-menu-perfil {
    /* margin-bottom: 2px; */
  }
}
</style>
