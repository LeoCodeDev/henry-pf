import { create } from 'zustand'
import axios from 'axios'

const useProductsStore = create((set) => ({
  products: [],
  filteredProducts: [],
  fetchProducts: async () => {
    try {
      const { data } = await axios.get('/products')
      if (!data.allProducts) {
        throw new Error('No products found')
      } else {
        set((state) => {
          state.setProducts(data.allProducts)
        })
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
      if (data.status !== 200) {
        throw new Error('No products found')
      } else {
        set((state) => {
          state.setProducts(data.selectedProduct)
        })
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },
  setProducts: (products) =>
    set({
      products,
      filteredProducts: products,
    }),
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
      const { data } = await axios.post('/products', product)
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
