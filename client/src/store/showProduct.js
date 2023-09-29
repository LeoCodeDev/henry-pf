import axios from 'axios'
import { create } from 'zustand'

const useShowProductStore = create((set) => ({
  product: {},
  productById: async (id) => {
    try {
      const { data } = await axios(`/products/${id}`)
      if (data.status !== 200) {
        throw new Error(data.message)
      } else {
        set({ product: data.product })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}))

export { useShowProductStore }