import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import style from "./CardProduct.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const CardProduct = ({ product }) => {
  const data = product;

  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 300,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
      },
    },
  });

  const [isFav, setFav] = useState(false);
  const [cart, setCart] = useState(false);

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

  const handleCart = () => {
    setCart(!cart);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          bgcolor: "transparent",
          width: {xs:"20rem", sm: "16.4rem", md: "17rem", lg:"17rem", xl: "15rem" },
          margin: {xs:"0", sm:"1rem" , md: "4rem", lg:"0.5rem", xl: "1rem"},
          marginTop: {xs: '2rem'}
        }}
      >
        <CardMedia
          sx={{
            height: 300,
          }}
          image={data.image}
          title={data.name}
        />
        <CardContent className={style.card_txt}>
          <Typography gutterBottom variant="p" component="div" sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>
            {data.name}
          </Typography>
          <Typography variant="p" component="div">
            $ {data.price}
          </Typography>
          <div className={style.icons}>
            {isFav ? (
              <FavoriteOutlinedIcon fontSize="large" onClick={handleFav} />
            ) : (
              <FavoriteBorderOutlinedIcon
                fontSize="large"
                onClick={handleFav}
              />
            )}
            <div className={style.cart}>
              {cart ? (
                <ShoppingCartIcon fontSize="large" onClick={handleCart} />
              ) : (
                <ShoppingCartOutlinedIcon
                  fontSize="large"
                  onClick={handleCart}
                />
              )}
              <div className={style.plus}>
                {cart ? (
                  <RemoveCircleIcon fontSize="small" onClick={handleCart} />
                ) : (
                  <AddCircleIcon fontSize="small" onClick={handleCart} />
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
