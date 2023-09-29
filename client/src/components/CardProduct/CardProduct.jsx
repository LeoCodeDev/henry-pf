import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import style from './CardProduct.module.css'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { useState } from 'react'

export const CardProduct = ({ product }) => {
  const [data] = product

  const [isFav, setFav] = useState(false)
  const [cart, setCart] = useState(false)

  const handleFav = () => {
    setFav(!isFav)
    // Falta terminar de hacer los Handlers de fav y cart!
    // if (isFav) {
    //   setFav(false);
    //   removeFav(id)
    // } else {
    //   setFav(true);
    //   addFav
    // }
  }

  const handleCart = () => {
    setCart(!cart)
  }

  return (
    <Card sx={{ maxWidth: 266, bgcolor: 'transparent' }}>
      <CardMedia
        sx={{
          height: 274
        }}
        image={data.image}
        title={data.name_product}
      />
      <CardContent className={style.card_txt}>
        <Typography gutterBottom variant="p" component="div">
          {data.product_name}
        </Typography>
        <Typography gutterBottom variant="p" component="div">
          {data.avg}
        </Typography>
        <Typography variant="p" component="div">
          $ {data.price}
        </Typography>
        <div className={style.icons}>
          {isFav ? (
            <FavoriteOutlinedIcon fontSize="large" onClick={handleFav} />
          ) : (
            <FavoriteBorderOutlinedIcon fontSize="large" onClick={handleFav} />
          )}
          <div className={style.cart}>
            {cart ? (
              <ShoppingCartIcon fontSize="large" onClick={handleCart} />
            ) : (
              <ShoppingCartOutlinedIcon fontSize="large" onClick={handleCart} />
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
  )
}
