<template>
  <div class="overlay-container">
    <div class="overlay" @click="cerrarOverlay" />
    <div :class="['content-wrapper', positionClass]">
      <!-- <div :class="['content', cardClass]"> -->
        <div class="fixed inset-0 flex items-center justify-center">
          <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
            <slot />
          </div>
        </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  onUnmounted
} from 'vue'

export default {
  name: 'OverlayGenerico',
  props: {
    mostrar: {
      type: Boolean,
      default: false,
    },
    etiqueta: {
      type: String,
      default: 'centro',
      validator: (value) => ['centro', 'derecha', 'abajo', 'izquierda', 'arriba'].includes(value)
    },
  },
  setup(props, { emit }) {
    const cerrarOverlay = () => {
      document.removeEventListener('keydown', handleEscapeKey);
      emit('cerrado');
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        cerrarOverlay();
      }
    };

    const positionClass = computed(() => {
      switch (props.etiqueta) {
        case 'centro': return 'position-center'
        case 'derecha': return 'position-right'
        case 'abajo': return 'position-bottom'
        case 'izquierda': return 'position-left'
        case 'arriba': return 'position-top'
        default: return ''
      }
    });

    // const cardClass = computed(() => {
    //   return props.etiqueta ? 'card' : ''
    // });

    onMounted(() => {
      document.addEventListener('keydown', handleEscapeKey);
    });

    onUnmounted(() => {
      document.removeEventListener('keydown', handleEscapeKey)
    });

    return {
      cerrarOverlay,
      positionClass,
      // cardClass,
    }
  }
}
</script>

<style scoped>
.overlay-container {
  position: relative;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}

.content-wrapper {
  position: fixed;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .content {
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
} */

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.position-center {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.position-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 300px; /* Ajusta según necesites */
}

.position-bottom {
  left: 0;
  right: 0;
  bottom: 0;
  height: 200px; /* Ajusta según necesites */
}

.position-left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px; /* Ajusta según necesites */
}

.position-top {
  top: 0;
  left: 0;
  right: 0;
  height: 200px; /* Ajusta según necesites */
}
</style>