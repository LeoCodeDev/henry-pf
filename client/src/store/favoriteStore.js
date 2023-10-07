import axios from 'axios'
import { create } from 'zustand'

const favoriteStore = create((set) => ({
  favorites: [{
    id_product: 11,
    name: "sweat pants",
    image:
      "https://apparel.goldsgym.com/media/image/ef/0e/46/VorschauXqHgHJZcGoTz4.jpg",
    description: "comfortable and durable",
    price: "100.00",
    stock: 10,
    rating: 2,
    active: true,
    CategoryIdCategory: 1,
    Category: {
      id_category: 1,
      name: "clothes",
      variants: ["XS", "S", "M", "L", "XL"],
    },
  },],
  getAllFavorites: async (username) => {
    try {
      const { data } = await axios(`/getAllFavorites?username=${username}`)
      if (data.status !== 200) {
        throw new Error('Something went wrong, try again')
      } else {
        set({ favorites: [...data.allFavorites] })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  addFavorite: async (username, id_product) => {
    try {
      const { data } = await axios.post('/postFavorite', {
        username,
        id_product,
      })
      if (data.status !== 200) {
        throw new Error('Something went wrong, try again')
      } else {
        const { product } = data
        set((state) => ({ favorites: [...state.favorites, product] }))
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  deleteFavorite: async (username, id_product) => {
    try {
      const { data } = await axios.delete('/delFavorite', {
        username,
        id_product,
      })
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
