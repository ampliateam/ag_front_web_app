<template>
  <div>
    <nav class="flex text-center justify-between relative">
      <router-link :to="'#'">
        <div class="flex align-center">
          <div class="rhombus ml-5">
            <svg
              class="h-7 w-7 text-white pt-1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              style="rotate: -45deg"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <rect x="4" y="5" width="16" height="16" rx="2" />
              <line x1="16" y1="3" x2="16" y2="7" />
              <line x1="8" y1="3" x2="8" y2="7" />
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="8" x2="20" y2="8" />
            </svg>
          </div>
          <h2 class="px-4 font-extrabold text-lg text-blue-950">Agendalía</h2>
        </div>
      </router-link>
      <div class="flex">
        <router-link to="/" class="flex mt-1">Home</router-link>
        <div class="flex mt-1 ml-1 mr-2">|</div>
        <router-link to="/about" class="flex mt-1">About</router-link>
      </div>
    </nav>
    <SideBar />
    <slot />
  </div>
</template>

<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
</script>

<style>
nav {
  padding: 30px;
  background-color: white;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
