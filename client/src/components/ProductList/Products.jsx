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
import { useState, useEffect } from 'react'
import { CardProduct } from '../CardProduct/CardProduct'
import { useProductsStore } from '../../store/productsStore'
import { IconButton } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Products.module.css'

const Products = () => {
  const { filteredProducts, fetchProducts } = useProductsStore()
  const productsPerPage = 8
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchProducts()
      } catch (error) {
        throw new Error(error.message)
      }
    }
    fetchData()
  }, [fetchProducts])

  console.log({ filteredProducts })

  const allProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [filteredProducts])

  return (
    <>
      <div className={styles.productsContain}>
      <div className={styles.paginationContain}>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{ color: '#bfbfbf' }}
        >
          <ArrowBackIosNew />
        </IconButton>
        <span className={styles.pageNumber}>
          {currentPage + 1} / {totalPages}
        </span>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          sx={{ color: '#539a07' }}
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
    </>
    
  )
}

export default Products
