import axios from 'axios'
import { create } from 'zustand'

const favoriteStore = create((set, get) => ({
  favorites: [],
  getAllFavorites: async (username, force = true) => {
    try {
      const response = await axios(`/getAllFavorites?username=${username}`)
      if (response.status !== 200) {
        throw new Error('Something went wrong, try again')
      } else {
        const { data } = response
        if (force || !get().favorites.length) {
          set({ favorites: [...data] })
        }
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  addFavorite: async (username, id_product) => {
    try {
      const data = await axios.post('/postFavorite', {
        username,
        id_product,
      })
      if (data.status !== 201) {
        throw new Error('Something went wrong, try again')
      } else {
        await get().getAllFavorites(username, true)
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  deleteFavorite: async (username, id_product) => {
    try {
      const data = await axios.delete(`/delFavorite?username=${username}&id_product=${id_product}`)

      if (data.status !== 201) {
        return data.message
      } else {
        set((state) => ({
          favorites: state.favorites.filter(
            (favorite) => favorite.id_product !== id_product
          ),
        }))
        return data.message
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
}))

export { favoriteStore }
