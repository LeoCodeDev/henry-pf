import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import theme from '../../../theme';

const Checkout = ({ shoppingCart, totalToPay, actualCurrency }) => {
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" style={{ textAlign: "center", padding: '0px'  }}>
      <Box style={{ padding: "20px", marginTop: "10vh", color: '#c9c9c9', backgroundColor: '#1E1E1E' }}>
      <Typography variant='h3'>Your Cart</Typography>
      
      <Box>
      
        {shoppingCart.map((product) => (
          <Box key={product.id} sx={{ display: "flex",width:'20rem', justifyContent: "space-between", margin: '10px 0', padding: '10px'}}>
            <section>
                <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px" }} />
            </section>
            
            <section>
             <Typography variant='body2'>{product.name}</Typography>
            </section>

            
            <section>
             <Typography variant='body2'>{product.quantity} x {product.price} {actualCurrency} </Typography> 
            </section>
            
          </Box>
        ))}
        <Typography variant='body1' sx={{borderTop: '0.5px solid #c9c9c9', paddingTop: '1rem', textAlign: 'start'}}>Total: {totalToPay} {actualCurrency} </Typography>
      </Box>
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export { Checkout }
