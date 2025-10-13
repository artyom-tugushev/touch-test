<template>
  <q-dialog v-model="model" position="right">
    <q-card class="column items-start">
      <q-btn
        round
        color="background-dark-40"
        class="q-ml-auto q-mb-md"
        @click="emit('update:modelValue', false)"
      >
        <img src="/src/assets/icons/cancel.svg" alt="close" class="close-icon icon" />
      </q-btn>
      <q-card-section class="column items-start no-wrap full-width">
        <SavedAddresses title="Мои адреса" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import SavedAddresses from './SavedAddresses.vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<style scoped lang="scss">
.q-card {
  display: flex;
  flex-direction: column;
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
.icon {
  width: 20px;
  height: 20px;
}
</style>