import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useAddressesStore = defineStore('addresses', {
  state: () => ({
    savedAddresses: LocalStorage.getItem('savedAddresses') || [],
    selectedAddressId: LocalStorage.getItem('selectedAddressId') || null,
  }),

  actions: {
    saveToLocalStorage() {
      LocalStorage.set('savedAddresses', this.savedAddresses)
      LocalStorage.set('selectedAddressId', this.selectedAddressId)
    },
    removeAddressById(id) {
      this.savedAddresses = this.savedAddresses.filter((address) => address.id !== id)
    },
  },

  getters: {
    getSelectedAddress: (state) => {
      return state.savedAddresses.find((a) => a.id === state.selectedAddressId) || null
    },
    getAddressById: (state) => {
      return (id) => state.savedAddresses.find((a) => a.id === id) || null
    },
  },
})
