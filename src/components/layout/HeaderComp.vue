<template>
  <q-header class="row items-center q-gutter-x-md" elevated>
    <img
      src="/src/assets/icons/logo_touch.svg"
      alt="logo"
      class="cursor-pointer"
      @click="router.push('/')"
    />
    <AddressComp
      showArrow
      :item="{ street: 'Выберите адрес', city: 'Ваш адрес доставки' }"
      @click="isAddressModalShow = !isAddressModalShow"
    />
  </q-header>

  <MainAddressModal v-model="isAddressModalShow" />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AddressComp from 'src/components/ui/AddressComp.vue'
const router = useRouter()

import MainAddressModal from '../modals/AddressModal/MainAddressModal.vue'
const isAddressModalShow = ref(true)
</script>

<style scoped lang="scss">
.q-header {
  height: 5rem;
  padding: 1rem 1.5rem;
  border-radius: 0 0 1.5rem 1.5rem;
  filter: blur(0.4);
}
</style>