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

    <MoreInfo
      v-if="isMoreInfoShow"
      :isHouse="changeAddressData?.isHouse"
      :details="changeAddressData?.addressDetails"
      :comment="changeAddressData?.comment"
      @submit="onSubmit"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import axios from 'axios'
import AddressComp from 'src/components/ui/AddressComp.vue'
import MoreInfo from './MoreInfo.vue'
import { useAddressesStore } from 'src/stores/addresses'
const addressesStore = useAddressesStore()
const emit = defineEmits(['save'])
const props = defineProps({
  title: { type: String, required: true },
  addressId: Number,
})
const search = ref('')
const suggestions = ref([])
const loading = ref(false)
const isClearable = ref(true)
const selectedAddress = ref(null)

const isNothingFound = computed(
  () => isClearable.value && !suggestions.value.length && search.value && !loading.value
)
const isMoreInfoShow = computed(
  () => !suggestions.value.length && search.value && !isNothingFound.value && !loading.value
)

const changeAddressData = ref(null)
watch(
  () => props.addressId,
  (newId) => {
    if (newId) {
      const address = addressesStore.getAddressById(newId)
      search.value = address.street
      changeAddressData.value = address
      isClearable.value = false
    }
  },
  { immediate: true }
)

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
  selectedAddress.value = item
  suggestions.value = []
  isClearable.value = false
}

const onSubmit = ({ addressDetails, comment, isHouse }) => {
  if (props.addressId) {
    const index = addressesStore.savedAddresses.findIndex((a) => a.id === props.addressId)
    addressesStore.savedAddresses[index] = {
      ...addressesStore.savedAddresses[index],
      street: search.value,
      isHouse,
      addressDetails,
      comment,
    }
  } else {
    const newAddress = {
      id: Date.now(),
      street: search.value,
      city: selectedAddress.value.data.city,
      isHouse,
      addressDetails,
      comment,
    }
    addressesStore.savedAddresses.push(newAddress)
    addressesStore.selectedAddressId = newAddress.id
  }

  addressesStore.saveToLocalStorage()
  emit('save')
}
</script>

<style scoped lang="scss">
.wrapper {
  border-bottom: 1px solid $light-secondary;
}
</style>