import { isMobile } from "react-device-detect";
import { CardProductFav } from "../../CardProductFav/CardProductFav";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styles from "./ModalFav.module.css";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const ModalFav = ({ products, toggleDrawer }) => {
  return (
    <>
      <div className={styles.container}>
        {isMobile ? (
          <Button
            variant="contained"
            sx={{ margin: "1rem" }}
            onClick={toggleDrawer}
          >
            back
          <ArrowForwardIcon sx={{ width: '15px' }} />  
          </Button>
        ) : null}
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
  );
};
