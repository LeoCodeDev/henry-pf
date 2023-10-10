import { useState, useEffect } from 'react'
import axios from 'axios'
import { CardProduct } from '../CardProduct/CardProduct'
import { useProductsStore } from '../../store/productsStore'
import { useAuthStore } from '../../store/authStore'
import { IconButton, InputLabel, MenuItem, Select  } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import styles from './styles/Products.module.css';
import { favoriteStore } from '../../store/favoriteStore';


const Products = () => {

  const initialState = useAuthStore((state) => state.user)

  const { getAllFavorites } = favoriteStore();

  const { filteredProducts, fetchProducts,setCurrency, actualCurrency,setProductsFiltered } = useProductsStore()
  const {user}= useAuthStore()
  const productsPerPage = 8
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)


  useEffect(() => {
    const checkTokenExpiration = async() => {
      try{
        const {data} = await axios.get('/getAccessTokenExpiration', 
        {withCredentials: true}
        )
        const remainingTime = data.expirationTime - Date.now() / 1000;
        if (remainingTime < 60) {
          await axios.get('/refreshToken', 
          {withCredentials: true}
          )
        }
      } catch {
        console.log('error')
      }
    };
    const timer = setInterval(checkTokenExpiration, 60000*1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getAllFavorites(initialState.username);
  },[getAllFavorites, initialState.username])
  const [allProducts, setAllProducts] = useState([])


  useEffect(() => {
    setAllProducts(filteredProducts.slice(
      currentPage * productsPerPage,
      (currentPage + 1) * productsPerPage
    ))
  },[actualCurrency,currentPage,setCurrency, filteredProducts])

  useEffect(() => {
    fetchProducts()
  },[fetchProducts, actualCurrency,setCurrency])

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

  const handleCurrencyChange=async(e)=>{
    await setCurrency(e.target.value)
    await fetchProducts()
    setProductsFiltered()
  }

  return (
    <div className={styles.productsContain}>
      <div className={styles.paginationContain}>
      <InputLabel className={styles.currency}>Currencies</InputLabel>
          <Select
                name="Currency"
                onChange={handleCurrencyChange}
                sx={{ color: '#bfbfbf' }}
          >
                <MenuItem value="EUR"id="EUR" >EUR</MenuItem>
                <MenuItem value={user?.ip_location?.currency} id={user?.ip_location?.currency} >{user?.ip_location?.currency}</MenuItem> 
                <MenuItem value="USD" id="USD" >USD</MenuItem>
          </Select>
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
            <CardProduct
              product={product}
              className={styles.card}
              key={product.id_product}/>
        ))}
      </div>
    </div>
  )
}

export default Products

