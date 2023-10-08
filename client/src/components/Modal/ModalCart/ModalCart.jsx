import styles from '../ModalCart/ModelCart.module.css'
import { CardProductMiniCart } from "../../CardProductMiniCart/CardProductMiniCart"
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { isMobile } from 'react-device-detect';
import { useCartStore } from "../../../store/shoppingCartStore";

export const ModalCart = ({toggleDrawer}) => {

  const {shoppingCart, totalToPay} = useCartStore()
  return (
    <>
      <div className={styles.container}>
      {isMobile ? <Button variant='contained' sx={{margin: '1rem'}} onClick={toggleDrawer}>
      <ArrowBackIcon sx={{width: '15px'}} />
      back
      </Button> : null}
      <h1 className={styles.title}>Your cart</h1>
        <p className={styles.subtitle}>Total: ${totalToPay}</p>
      
      <section className={styles.cardProductContain}>
        {shoppingCart.map((product) => (
          <div key={product.id_product} className={styles.main}>
            <CardProductMiniCart  product={product} />
          </div>
        ))}
      </section>
      <section>
        <Button
        variant='contained'
        sx={{margin: '1rem', size: 'large', backgroundColor: '#010402'}}
        >GO TO PAY</Button>
      </section>
    </div>
    </>
  )
}

