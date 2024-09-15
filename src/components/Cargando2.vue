<template>
  <div v-if="props.loading" class="flex justify-center items-center h-full w-full">
    <div class="animate-spin">
      <slot>
        <!-- SVG por defecto si no se proporciona ninguno -->
        <!-- <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
          width="65px" height="65px" viewBox="0 0 40 40" enable-background="new 0 0 40 40"
          xml:space="preserve">
        <path opacity="0.6" fill="#ffffff" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
          s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
          c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
        <path fill="#00b7eb" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
          C22.32,8.481,24.301,9.057,26.013,10.047z">
          <animateTransform attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="5s"
            repeatCount="indefinite"/>
          </path>
        </svg> -->

        <svg class="w-12 h-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="#035afc" stroke-width="4"></circle>
          <path class="opacity-75" fill="#035afc" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: true
  }
})
</script>

<style scoped>
.animate-spin {
  margin-top: 15%;
}
</style>