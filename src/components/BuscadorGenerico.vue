<template>
  <div
    class="relative search-box"
    :class="{ 'input-container': true }"
  >
    <!-- !props.configAlgolia.isSearchStalled -->
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg
        v-if="props?.configAlgolia && props?.configAlgolia?.isSearchStalled"
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
      >
        <path d="M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z"/>
      </svg>
      <svg
        v-else
        class="h-5 w-5 text-indigo-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
    
    <slot v-if="conSlotVal" />
    <input
      v-else-if="props.configAlgolia"
      :value="props.configAlgolia.currentRefinement"
      @input="inputRefineAlgolia(props.configAlgolia.refine, $event?.currentTarget?.value || '')"
      class="block w-full pl-10 pr-3 py-2 bg-gray-100 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      :placeholder="propPlaceholder || 'Busca lo que necesites'"
    >
    <input
      v-else
      v-model="searchQuery"
      class="block w-full pl-10 pr-3 py-2 bg-gray-100 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
      :placeholder="propPlaceholder || 'Busca lo que necesites'"
    >
    <!-- <span
      v-if="props.configAlgolia"
      :hidden="!props.configAlgolia.isSearchStalled"
    >
      Buscando...
    </span> -->

    <button
      @click="clearSearch"
      v-if="searchQuery"
      class="clear-search"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  watch,
  defineProps,
  PropType
} from 'vue';

interface IConfigAlgolia {
  currentRefinement: any,
  isSearchStalled: any,
  refine: any
}

const conSlotVal = ref(false);
const searchQuery = ref('');

const emit = defineEmits<{
  (e: 'escritura', value: string): void // Solo valido para "algolia" y "normal"
}>();

const props = defineProps({
  'conSlot': {
    type: Boolean,
    required: false,
  },
  'configAlgolia': {
    type: Object as PropType<IConfigAlgolia>,
    required: false
  },
  'propPlaceholder': {
    type: String,
    required: false
  }
});

const inputRefineAlgolia = (refine: any, val: string) => {
  searchQuery.value = val;
  return refine(val);
};

const clearSearch = () => {
  if (props.configAlgolia) {
    inputRefineAlgolia(props.configAlgolia.refine, '');
  }
  searchQuery.value = '';
};

watch(searchQuery, () => {
  emit('escritura', searchQuery.value);
}, { deep: true });

conSlotVal.value = props.conSlot || false;
</script>

<style scoped>
.search-box {
  flex-grow: 1;
  margin-right: 10px;
}

.clear-search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #5d5fef;
  font-size: 20px;
  cursor: pointer;
}

.input-container {
  background: linear-gradient(145deg, #000000, #87CEFA, #0a0a0a, #87CEFA);
  background-size: 400% 400%;
  animation: animate 20s linear infinite;
  border-radius: 12px;
}

.input-container input {
  outline: none;
  border: none;
  background: #f0f0f0;
  border-radius: 10px;
}

@keyframes animate {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 300% 0;
  }
  100% {
    background-position: 0 0;
  }
}

@media (max-width: 600px) {
  .search-box {
    margin-right: 0;
  }
}
</style>