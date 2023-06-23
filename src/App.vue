<script setup>
  import Navbar from "./components/Navbar.vue";
  import LoginComponent from "./components/LoginComponent.vue";
  import {RouterView} from "vue-router";
  import {onMounted} from "vue";
  import {useUserStore} from "./stores/users";

  const userStore = useUserStore();
  onMounted( () => {
    userStore.getUser();
  })
</script>

<template>
  <main>
    <Navbar />
    <RouterView />
  </main>
</template>
