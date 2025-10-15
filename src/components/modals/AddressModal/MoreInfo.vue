<template>
  <q-toggle
    left-label
    dense
    class="q-mb-md"
    color="green"
    label="Частный дом"
    v-model="isHouseLocal"
  />
  <div v-if="!isHouseLocal" class="row full-width q-mb-md wrapper">
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
  <q-input color="white" input-style="white" label="Комментарий" v-model="localComment" />
  <q-btn
    rounded
    no-caps
    color="white"
    text-color="dark"
    class="full-width q-mt-auto"
    :disable="!allFilled"
    @click="onSubmit"
  >
    Сохранить
  </q-btn>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  details: { type: Object, default: () => ({}) },
  comment: { type: String, default: '' },
  isHouse: { type: Boolean, default: false },
})
const emit = defineEmits(['submit'])
const localComment = ref(null)
const inputValues = reactive({})
const isHouseLocal = ref(false)
const inputs = [
  { label: 'Кв/Офис', name: 'flat' },
  { label: 'Подъезд', name: 'entry' },
  { label: 'Этаж', name: 'floor' },
  { label: 'Домофон', name: 'code' },
]
onMounted(() => {
  if (props.details) {
    isHouseLocal.value = props.isHouse
    inputs.forEach((input) => (inputValues[input.name] = props.details[input.name]))
    localComment.value = props.comment
  }
})

const allFilled = computed(() => {
  return inputs.every((input) => {
    const val = inputValues[input.name]
    return val !== '' && val != null
  })
})

const onSubmit = () => {
  emit('submit', {
    isHouse: isHouseLocal.value,
    addressDetails: { ...inputValues },
    comment: localComment.value,
  })
}
</script>

<style scoped lang="scss">
.wrapper {
  gap: 1rem;
}
.q-toggle {
  width: 100%;
  padding: 1rem 0;
  border-bottom: 1px solid $light-secondary;
}
</style>