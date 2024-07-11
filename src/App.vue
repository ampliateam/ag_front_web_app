<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import useUserStore from '@/store/use-user-store.store';
import router from './router';

// onBeforeMount(() => {
//   const userEmail = useUserStore().getEmail;
//   if (!userEmail) router.push('/inicio-sesion');
// });
</script>
