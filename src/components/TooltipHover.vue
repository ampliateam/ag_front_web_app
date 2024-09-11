<template>
  <div class="tooltip-container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-200 ease-in-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in-out"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          ref="tooltip"
          class="tooltip"
          :class="position"
          v-show="isVisible"
        >
          {{ text }}
          <div
            ref="tooltipArrow"
            class="tooltip-arrow"
            :class="arrowPositionClass"
          />
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script>
export default {
  name: 'TooltipHover',
  props: {
    text: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: 'derecha',
      validator(value) {
        return ['arriba', 'derecha', 'abajo', 'izquierda'].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#333',
      required: false,
      validator(value) {
        return value[0] === '#' && [4,7].includes(value.length);
      },
    },
    textColor: {
      type: String,
      default: '#fff',
      required: false,
      validator(value) {
        return value[0] === '#' && [4,7].includes(value.length);
      },
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    arrowPositionClass() {
      return {
        'arrow-top': this.position === 'abajo',
        'arrow-bottom': this.position === 'arriba',
        'arrow-left': this.position === 'derecha',
        'arrow-right': this.position === 'izquierda',
      };
    },
  },
  methods: {
    showTooltip() {
      if (this.disabled) return;
      this.isVisible = true;
      this.$nextTick(() => {
        this.updateTooltipPosition();
      });
    },
    hideTooltip() {
      this.isVisible = false;
    },
    updateTooltipPosition() {
      const tooltip = this.$refs.tooltip;
      const tooltipArrow = this.$refs.tooltipArrow;
      const container = this.$el;

      tooltipArrow.style['background-color'] = this.backgroundColor;
      tooltip.style['background-color'] = this.backgroundColor;
      tooltip.style['color'] = this.textColor;

      const containerRect = container.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let top, left;

      switch (this.position) {
        case 'arriba':
          top = containerRect.top - tooltipRect.height - 8;
          // left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
          left = containerRect.left + containerRect.width / 2;
          break;
        case 'abajo':
          top = containerRect.bottom + 8;
          // left = containerRect.left + containerRect.width / 2 - tooltipRect.width / 2;
          left = containerRect.left + containerRect.width / 2;
          break;
        case 'derecha':
          // top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
          top = containerRect.top + containerRect.height / 2;
          left = containerRect.right + 8;
          break;
        case 'izquierda':
          // top = containerRect.top + containerRect.height / 2 - tooltipRect.height / 2;
          top = containerRect.top + containerRect.height / 2;
          left = containerRect.left - tooltipRect.width - 8;
          break;
      }
      
      tooltip.style.top = `${top}px`;
      tooltip.style.left = `${left}px`;
    }
  },
};
</script>

<style scoped>
.tooltip-container {
  position: relative;
  display: inline;
  align-items: center;
}

.tooltip {
  position: absolute;
  padding: 10px;
  border-radius: 4px;
  white-space: nowrap;
  font-size: 15px;
  z-index: 1000;
}

.tooltip-arrow {
  width: 8px;
  height: 8px;
  position: absolute;
  transform: rotate(45deg);
}

.tooltip.arriba {
  transform: translateX(-50%);
}

.tooltip.abajo {
  transform: translateX(-50%);
}

.tooltip.derecha {
  transform: translateY(-50%);
}

.tooltip.izquierda {
  transform: translateY(-50%);
}

/* Flecha para cuando el tooltip está arriba */
.arrow-bottom {
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

/* Flecha para cuando el tooltip está abajo */
.arrow-top {
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
}

/* Flecha para cuando el tooltip está a la derecha */
.arrow-left {
  left: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

/* Flecha para cuando el tooltip está a la izquierda */
.arrow-right {
  right: -4px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

</style>
