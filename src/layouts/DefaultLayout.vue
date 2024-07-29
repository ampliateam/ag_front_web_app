<template>
  <div>
    <SideBar />
    <nav class="flex">
      <div class="flex">
        <router-link to="/" class="flex mt-1">Home</router-link>
        <div class="flex mt-1 ml-1 mr-2">|</div>
        <router-link to="/about" class="flex mt-1">About</router-link>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import SideBar from '@/components/SideBar.vue';
</script>

<style>
nav {
  margin-left: 16rem;
  padding: 30px;
  background-color: rgb(255, 255, 255);
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
