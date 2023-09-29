import { create } from 'zustand'

const useProductsStore = create((set) => ({
  products: [],
  filteredProducts: [],
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
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),
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
