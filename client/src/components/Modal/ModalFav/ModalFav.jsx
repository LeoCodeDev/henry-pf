import { isMobile } from 'react-device-detect'
import { CardProductFav } from '../../CardProductFav/CardProductFav'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import styles from './ModalFav.module.css'

export const ModalFav = ({ products, toggleDrawer }) => {
  
    return (
      <>
        <div className={styles.container}>
          {isMobile ? <button onClick={toggleDrawer}>back</button> : null}
          <h1 className={styles.title}>Your favorites</h1>

          <section className={styles.cardProductContain}>
            {products.length < 1 ? (
              <Stack className={styles.main} direction="row">
                <Button variant="outlined">Add Favorites</Button>
              </Stack>
            ) : (
              products.map((product) => (
                <div key={product.id_product} className={styles.main}>
                  <CardProductFav product={product} />
                </div>
              ))
            )}
          </section>
        </div>
      </>
    )
}


