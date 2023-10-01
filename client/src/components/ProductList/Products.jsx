/* import { CardProduct } from "../CardProduct/CardProduct";
import { useProductsStore } from "../../store/productsStore";
import { useEffect } from "react";
import styles from './styles/Products.module.css';

const Products = () => {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);
  const products = useProductsStore((state) => state.filteredProducts);
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
 */
import { useState, useEffect } from "react";
import { CardProduct } from "../CardProduct/CardProduct";
import { useProductsStore } from "../../store/productsStore";
import { IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import styles from './styles/Products.module.css';

const Products = () => {
  const { fetchProducts, products, filteredProducts } = useProductsStore();
  const productsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    fetchProducts();
    console.log('entro a useEffect');
  }, [filteredProducts, fetchProducts]); 

  console.log({products, filteredProducts});

  const allProducts= filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(0);
  }, [products]);

  return (
    <div className={styles.productsContain}>
  
      <div className={styles.paginationContain}>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{ color: "#bfbfbf" }}
        >
          <ArrowBackIosNew />
        </IconButton>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          sx={{ color: "#539a07" }}
        >
          <ArrowForwardIos />
        </IconButton>
      </div>

      <div className={styles.cardsContain}>
        {allProducts.map((product) => (
          <CardProduct product={product} key={product.id_product} />
        ))}
      </div>

    </div>
  );
};

export default Products;