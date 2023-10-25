import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './CardProductMiniCart.module.css'
import Button from '@mui/material/Button'
import { useCartStore } from '../../store/shoppingCartStore'
import theme from '../../../theme'

export const CardProductMiniCart = ({ product }) => {
  const { name, image, description, price } = product
  const { deleteProductFromCart, oneMore, oneLess } = useCartStore()
  return (
    <>
      <section className={styles.container}>
        <div className={styles.imageContainer}>
          <div className={styles.closeButtonContainer}>
            <button onClick={() => deleteProductFromCart(product)}>
              <CloseIcon sx={{ width: '15px', cursor: 'pointer' }} />
            </button>
          </div>
          <img src={image} alt={name} />
        </div>

        <div className={styles.infoContainer}>
          <h2 className={styles.title}>{name}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.priceContainer}>
          <h1 className={styles.title}>${price}</h1>
        </div>

        <div className={styles.stockContain}>
          <div className={styles.unitsContainer}>
            <section className={styles.sectionButtons}>
              <Button
                onClick={() => {
                  product.quantity > 1 ? oneLess(product) : null
                }}
                sx={{
                  minWidth: '20px',
                  height: '1.2rem',
                  padding: '0',
                  borderRadius: '0.3rem'
                }}
                variant="contained">
                <RemoveIcon sx={{ width: '15px' }} />
              </Button>
              <p
                style={{
                  backgroundColor: '#000000de',
                  padding: '0 .4rem',
                  color: '#c9c9c9',
                  fontFamily: theme.typography.fontFamily,
                  borderRadius: '4px'
                }}>
                {product.quantity}
              </p>
              <Button
                onClick={() => oneMore(product)}
                sx={{
                  minWidth: '20px',
                  height: '1.2rem',
                  padding: '0',
                  borderRadius: '0.3rem'
                }}
                variant="contained">
                <AddIcon sx={{ width: '15px' }} />
              </Button>
            </section>
          </div>
        </div>
      </section>
    </>
  )
}
