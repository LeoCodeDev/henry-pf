import { useState, useEffect } from 'react'
import { CardProduct } from '../CardProduct/CardProduct'
import { useProductsStore } from '../../store/productsStore'
import { IconButton } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Products.module.css';
import { Link } from 'react-router-dom';
import {useShowProductStore} from '../../store/showProduct';

const Products = () => {

  const { filteredProducts, fetchProducts } = useProductsStore()
  const { productById } = useShowProductStore()
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

  const allProducts = filteredProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  )

  const handleProductId = (id) => {
    productById(id)
  }

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
    <div className={styles.productsContain}>
      <div className={styles.paginationContain}>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{ color: '#bfbfbf' }}>
          <ArrowBackIosNew />
        </IconButton>
        <span>
          {currentPage + 1} / {totalPages}
        </span>
        <IconButton
          onClick={handleNextPage}
          disabled={currentPage === totalPages - 1}
          sx={{ color: '#539a07' }}>
          <ArrowForwardIos />
        </IconButton>
      </div>

      <div className={styles.cardsContain}>
        {allProducts.map((product) => (
          <Link onClick={() => handleProductId(product.id_product)} className={styles.card} to={'/product-detail'} key={product.id_product}>
            <CardProduct product={product} key={product.id_product} />
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products

