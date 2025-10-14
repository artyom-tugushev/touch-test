import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useAddressesStore = defineStore('addresses', {
  state: () => ({
    savedAddresses: LocalStorage.getItem('savedAddresses') || [],
    selectedAddressId: LocalStorage.getItem('selectedAddressId') || null,
  }),

  actions: {
    save() {
      LocalStorage.set('savedAddresses', this.savedAddresses)
      LocalStorage.set('selectedAddressId', this.selectedAddressId)
    },
  },

  getters: {
    selectedAddress: (state) => {
      return state.savedAddresses.find((a) => a.id === state.selectedAddressId) || null
    },
  },
})
