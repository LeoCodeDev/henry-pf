import axios from 'axios'
import { create } from 'zustand'
import { useProductsStore } from './productsStore'

const useShowProductStore = create((set) => ({
  product: {},
  productById: async (id) => {
    try {
      const to= useProductsStore.getState().actualCurrency
      const { data } = await axios(`/products/productsById?id=${id}&to=${to}`)
      if (!data) {
        throw new Error(data.message)
      } else {
        set({ product: data })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}))

export { useShowProductStore }