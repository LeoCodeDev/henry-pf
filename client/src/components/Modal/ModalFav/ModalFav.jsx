import { isMobile } from "react-device-detect";
import { CardProductFav } from "../../CardProductFav/CardProductFav";
import styles from "./ModalFav.module.css";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const ModalFav = ({ favorites, toggleDrawer }) => {
  return (
    <>
      <div className={styles.container}>
        {isMobile ? (
          <Button
            variant="contained"
            sx={{ margin: "1rem" }}
            onClick={toggleDrawer}
          >
            <ArrowBackIcon sx={{ width: "15px" }} />
            back
          </Button>
        ) : null}
        <h1 className={styles.title}>Your favorites</h1>

        <section className={styles.cardProductContain}>
          {favorites.map((product) => (
            <div key={product.id_product} className={styles.main}>
              <CardProductFav product={product} />
            </div>
          ))}
        </section>
      </div>
    </>
  );
};
