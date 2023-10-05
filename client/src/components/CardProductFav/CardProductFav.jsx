import styles from './CardProductFav.module.css';
import { useState } from 'react';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

export const CardProductFav = ({product}) => {
    const { name, image, description, price } = product
    const [isFav, setFav] = useState(false);

  const handleFav = () => {
    setFav(!isFav);
    // Falta terminar de hacer los Handlers de fav y cart!
    // if (isFav) {
    //   setFav(false);
    //   removeFav(id)
    // } else {
    //   setFav(true);
    //   addFav
    // }
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
              <FavoriteBorderOutlinedIcon
                fontSize="large"
                onClick={handleFav}
                sx={{cursor: 'pointer'}}
              />
            ) : (
              <FavoriteOutlinedIcon fontSize="large" onClick={handleFav} sx={{cursor: 'pointer'}} />
            )}
      </section>
      </div>
        
      </div>
      </section>
    </>
  )
}

