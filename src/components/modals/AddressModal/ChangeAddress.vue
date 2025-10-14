<template>
  <div class="column justify-center full-width">
    <div class="text-white modal-title">{{ props.title }}</div>
    <div class="row justify-center">
      <q-input
        color="white"
        input-style="white"
        label="Улица и дом"
        debounce="500"
        class="full-width q-mb-lg"
        :clearable="!selectedAddress"
        v-model="search"
        @update:model-value="onInput"
      />
    </div>
    <template v-if="suggestions.length">
      <div
        v-for="item of suggestions"
        :key="item.id"
        class="q-py-md row cursor-pointer wrapper"
        @click="onSuggestionClick(item)"
      >
        <AddressComp
          :item="{
            street: getStreet(item),
            city: item.data.city ?? item.data.country,
          }"
        />
        <img src="/src/assets/icons/next.svg" alt="edit" class="q-ml-auto" />
      </div>
    </template>

    <div v-if="isNothingFound" class="text-white">Ничего не найдено</div>
    <div v-if="isInputsShow" class="">другие инпуты</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import AddressComp from 'src/components/ui/AddressComp.vue'

const props = defineProps({ title: { type: String, required: true } })
const search = ref('')
const suggestions = ref([])
const loading = ref(false)
const selectedAddress = ref(null)

const isNothingFound = computed(
  () => !selectedAddress.value && !suggestions.value.length && search.value && !loading.value
)
const isInputsShow = computed(
  () => selectedAddress.value && !suggestions.value.length && search.value
)

const onInput = async () => {
  const token = import.meta.env.VITE_DADATA_TOKEN
  if (!search.value) {
    suggestions.value = []
    return
  }

  try {
    loading.value = true
    const response = await axios.post(
      'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
      { query: search.value },
      { headers: { Authorization: `Token ${token}` } }
    )
    suggestions.value = response.data.suggestions.slice(0, 5)
  } catch (error) {
    console.error('Ошибка DaData:', error)
    suggestions.value = []
  } finally {
    loading.value = false
  }
}

const getStreet = (item) => {
  if (!item.data.street_with_type || !item.data.house) {
    return item.value
  }
  return `${item.data.street_with_type}, ${item.data.house}`
}

const onSuggestionClick = (item) => {
  if (!item.data.street_with_type || !item.data.house) {
    return
  }
  selectedAddress.value = item
  search.value = `${item.data.street_with_type}, ${item.data.house}`
  suggestions.value = []
}
</script>

<style scoped lang="scss">
.wrapper {
  border-bottom: 1px solid $light-secondary;
}
</style>