import {useEffect, useState } from 'react'
import styles from '../ModalCart/ModelCart.module.css'
import { CardProductMiniCart } from '../../CardProductMiniCart/CardProductMiniCart'
import Button from '@mui/material/Button'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { TextField } from '@mui/material'
import { isMobile } from 'react-device-detect'
import { useCartStore } from '../../../store/shoppingCartStore'
import { useAuthStore } from '../../../store/authStore'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
export const ModalCart = ({ toggleDrawer }) => {
  const { shoppingCart, totalToPay ,setTotalToPay} = useCartStore()
  const [coupon, setCoupon] = useState('');
  const {user, setShowRegister}= useAuthStore()
  const navigate = useNavigate()

  const calculateTotal = async () => {
    if (shoppingCart.length === 0) {
      localStorage.removeItem('coupon');
    }
    const total = await shoppingCart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    )
    if (localStorage.getItem('coupon')) {
      const { discount } = await JSON.parse(localStorage.getItem('coupon'))
      setTotalToPay(total - discount)
    } else {
      setTotalToPay(total)
    }
  }

  useEffect(() => {
    calculateTotal()
  }, [shoppingCart])

  const validateTokenUser= async()=>{
    try {
      if(user.role==='guest'){
        toggleDrawer('right', false)
        setShowRegister()
      } else{
        const {data}=await axios.get('/users/tokenValidation',{
          withCredentials: true
        })
        if(data.valid) navigate('/payment')
        else{
          return toast.error('Invalid or expired token')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setCouponDiscount=async(coupon)=>{
    if(coupon){
      try {
        if (!user.email) return toast.error('"Guest" users can\'t add coupons. Please Login.')
        const { data} = await axios.get(`/dashboard/validateCoupon?email=${user.email}&code=${coupon}`)
        if(data.message != 'Coupon is valid'){
            toast.error("Invalid or expired coupon!")
        }
        localStorage.setItem('coupon', JSON.stringify({coupon:coupon,discount:data.discount}))
        setTotalToPay(totalToPay-data.discount)
        toast.success("Coupon applied successfully!")
      }
      catch (error) {
        toast.error("Invalid or expired coupon!")
      }
    }
  }

  return (
    <>
      <div className={styles.container}>
        {isMobile ? (
          <Button
            variant="contained"
            sx={{ margin: '1rem' }}
            onClick={toggleDrawer}>
            <ArrowBackIcon sx={{ width: '15px' }} />
            back
          </Button>
        ) : null}
        <h1 className={styles.title}>Your cart</h1>
        <p className={styles.subtitle}>Total: ${totalToPay}</p>

        <section className={styles.cardProductContain}>
          {shoppingCart.map((product) => (
            <div key={product.id_product} className={styles.main}>
              <CardProductMiniCart product={product} />
            </div>
          ))}
        </section>
        {localStorage.getItem('coupon')?<p className={styles.subtitle}>Coupon applied successfully!</p>:
        <section>
        <TextField
              label="Discount Coupon"
              variant="outlined"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={{ minWidth: "12vw" }}
              inputProps={{
                maxLength: 20,
              }}
            />
            <Button
            variant="contained"
            sx={{size: 'large', backgroundColor: '#010402' }}
            onClick={()=>setCouponDiscount(coupon)}
            >
            APPLY DISCOUNT
          </Button>
        </section>}
        <section>
          <Button
            variant="contained"
            sx={{ margin: '1rem', size: 'large', backgroundColor: '#010402' }}
            onClick={()=>validateTokenUser()}
            >
            GO TO PAY
          </Button>
        </section>
      <Toaster position="top-center" reverseOrder={false} />
      </div>
    </>
  )
}