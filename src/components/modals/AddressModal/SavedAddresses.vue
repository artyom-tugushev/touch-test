<template>
  <div class="column justify-center full-width">
    <div class="text-white modal-title">{{ props.title }}</div>
    <div
      v-for="item of addressesStore.savedAddresses"
      :key="item.id"
      class="q-py-md row justify-center wrapper"
    >
      <q-checkbox
        dense
        color="white"
        :checked-icon="`img:/src/assets/icons/checkmark.svg`"
        :toggle-indeterminate="false"
        :model-value="isChecked === item.id"
        @update:model-value="onChecked(item.id)"
      />
      <AddressComp :item="item" />
      <img
        src="/src/assets/icons/edit.svg"
        alt="edit"
        class="cursor-pointer q-ml-auto"
        @click="emit('edit', item.id)"
      />
    </div>
  </div>
</template>

<script setup>
import AddressComp from 'src/components/ui/AddressComp.vue'
import { ref } from 'vue'
import { useAddressesStore } from 'src/stores/addresses'
const addressesStore = useAddressesStore()
const emit = defineEmits(['close', 'edit'])
const props = defineProps({ title: { type: String, required: true } })
const isChecked = ref(false)
const onChecked = (id) => {
  isChecked.value = id
  // обновить localStorage
  emit('close')
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid $light-secondary;
}
</style>