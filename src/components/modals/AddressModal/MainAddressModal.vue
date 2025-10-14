<template>
  <q-dialog v-model="model" position="right" @hide="isChangeAddress = false">
    <q-card>
      <q-btn
        round
        color="background-dark-40"
        class="q-mb-md"
        :class="{ 'q-ml-auto': !isChangeAddress }"
        @click="onCloseClick"
      >
        <img :src="`/src/assets/icons/${isChangeAddress ? 'left' : 'cancel'}.svg`" alt="close" />
      </q-btn>
      <q-card-section class="column items-start no-wrap full-width full-height">
        <ChangeAddress v-if="isChangeAddress" title="Адрес доставки" />
        <SavedAddresses v-else title="Мои адреса" @close="emit('update:modelValue', false)" />
      </q-card-section>
      <q-btn
        v-if="!isChangeAddress"
        rounded
        no-caps
        color="white"
        text-color="dark"
        class="full-width q-mt-auto q-pa-sm"
        @click="isChangeAddress = true"
      >
        Новый адрес
      </q-btn>
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
const isChangeAddress = ref(false)
const onCloseClick = () => {
  isChangeAddress.value ? (isChangeAddress.value = false) : emit('update:modelValue', false)
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