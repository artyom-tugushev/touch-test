<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated> </q-header>

    <q-page-container class="row justify-center">
      <div class="background"></div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
//
</script>

<style scoped>
.q-header {
  height: 5rem;
  padding: 1rem 1.5rem;
  border-radius: 0 0 1.5rem 1.5rem;
  filter: blur(0.4);
}
.background {
  background: no-repeat url(../assets/background-baked.jpg);
  background-position: center;
  background-size: contain;
  width: 1440px;
  height: 1964px;
}
</style>