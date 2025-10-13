<template>
  <q-header class="row q-gutter-x-md" elevated>
    <img
      src="/src/assets/logo_touch.svg"
      alt="logo"
      class="cursor-pointer"
      @click="router.push('/')"
    />
    <q-btn @click="isAddressModalShow = !isAddressModalShow">show</q-btn>
  </q-header>

  <MainAddressModal v-model="isAddressModalShow" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import MainAddressModal from '../modals/AddressModal/MainAddressModal.vue'
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