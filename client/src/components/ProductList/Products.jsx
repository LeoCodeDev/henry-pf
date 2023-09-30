import { CardProduct } from "../CardProduct/CardProduct";
import { useProductsStore } from "../../store/productsStore";
import { useEffect } from "react";
import styles from './styles/Products.module.css';

const Products = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const products = useProductsStore((state) => state.getCurrentPageProducts());
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]); 
  console.log(products);
  return (
    <div className={styles.cardsContain}>
      {products.map((product) => (
        <CardProduct product={product} key={product.id_product} />
      ))}
    </div>
  );
};

export default Products;
