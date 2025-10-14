<template>
  <div class="column full-height full-width">
    <div class="text-white modal-title">{{ props.title }}</div>
    <div class="row justify-center">
      <q-input
        color="white"
        input-style="white"
        label="Улица и дом"
        debounce="500"
        class="full-width q-mb-lg"
        :clearable="isClearable"
        v-model="search"
        @update:model-value="onInput"
      />
    </div>
    <div v-if="isNothingFound" class="text-white">Ничего не найдено</div>
    <template v-if="suggestions.length">
      <div
        v-for="item in suggestions"
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

    <MoreInfo v-if="isMoreInfoShow" @submit="onSubmit" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import AddressComp from 'src/components/ui/AddressComp.vue'
import MoreInfo from './MoreInfo.vue'

const props = defineProps({
  title: { type: String, required: true },
  addressId: Number,
})
const search = ref('')
const suggestions = ref([])
const loading = ref(false)
const isClearable = ref(true)

const isNothingFound = computed(
  () => isClearable.value && !suggestions.value.length && search.value && !loading.value
)
const isMoreInfoShow = computed(() => !suggestions.value.length && search.value)

const onInput = async () => {
  isClearable.value = true
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
  search.value = `${item.data.street_with_type}, ${item.data.house}`
  suggestions.value = []
  isClearable.value = false
}

const onSubmit = ({ addressDetails, comment }) => {
  console.log({ address: search.value, addressDetails, comment })
}
</script>

<style scoped lang="scss">
.wrapper {
  border-bottom: 1px solid $light-secondary;
}
</style>