import { create } from 'zustand'

const useCartStore = create((set) => ({
  shoppingCart: [],
  totalToPay: 0,
  addProductToCart: (product) => {
    product.quantity = 1
    product.total = product.price
    set((state) => ({
      shoppingCart: [
        ...state.shoppingCart,
          product,
      ],
    }))
  },
  deleteProductFromCart: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.filter((item) => item.id_product !== product.id_product),
    }))
  },
  updateProductQuantity: (product, quantity) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item.id_product === product.id_product ? (item.quantity = quantity) : item
      ),
    }))
  },
  clearCart: () => {
    set({shoppingCart: []})
  },
  oneMore: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item.id_product === product.id_product
          ? { ...item, quantity: item.quantity + 1, total: Number((item.price * item.quantity) + Number(item.price))}
          : item
      ),
    }));
  },
  oneLess: (product) => {
    set((state) => ({
      shoppingCart: state.shoppingCart.map((item) =>
        item.id_product === product.id_product
          ? { ...item, quantity: Math.max(item.quantity - 1, 0), total: Math.max(Number((item.price * item.quantity) - Number(item.price)),0)}
          : item
      ),
    }));
  },
  total: () => {
    set((state) => ({
      totalToPay: state.shoppingCart.reduce((acc, item) => acc + item.total, 0),
    }))
  },
}))

export { useCartStore }
