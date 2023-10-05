import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styles from './CardProductMiniCart.module.css';
import Button from '@mui/material/Button';

export const CardProductMiniCart = ({product}) => {
    const { name, image, description, price } = product
  return (
    <>
      <section className={styles.container}>
    
      

      <div className={styles.imageContainer}>
      <div className={styles.closeButtonContainer}>
      <button>
        <CloseIcon sx={{width: '15px', cursor: 'pointer'}}/>
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
        sx={{minWidth: '20px', padding: '0', borderRadius: '0.3rem'}}
        variant='contained'
        >
            <RemoveIcon />
         </Button>
         <input type='text'/>
        <Button
        sx={{minWidth: '20px', padding: '0', borderRadius: '0.3rem'}}
        variant='contained'
        >
            <AddIcon />
        </Button>
      </section>
      </div>
        
      </div>
      </section>
    </>
  )
}

