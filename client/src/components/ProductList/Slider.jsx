import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Item from './Item'

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
})

const Slider = ({ arrImage, interval = 4000 }) => {

  const sliderConstructor = (arrImage) =>
    arrImage.map((image, i) => ({
      id: i,
      image: image,
    }))

  const slide = sliderConstructor(arrImage)

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: {
            xs: '300px',
            sm: '300px',
            md: '550px',
            lg: '800px',
            xl: '800px',
          },
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Carousel indicators={false} interval={interval}>
          {slide.map((item) => (
            <Item key={item.id} item={item} />
          ))}
        </Carousel>
      </Box>
    </ThemeProvider>
  )
}

export default Slider
