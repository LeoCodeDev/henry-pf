import { create } from "zustand";
import axios from "axios";

const useProductsStore = create((set) => ({
  products: [],
  prefilterProducts: [],
  filteredProducts: [],
  categories: [],
  fetchCategories: async () => {
    try {
      const { data } = await axios.get("/categories");
      if (!data) {
        throw new Error("No categories found");
      } else {
        set({ categories: data });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  fetchProducts: async () => {
    try {
      const { data } = await axios.get("/products");
      if (!data) {
        throw new Error("No products found");
      } else {
        set({ products: data, prefilterProducts: data });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  setProductsByName: async (name) => {
    if (typeof name !== "string" || name.length < 1)
      throw new Error("Invalid name");

    try {
      const { data } = await axios(`/productByName?name=${name}`)
      if (!data) {
        throw new Error('No products found')
      } else {
        set({
          products: data,
          prefilterProducts: data,
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  setProductsFiltered: (category) => {
    set((state) => {
      const prefiltered = category ? state.products.filter(product => product?.Category?.name == category.name) : state.products
      return {prefilterProducts: [...prefiltered], filteredProducts: [...prefiltered]}
    });
  },
  applyFilters: (filter) =>{
    const filters = {
      R1: (product)=> product.rating <= 1,
      R2: (product)=> product.rating >= 2 && product.rating < 3,
      R3: (product)=> product.rating >= 3 && product.rating < 4,
      R4: (product)=> product.rating >= 4 && product.rating < 5,
      R5: (product)=> product.rating === 5,
      P1: (product)=> product.price < 50,
      P2: (product)=> product.price < 100,
      P3: (product)=> product.price < 200,
      P4: (product)=> product.price < 500,
    }
    set((state)=>({
      filteredProducts: state.prefilterProducts.filter(filters[filter])
    }))
  },
  clearFilters: () =>
    set((state) => ({
      filteredProducts: state.prefilterProducts,
    })),
  addProduct: async (product) => {
    try {
      const { data } = await axios.post("/postProduct", product);
      if (data.status !== 200) {
        throw new Error("Error adding product");
      } else {
        set((state) => ({
          products: [...state.products, product],
        }));
      }
    } catch (error) {
      throw new Error(error.message);
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
      abc: (a, b) => a.name.localeCompare(b.name),
      zyx: (a, b) => b.name.localeCompare(a.name),
      mRated: (a, b) => b.rating - a.rating,
      lRated: (a, b) => a.rating - b.rating,
      cheap: (a, b) => a.price - b.price,
      expensive: (a, b) => b.price - a.price,
    };

    set((state) => {
      if (options[sort]) {
        const sortedProducts = [...state.filteredProducts];
        sortedProducts.sort(options[sort]);
        return {...state, filteredProducts: [...sortedProducts] };
      } else if (sort === "all") {
        return { filteredProducts: [...state.filteredProducts] };
      }

      return state;
    });
  },
}));

export { useProductsStore };
