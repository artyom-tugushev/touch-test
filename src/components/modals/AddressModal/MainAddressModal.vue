<template>
  <q-dialog v-model="model" position="right" @hide="isNewAddressShow = false">
    <q-card>
      <q-btn
        round
        color="background-dark-40"
        class="q-mb-md"
        :class="{ 'q-ml-auto': !isNewAddressShow }"
        @click="onCloseClick"
      >
        <img :src="`/src/assets/icons/${isNewAddressShow ? 'left' : 'cancel'}.svg`" alt="close" />
      </q-btn>
      <q-card-section class="column items-start no-wrap full-width full-height">
        <ChangeAddress
          v-if="isNewAddressShow"
          title="Адрес доставки"
          :addressId="addressId"
          @save="isNewAddressShow = false"
        />
        <SavedAddresses
          v-else
          title="Мои адреса"
          @close="emit('update:modelValue', false)"
          @edit="onEditAddress"
        />
        <q-btn
          v-if="!isNewAddressShow"
          rounded
          no-caps
          color="white"
          text-color="dark"
          class="full-width q-mt-auto q-pa-sm"
          @click="isNewAddressShow = true"
        >
          Новый адрес
        </q-btn>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import SavedAddresses from './SavedAddresses.vue'
import ChangeAddress from './ChangeAddress.vue'

const props = defineProps({ modelValue: { type: Boolean, required: true } })
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
const isNewAddressShow = ref(false)
const onCloseClick = () => {
  isNewAddressShow.value ? (isNewAddressShow.value = false) : emit('update:modelValue', false)
}

const addressId = ref(null)
const onEditAddress = (id) => {
  addressId.value = id
  isNewAddressShow.value = true
}
</script>

<style scoped lang="scss">
.q-card {
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 1.5rem;
  margin: 1.5rem;
  width: 464px;
  height: 100%;
  background: $background-dark-40;
  backdrop-filter: blur(10px);
  border-radius: 2rem !important;
  border: 1px solid $white-15;
  &__section {
    padding: 0;
  }
}
.q-btn {
  background-color: $background-dark-40;
}
</style>