import { NavBar } from "../NavBar/NavBar";
import { useState, useEffect } from "react";
import { useShowProductStore } from "../../store/showProduct";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Card,
  CardContent,
} from "@mui/material/";
import { styled } from "@mui/material/styles";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useCartStore } from "../../store/shoppingCartStore";
import { useAuthStore } from "../../store/authStore";
import { favoriteStore } from "../../store/favoriteStore";
import Reviews from "../Comments/Reviews";
import CustomizedAccordions from "../Comments/CustomizedAccordions";
import { isDesktop } from "react-device-detect";
import theme from "../../../theme";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#B0B0B0" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const ProductDetails = () => {
  const [isFav, setFav] = useState(false);
  const [cart, setCart] = useState(false);
  const { product } = useShowProductStore();
  const { addProductToCart, deleteProductFromCart, shoppingCart } =
    useCartStore();
  const { user } = useAuthStore();
  const { favorites, addFavorite, deleteFavorite } = favoriteStore();
  const idProduct = product.id_product;
  const [Sales, setSales] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setCart(
      shoppingCart.find((element) => element.id_product === product.id_product)
        ? true
        : false
    ),
      setFav(
        favorites.find((element) => element.id_product === product.id_product)
          ? true
          : false
      );
  }, [shoppingCart, product, favorites]);

  const handleFav = (id) => {
    if (isFav) {
      deleteFavorite(user.username, id);
      setFav(false);
    } else {
      addFavorite(user.username, id);
      setFav(true);
    }
  };

  const handleCart = () => {
    if (cart) {
      deleteProductFromCart(product);
      setCart(false);
    } else {
      addProductToCart(product);
      setCart(true);
    }
  };

  const handleProductDetail = async () => {
    const { data } = await axios.get("/products/getProductDetailSales", {
      params: {
        product: product.id_product,
      },
    });
    setSales(data.Sales);
  };

  useEffect(() => {
    handleProductDetail();
  }, [product]);

  const hasUserPurchased = (sales) => {
    for (const sale of sales) {
      if (sale.UserIdUser === user.id_user) {
        return true;
      }
    }
    return false;
  };

  const userCanCommentAndRate = hasUserPurchased(Sales);

  return (
    <div>
      <NavBar />
      <div
        style={{
          display: "flex",
          flexDirection: isDesktop ? "row" : "column",
          marginTop: "5rem",
          justifyContent: "space-around",
        }}
      >
        <div
          title="image"
          style={{ display: "flex", flexDirection: "column", marginLeft: "2%" }}
        >
          <Box
            component={"img"}
            src={product.image}
            sx={{
              borderRadius: "2rem",
              height: "55vh",
              width: "auto",
              maxWidth: "25rem",
              padding: "1rem",
            }}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Item
              component={"img"}
              src={product.image}
              style={{
                borderRadius: "1rem",
                height: "5rem",
                width: "min-content",
                background: "transparent",
              }}
            ></Item>
            <Item
              component={"img"}
              src={product.image}
              style={{
                borderRadius: "1rem",
                height: "5rem",
                width: "min-content",
                background: "transparent",
              }}
            ></Item>
            <Item
              component={"img"}
              src={product.image}
              style={{
                borderRadius: "1rem",
                height: "5rem",
                width: "min-content",
                background: "transparent",
              }}
            ></Item>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "1rem",
              marginInline: "2rem",
              gap: "4rem",
            }}
          >
            <Typography
              style={{
                fontFamily: "Poppins",
                color: theme.palette.primary.main,
              }}
              variant="h3"
              gutterBottom
            >
              {product.name}
            </Typography>
            <Typography
              style={{ fontFamily: "Poppins" }}
              variant="h5"
              gutterBottom
            >
              <h5 style={{ margin: ".5rem" }}>Rating</h5>
              <p
                style={{ display: "flex", justifyContent: "center", margin: 0 }}
              >
                {product.rating} ⭐
              </p>
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginInline: "2rem",
            }}
          >
            <Typography
              style={{ fontFamily: "Poppins", color: "white" }}
              variant="h4"
              gutterBottom
            >
              $ {product.price}
            </Typography>
            <Container
              maxWidth="sm"
              sx={{
                backgroundColor: "lightgray",
                borderRadius: "8px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                flexDirection: "column",
                width: "85vw",
              }}
            >
              <Typography
                style={{
                  fontFamily: "Poppins",
                  color: theme.palette.primary.main,
                  marginTop: "1rem",
                }}
                variant="h5"
                gutterBottom
              >
                DESCRIPTION
              </Typography>
              <Typography
                style={{
                  fontFamily: "Poppins",
                  color: "#24262E",
                  marginTop: "-1vh",
                  marginBottom: "2vh",
                }}
                variant="p"
                gutterBottom
              >
                {product.description}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Poppins",
                  color: theme.palette.primary.main,
                }}
                variant="h5"
                gutterBottom
              >
                {product.Category?.name.toUpperCase()}
              </Typography>
              <div style={{ marginLeft: "-1vh" }}>
                <div
                  style={{
                    display: "flex",
                    fontFamily: "Poppins",
                    marginTop: "-2vh",
                    width: "min-content",
                  }}
                >
                  {product.Category?.variants?.map((size) => (
                    <Item
                      style={{ margin: ".5rem", color: "#24262E" }}
                      key={size}
                    >
                      {size}
                    </Item>
                  ))}
                </div>
              </div>
            </Container>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                padding: "1rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <Button
                style={{
                  width: "80%",
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                  background: theme.palette.primary.main,
                  color: "white",
                  filter: "brightness(90%)",
                }}
                variant="contained"
                onClick={() => handleCart()}
              >
                {cart ? (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    REMOVE FROM CART <RemoveShoppingCartOutlinedIcon />
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    ADD TO CART <AddShoppingCartIcon />
                  </div>
                )}
              </Button>
              <Button
                style={{
                  color: theme.palette.primary.main,
                  width: "70px",
                  borderRadius: "10px",
                  border: "3px solid #B0B0B0",
                }}
                variant="outlined"
                onClick={() => handleFav(product.id_product)}
              >
                {isFav ? (
                  <FavoriteOutlinedIcon
                    fontSize="large"
                    onClick={() => handleFav(product.id_product)}
                  />
                ) : (
                  <FavoriteBorderOutlinedIcon
                    fontSize="large"
                    onClick={() => handleFav()}
                  />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <hr style={{ width: "98%" }}></hr>

      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: isDesktop ? "row" : "column",
        }}
      >
        <div>
          {userCanCommentAndRate ? (
            <Reviews idProduct={idProduct} setUpdate={setUpdate}/>
          ) : (
            <Card
              style={{
                maxWidth: 600,
                margin: "2rem",
                padding: "1rem",
                marginTop:"3rem",
                fontFamily: theme.typography.fontFamily,
                color: theme.palette.secondary.main,
              }}
            >
              <CardContent>
                <Typography variant="h6" style={{ textAlign: "justify" }}>
                  You will be able to rate and review this product after making
                  a purchase.
                </Typography>
              </CardContent>
            </Card>
          )}
        </div>
        <div style={{ marginBlock: "1rem", width:"100%" }}>
          <CustomizedAccordions idProduct={idProduct} update={update} />
        </div>
      </div>
    </div>
  );
};
