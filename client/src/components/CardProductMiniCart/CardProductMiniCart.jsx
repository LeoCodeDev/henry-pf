import CloseIcon from '@mui/icons-material/Close'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import styles from './CardProductMiniCart.module.css'
import Button from '@mui/material/Button'
import { useCartStore } from '../../store/shoppingCartStore'

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
                {/*Aca leo dice que si queremos usar un icon un renderizado condicional para poner la misma logica del onClick para borrar ese producto cuando llegue a 0 la quantity*/}
                <RemoveIcon sx={{ width: '15px' }} />
              </Button>
              {/* aca si es necesario quitar el input todo bien, puedes hacerlo, tipo solo renderizar un p o un h1 */}
              <input type="text" value={product.quantity} />
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
