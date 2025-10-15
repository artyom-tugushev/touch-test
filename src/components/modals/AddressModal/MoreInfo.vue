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
    v-model="localComment"
  />
  <q-btn
    rounded
    no-caps
    color="white"
    text-color="dark"
    class="full-width q-mt-auto q-pa-sm"
    :disable="!allFilled"
    @click="onSubmit"
  >
    Сохранить
  </q-btn>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

const props = defineProps({
  details: {
    type: Object,
    default: () => ({}),
  },
  comment: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['submit'])
const localComment = ref(null)
const inputValues = reactive({})
const inputs = [
  { label: 'Кв/Офис', name: 'flat' },
  { label: 'Подъезд', name: 'entry' },
  { label: 'Этаж', name: 'floor' },
  { label: 'Домофон', name: 'code' },
]
onMounted(() => {
  if (props.details) {
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
    addressDetails: { ...inputValues },
    comment: localComment.value,
  })
}
</script>

<style scoped lang="scss">
.wrapper {
  gap: 1rem;
}
</style>