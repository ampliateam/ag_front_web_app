<template>
  <div class="relative group">
    <button
      :class="props.buttonClass"
    >
      <slot />
    </button>
    <div
      class="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bottom-full left-1/2 transform -translate-x-1/2 mb-2"
    >
      <div
        ref="tooltipContent"
        class="bg-white text-gray-800 text-xs text-center rounded-md py-1.5 px-3 shadow-tooltip animate-slide-up break-words max-w-[250px] min-w-[125px]"
      >
        {{ props.tooltipText }}
        <div
          class="tooltip-arrow absolute w-3 h-3 bg-white transform rotate-45 -bottom-1.5 left-1/2 -translate-x-1/2"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onBeforeUnmount  } from 'vue';
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
});

const tooltipContent = ref(null);

const adjustTooltipPosition = () => {
  if (tooltipContent.value) {
    const tooltip = tooltipContent.value;
    const rect = tooltip.getBoundingClientRect();
    const offset = 10; // Margen de seguridad

    if (rect.left < offset) {
      console.log('aaa')
      tooltip.style.left = `${offset}px`;
      tooltip.style.transform = 'translateX(0)';
    } else if (rect.right > window.innerWidth - offset) {
      console.log('eee')
      tooltip.style.left = 'auto';
      tooltip.style.right = `${offset}px`;
      tooltip.style.transform = 'translateX(0)';
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
