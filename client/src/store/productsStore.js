import { create } from 'zustand'
import axios from 'axios'

const useProductsStore = create((set) => ({
  products: [],
  filteredProducts: [],
  categories:[],
  fetchCategories: async () => {
    try {
      const { data } = await axios.get('/categories')
      if (!data) {
        throw new Error('No categories found')
      } else {
        set({ categories: data })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  fetchProducts: async () => {
    try {
      const { data } = await axios.get('/products')
      if (!data) {
        throw new Error('No products found')
      } else {
        set({ products: data, filteredProducts: data })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  setProductsByName: async (name) => {
    if (typeof name !== 'string' || name.length < 1)
      throw new Error('Invalid name')

    try {
      const { data } = await axios(`/productByName?name=${name}`)
      if (!data) {
        throw new Error('No products found')
      } else {
        set({
          products: data,
          filteredProducts: data,
        })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  applyFilters: (filters) =>
    set((state) => ({
      filteredProducts: state.products.filter((product) => {
        return (
          (!filters.category || filters.category === product.category) &&
          (!filters.rate || filters.rate <= product.rate) &&
          (!filters.price || filters.price <= product.price)
        )
      }),
    })),
  clearFilters: () =>
    set((state) => ({
      filteredProducts: state.products,
    })),
  addProduct: async (product) => {
    try {
      const { data } = await axios.post('/postProduct', product)
      if (data.status !== 200) {
        throw new Error('Error adding product')
      } else {
        set((state) => ({
          products: [...state.products, product],
        }))
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  deleteImage: async (image) =>{
    try {
      const res = await axios.post('/delImage',{image: image})
      return res
    } catch (error) {
      throw new Error (error.message)
    }
  },
  applySort: (sort) => {
    const options = {
      abc: (a, b) => a.product_name.localeCompare(b.product_name),
      zyx: (a, b) => b.product_name.localeCompare(a.product_name),
      mRated: (a, b) => a.rate - b.rate,
      lRated: (a, b) => b.rate - a.rate,
      expensive: (a, b) => a.price - b.price,
      cheap: (a, b) => a.price - b.price,
    }

    set((state) => {
      if (options[sort]) {
        const sortedProducts = [...state.filteredProducts]
        sortedProducts.sort(options[sort])
        return { filteredProducts: sortedProducts }
      } else if (sort === 'all') {
        return { filteredProducts: [...state.filteredProducts] }
      }

      return state
    })
  },
}))

export { useProductsStore }
