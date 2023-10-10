import styles from './CardProductFav.module.css';
import { useState, useEffect } from 'react';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import { useAuthStore } from '../../store/authStore';
import { favoriteStore } from '../../store/favoriteStore';

export const CardProductFav = ({ product }) => {
  const { addFavorite, deleteFavorite } = favoriteStore()
  const { id_product, name, image, description, price } = product
  const [isFav, setFav] = useState(false);
  const initialState = useAuthStore((state)=> state.user)
  const productFav = Array(product)
  
  useEffect(() => {
    setFav(
      productFav.find((element) => element.id_product === id_product)
        ? true
        : false
    )
  }, [productFav, id_product])

  const handleFav = (id) => {
    if (isFav) {
      deleteFavorite(initialState.username, id)
    } else {
      addFavorite(initialState.username, id)
    }
  };
  return (
    <>
      <section className={styles.container}>
        <div className={styles.imageContainer}>
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
              {isFav ? (
                <HeartBrokenIcon
                  fontSize="large"
                  onClick={() => handleFav(id_product)}
                  sx={{ cursor: 'pointer' }}
                />
              ) : null}
            </section>
          </div>
        </div>
      </section>
    </>
  )
}

