<template>
  <div class="column justify-center full-width">
    <div class="text-white modal-title">{{ props.title }}</div>
    <div class="row justify-center wrapper">
      <q-input
        color="white"
        input-style="white"
        label="Улица и дом"
        debounce="500"
        class="full-width"
        v-model="street"
        @update:model-value="onInput"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
const props = defineProps({ title: { type: String, required: true } })
const street = ref('')
const suggestions = ref([])

const onInput = async () => {
  const token = import.meta.env.VITE_DADATA_TOKEN
  if (!street.value.trim()) {
    suggestions.value = []
    return
  }

  try {
    const response = await axios.post(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      { query: street.value },
      { headers: { Authorization: `Token ${token}` } }
    )

    suggestions.value = response.data.suggestions
  } catch (error) {
    console.error('Ошибка DaData:', error)
    suggestions.value = []
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 1rem;
}
</style>