<template>
  <div>
    <div class="relative">
      <div :class="`overflow-x-auto flex whitespace-nowrap border-b border-gray-200 hide-scrollbar`">
        <slot />
      </div>
    </div>
    <!-- <div class="mt-4">
      <slot :name="activeTab"></slot>
    </div> -->
  </div>
</template>

<style scoped>
.hide-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.hide-scrollbar::-webkit-scrollbar {
  display: none;  /* Chrome, Safari and Opera */
}
</style>