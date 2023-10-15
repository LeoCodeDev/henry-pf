import { create } from 'zustand'

const useCartStore = create((set) => ({
  shoppingCart: JSON.parse(localStorage.getItem('cart')) || [],
  totalToPay: 0,
  addProductToCart: (product) => {
    product.quantity = 1
    product.total = product.price
    set((state) => {
      const newCart = [...state.shoppingCart, product]
      localStorage.setItem('cart', JSON.stringify(newCart))
      return { shoppingCart: newCart }
    })
  },
  deleteProductFromCart: (product) => {
    set((state) => {
      const newCart = state.shoppingCart.filter(
        (item) => item.id_product !== product.id_product
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return { shoppingCart: newCart }
    })
  },
  updateProductQuantity: (product, quantity) => {
    set((state) => {
      const newCart = state.shoppingCart.map((item) =>
        item.id_product === product.id_product ? { ...item, quantity } : item
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return { shoppingCart: newCart }
    })
  },
  clearCart: () => {
    set({ shoppingCart: [] })
    localStorage.removeItem('cart')
  },
  oneMore: (product) => {
    set((state) => {
      const newCart = state.shoppingCart.map((item) =>
        item.id_product === product.id_product
          ? {
              ...item,
              quantity: item.quantity + 1,
              total: Number(item.price * item.quantity + Number(item.price))
            }
          : item
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return { shoppingCart: newCart }
    })
  },
  oneLess: (product) => {
    set((state) => {
      const newCart = state.shoppingCart.map((item) =>
        item.id_product === product.id_product
          ? {
              ...item,
              quantity: Math.max(item.quantity - 1, 1),
              total: Math.max(
                Number(item.price * item.quantity - Number(item.price)),
                0
              )
            }
          : item
      )
      localStorage.setItem('cart', JSON.stringify(newCart))
      return { shoppingCart: newCart }
    })
  },
  total: () => {
    set((state) => ({
      totalToPay: state.shoppingCart.reduce(
        (acc, item) => acc + parseInt(item.total),
        0
      )
    }))
  },
  setTotalToPay: (amount) => {
    set(() => ({
      totalToPay: amount
    }))
  }
}))

export { useCartStore }
