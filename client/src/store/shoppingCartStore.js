import { create } from 'zustand'

const useCartStore = create((set) => ({
  shoppingCart: [],
  totalToPay: 0,
  addProductToCart: (product) => {
    set((state) => ({
      shoppingCart: [
        ...state.shoppingCart,
        {
          ...product,
          quantity: 0,
          total: 0,
        },
      ],
    }))
  },
  deleteProductFromCart: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((item) => item.id !== product.id),
    }))
  },
  updateProductQuantity: (product, quantity) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item.id === product.id ? (item.quantity = quantity) : item
      ),
    }))
  },
  clearCart: () => {
    // eslint-disable-next-line no-unused-vars
    set((state) => ({
      shoppingCart: [],
    }))
  },
  oneMore: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) => {
        product.id === item.id ? item.quantity++ : item
      }),
    }))
  },
  oneLess: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) => {
        product.id === item.id ? item.quantity-- : item
      }),
    }))
  },
  totalByProduct: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) => {
        product.id === item.id
          ? (item.total = item.price * item.quantity)
          : item
      }),
    }))
  },
  total: () => {
    set((state) => ({
      totalToPay: state.shoppingCart.reduce((acc, item) => acc + item.total, 0),
    }))
  },
}))

export { useCartStore }
