<template>
  <q-dialog v-model="model" position="right">
    <q-card style="width: 350px">
      <q-linear-progress :value="0.6" color="pink" />

      <q-card-section class="row items-center no-wrap">
        <div>
          <div class="text-weight-bold">The Walker</div>
          <div class="text-grey">Fitz & The Tantrums</div>
        </div>

        <q-space />

        <q-btn flat round icon="fast_rewind" />
        <q-btn flat round icon="pause" />
        <q-btn flat round icon="fast_forward" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>