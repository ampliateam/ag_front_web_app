<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
    <div class="bg-white p-5 rounded-lg shadow-lg max-w-md w-full">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-bold text-red-600 pr-4">{{ props.titulo }}</h2>
        <button @click="closeDialog" class="text-gray-500 hover:text-gray-700">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p class="text-gray-700 mb-4">
        {{ props.advertencia }}
      </p>
      <!-- <div class="mb-4">
        <p class="text-gray-600 mb-1">Collection path</p>
        <p class="font-mono text-sm">/ParametrosSistema</p>
      </div> -->
      <div class="mb-4">
        <label class="block text-gray-700 text-sm mb-1" for="confirmation">
          Para eliminar tienes que escribir esto: <b>{{ props.valorParaEliminar }}</b>
        </label>
        <input
          id="confirmation"
          v-model="confirmationText"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          required
          :placeholder="props.valorParaEliminar"
        />
        <!-- <p v-if="showError" class="text-red-500 text-xs mt-1">Required</p> -->
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="closeDialog" class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
          Cancel
        </button>
        <button
          @click="deleteCollection"
          :disabled="confirmationText !== valorParaEliminar"
          class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const confirmationText = ref('');

const props = defineProps({
  titulo: {
    type: String,
    default: true
  },
  advertencia: {
    type: String,
    default: true
  },
  valorParaEliminar: {
    type: String,
    default: true
  }
});

const emit = defineEmits<{
  (e: 'showModel', value: boolean): void;
  (e: 'dataConfirmacion', value: string): void;
}>();

const closeDialog = () => {
  emit('showModel', false);
};

const deleteCollection = () => {
  if (confirmationText.value !== 'ParametrosSistema') {
    emit('dataConfirmacion', confirmationText.value);
    emit('showModel', false);
    return;
  }
  // Implement delete collection logic
};
</script>