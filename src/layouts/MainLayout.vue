<template>
  <q-layout view="lHh Lpr lFf">
    <HeaderComp />

    <q-page-container class="row justify-center">
      <div class="background"></div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import HeaderComp from 'src/components/layout/HeaderComp.vue'
</script>

<style scoped>
.background {
  background: no-repeat url(../assets/img/background-baked.jpg);
  background-position: center;
  background-size: contain;
  width: 1440px;
  height: 1964px;
}
</style>