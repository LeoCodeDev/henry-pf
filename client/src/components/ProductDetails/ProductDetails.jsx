import { Descriptions } from './Descriptions'
import { NavBar } from '../NavBar/NavBar'
import { useShowProductStore } from '../../store/showProduct'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

export const ProductDetails = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const { product } = useShowProductStore((state) => state)
  console.log(product)

  return (
    <main>
      <NavBar />
      <section style={{ width: '100vw' }}>
        <article
          style={{
            display: 'grid',
            gridTemplateColumns: matches ? '1fr' : 'repeat(4, 1fr)',
            gridTemplateRows: matches ? 'auto' : 'repeat(6, 1fr)',
            gridColumnGap: '13px',
            gridRowGap: '14px',
            position: 'relative'
          }}>
          <div style={{ gridArea: '1 / 1 / 6 / 3' }}>
            <CardMedia
              sx={{ minWidth: '367px', maxWidth: '655px', maxHeight: '738px' }}
              component={'img'}
              image={product.image}
              alt={product.name}
            />
          </div>
          <div
            style={{
              gridArea: '1 / 3 / 2 / 4',
              fontSize: '75px'
            }}>
            <Typography variant={'h3'} style={{ fontFamily: 'Poppins' }}>
              {product.name}
            </Typography>
          </div>
          <div style={{ gridArea: '3 / 3 / 6 / 5' }}>
            <Descriptions product={product} />
          </div>
          <div style={{ gridArea: '1 / 4 / 2 / 5' }}>
            <Typography variant={'h5'}>Rating: {product.rating}</Typography>
          </div>
        </article>
      </section>
    </main>
  )
}
