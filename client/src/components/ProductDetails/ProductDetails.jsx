import { NavBar } from '../NavBar/NavBar'
import { useShowProductStore } from '../../store/showProduct'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import styles from '../Error404/Error404.module.css'
import { useNavigate } from 'react-router-dom'


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#B0B0B0' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}))

export const ProductDetails = () => {
  const navigate = useNavigate()
  const { product } = useShowProductStore()
  console.log(product)

  const handleHomeClick = () => {
    navigate('/home')
  }

  return (
    <div>
      <NavBar />
      <main
        style={{
          marginTop: '64px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(6, 1fr)',
          gridGap: '10px'
        }}>
        <div
          style={{
            gridArea: '1 / 1 / 6 / 3',
            display: 'flex',
            justifyContent: 'center'
          }}>
          <CssBaseline />
          <Container
            maxWidth="sm"
            style={{
              padding: 0,
              margin: 0,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Box
              component={'img'}
              src={product.image}
              sx={{ bgcolor: '#cfe8fc', width: '400px' }}
            />
          </Container>
        </div>
        <div
          style={{
            gridArea: '1 / 3 / 3 / 4',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Typography
            style={{ fontFamily: 'Poppins' }}
            variant="h2"
            gutterBottom>
            {product.name}
          </Typography>
        </div>
        <div
          style={{
            gridArea: '3 / 3 / 4 / 4',
            display: 'flex',
            justifyContent: 'start'
          }}>
          <Typography
            style={{ fontFamily: 'Poppins' }}
            variant="h5"
            gutterBottom>
            $ {product.price}
          </Typography>
        </div>
        <div
          style={{
            gridArea: '1 / 4 / 3 / 5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Typography
            style={{ fontFamily: 'Poppins' }}
            variant="h5"
            gutterBottom>
            <h5 style={{ margin: '.5rem' }}>Rating</h5>
            <p style={{ display: 'flex', justifyContent: 'center', margin: 0 }}>
              {product.rating}
            </p>
          </Typography>
        </div>
        <div
          style={{
            gridArea: '4 / 3 / 6 / 5',
            background: '#D9D9D9',
            marginRight: '2rem',
            borderRadius: '5px'
          }}>
          <CssBaseline />
          <Container maxWidth="sm">
            <Typography
              style={{ fontFamily: 'Poppins', color: '#1E1E1E' }}
              variant="h5"
              gutterBottom>
              Description
            </Typography>
            <Typography
              style={{ fontFamily: 'Poppins', color: '#1E1E1E' }}
              variant="p"
              gutterBottom>
              {product.description}
            </Typography>
            <Typography
              style={{ fontFamily: 'Poppins', color: '#1E1E1E' }}
              variant="h5"
              gutterBottom>
              {product.Category?.name}
            </Typography>
            <div>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 1, sm: 2, md: 4 }}>
                {product.Category?.variants?.map((size) => (
                  <Item
                    style={{ margin: '.5rem', color: '#24262E' }}
                    key={size}>
                    {size}
                  </Item>
                ))}
              </Stack>
            </div>
          </Container>
        </div>
        <div
          style={{
            gridArea: '6 / 3 / 7 / 5',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Stack spacing={2} direction="row">
            <Button
              style={{
                width: '300px',
                height: '50px',
                fontFamily: 'Poppins',
                fontSize: '1.5rem',
                background: '#B0B0B0',
                color: '#24262E'
              }}
              variant="contained">
              ADD TO CART
            </Button>
            <Button
              style={{
                width: '70px',
                borderRadius: '10px',
                border: '3px solid #B0B0B0'
              }}
              variant="outlined">
              <FavoriteOutlinedIcon
                style={{ color: '#539A07', fontSize: '30px' }}
              />
            </Button>
          </Stack>
        </div>
        <div
          style={{
            gridArea: '6 / 1 / 7 / 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 3 }}>
            <Item
              component={'img'}
              src={product.image}
              style={{ height: '5rem', background: 'transparent' }}></Item>
            <Item
              component={'img'}
              src={product.image}
              style={{ height: '5rem', background: 'transparent' }}></Item>
            <Item
              component={'img'}
              src={product.image}
              style={{ height: '5rem', background: 'transparent' }}></Item>
          </Stack>
        </div>
        <div
          className={styles.mybutton}
          onClick={handleHomeClick}
          style={{
            gridArea: '1 / 1 / 2 / 2',
            display: 'flex',
            position: 'absolute'
          }}>
          <Box
            onClick={handleHomeClick}
            style={{
              marginLeft: '1rem',
              display: 'flex',
              position: 'absolute',
              cursor: 'pointer'
            }}
            sx={{
              backgroundColor: 'transparent',
              color: 'white',
              '&:hover': {
                color: 'green'
              }
            }}>
            <ArrowBackIosIcon />
            <Typography component={'h3'}>Back</Typography>
          </Box>
        </div>
      </main>
    </div>
  )
}
