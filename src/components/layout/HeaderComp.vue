<template>
  <q-header class="row q-gutter-sm" elevated>
    <img src="" alt="logo" class="cursor-pointer" @click="router.push('/')" />
    <q-btn @click="isAddressModalShow = !isAddressModalShow"></q-btn>
  </q-header>

  <AddressModal :visible="isAddressModalShow" />
</template>

<script setup>
import { ref } from 'vue'
const isAddressModalShow = ref(false)
</script>

<style scoped lang="scss">
.q-header {
  height: 5rem;
  padding: 1rem 1.5rem;
  border-radius: 0 0 1.5rem 1.5rem;
  filter: blur(0.4);
}
</style>