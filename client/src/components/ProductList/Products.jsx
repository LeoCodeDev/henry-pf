import { useEffect } from 'react'
import axios from 'axios'
import { CardProduct } from '../CardProduct/CardProduct'
import { useProductsStore } from '../../store/productsStore'
import { useAuthStore } from '../../store/authStore'
import { IconButton, InputLabel, MenuItem, Select } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Products.module.css'
import { favoriteStore } from '../../store/favoriteStore'
import { useLogicPagination } from './logicPagination'

const Products = () => {
  const initialState = useAuthStore((state) => state.user)
  const { getAllFavorites } = favoriteStore()
  const {
    filteredProducts,
    fetchProducts,
    setCurrency,
    actualCurrency,
    setProductsFiltered,
  } = useProductsStore()
  const { user } = useAuthStore()
  const productsPerPage = 8

  const {
    pagedItems,
    handleNextPage,
    handlePrevPage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useLogicPagination(filteredProducts, productsPerPage)

  useEffect(() => {
    const checkTokenExpiration = async () => {
      try {
        const { data } = await axios.get('/users/getAccessTokenExpiration', {
          withCredentials: true,
        })
        const remainingTime = data.expirationTime - Date.now() / 1000
        if (remainingTime < 60) {
          await axios.get('/users/refreshToken', { withCredentials: true })
        }
      } catch {
        await axios.get('/users/refreshToken', { withCredentials: true })
        console.log('error')
      }
    }

    checkTokenExpiration()

    const timer = setInterval(checkTokenExpiration, 60 * 1000)
    getAllFavorites(initialState.username)
    return () => clearInterval(timer)
  }, [getAllFavorites, initialState.username])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts, actualCurrency, setCurrency])

  useEffect(() => {
    setCurrentPage(0)
  }, [filteredProducts, setCurrentPage])

  const handleCurrencyChange = async (e) => {
    await setCurrency(e.target.value)
    await fetchProducts()
    setProductsFiltered()
  }

  return (
    <div className={styles.productsContain}>
      <div className={styles.paginationContain}>
        <InputLabel sx={{ color: '#bfbfbf', margin: '5px' }}>
          Currencies
        </InputLabel>
        <Select
          name="Currency"
          value={actualCurrency}
          onChange={handleCurrencyChange}
          sx={{
            color: '#1E1E1E',
            backgroundColor: '#bfbfbf',
            fontSize: '5px',
          }}
        >
          <MenuItem value="EUR" id="EUR">
            EUR
          </MenuItem>
          <MenuItem
            value={user?.ip_location?.currency}
            id={user?.ip_location?.currency}
          >
            {user?.ip_location?.currency}
          </MenuItem>
          <MenuItem value="USD" id="USD">
            USD
          </MenuItem>
        </Select>
        <IconButton
          onClick={handlePrevPage}
          disabled={currentPage === 0}
          sx={{ color: '#bfbfbf' }}
        >
          <ArrowBackIosNew />
        </IconButton>
        <span>
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
        {pagedItems.map((product) => (
          <CardProduct
            product={product}
            className={styles.card}
            key={product.id_product}
          />
        ))}
      </div>
    </div>
  )
}

export default Products
