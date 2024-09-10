<template>
  <div class="relative group">
    <button :class="props.buttonClass">
      <slot />
    </button>
    <div
      :class="[
        'absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out',
        positionClass
      ]"
    >
      <div
        ref="tooltipContent"
        class="bg-white text-gray-800 text-xs text-center rounded-md py-1.5 px-3 shadow-tooltip animate-slide-up break-words max-w-[250px] min-w-[125px]"
        :style="`${tooltipStyle} z-index: 999;`"
      >
        {{ props.tooltipText }}
        <div
          :class="[
            'tooltip-arrow absolute w-3 h-3 bg-white transform rotate-45',
            arrowPositionClass
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, computed, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  buttonClass: {
    type: String,
    default:
      'bg-indigo-500 hover:bg-indigo-600 text-white rounded-md px-4 py-2 text-sm font-medium transition duration-300 ease-in-out',
  },
  tooltipText: {
    type: String,
    required: true,
  },
  tipoTooltip: {
    type: String,
    default: 'top',
    validator: (value: string) => ['top', 'bottom', 'left', 'right', 'custom'].includes(value),
  },
  customAngle: {
    type: Number,
    default: 0,
  },
});

const tooltipContent = ref<any>(null);

const positionClass = computed(() => {
  switch (props.tipoTooltip) {
    case 'top': return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
    case 'bottom': return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
    case 'left': return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
    case 'right': return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
    case 'custom': return 'transform -translate-x-1/2 -translate-y-1/2';
    default: return '';
  }
});

const arrowPositionClass = computed(() => {
  switch (props.tipoTooltip) {
    case 'top': return '-bottom-1.5 left-1/2 -translate-x-1/2';
    case 'bottom': return '-top-1.5 left-1/2 -translate-x-1/2';
    case 'left': return '-right-1.5 top-1/2 -translate-y-1/2';
    case 'right': return '-left-1.5 top-1/2 -translate-y-1/2';
    case 'custom': return 'hidden';
    default: return '';
  }
});

const tooltipStyle = computed(() => {
  if (props.tipoTooltip === 'custom') {
    const angle = props.customAngle % 360;
    const radius = 100; // Distancia del tooltip al botón en píxeles
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    return {
      transform: `translate(${x}px, ${y}px)`,
    };
  }
  return {};
});

const adjustTooltipPosition = () => {
  if (tooltipContent.value) {
    const tooltip = tooltipContent.value;
    const rect = tooltip.getBoundingClientRect();
    const offset = 10; // Margen de seguridad

    if (rect.left < offset) {
      tooltip.style.left = `${offset}px`;
      tooltip.style.transform = 'translateY(-50%)';
    } else if (rect.right > window.innerWidth - offset) {
      tooltip.style.left = 'auto';
      tooltip.style.right = `${offset}px`;
      tooltip.style.transform = 'translateY(-50%)';
    }
  }
};

onMounted(() => {
  window.addEventListener('resize', adjustTooltipPosition);
  adjustTooltipPosition();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', adjustTooltipPosition);
});
</script>

<style scoped>
.tooltip-arrow {
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.03);
}
</style>