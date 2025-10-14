<template>
  <div class="row full-width wrapper">
    <q-input
      v-for="input in inputs"
      :key="input.name"
      class="col"
      type="number"
      color="white"
      input-style="white"
      :label="input.label"
      v-model="inputValues[input.name]"
    />
  </div>
  <q-input
    class="q-mt-md"
    color="white"
    input-style="white"
    label="Комментарий"
    v-model="comment"
  />
  <q-btn
    rounded
    no-caps
    color="white"
    text-color="dark"
    class="full-width q-mt-auto q-pa-sm"
    :disable="!allFilled"
    @click="handleSubmit"
  >
    Сохранить
  </q-btn>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const emit = defineEmits(['submit'])
const comment = ref('')
const inputs = [
  { label: 'Кв/Офис', name: 'flat' },
  { label: 'Подъезд', name: 'entry' },
  { label: 'Этаж', name: 'floor' },
  { label: 'Домофон', name: 'code' },
]

const inputValues = reactive({})
inputs.forEach((input) => (inputValues[input.name] = ''))
const allFilled = computed(() => {
  return inputs.every((input) => {
    const val = inputValues[input.name]
    return val !== '' && val != null
  })
})

const handleSubmit = () => {
  emit('submit', {
    addressDetails: { ...inputValues },
    comment: comment.value,
  })
}
</script>

<style scoped lang="scss">
.wrapper {
  gap: 1rem;
}
</style>