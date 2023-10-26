import { Box, Container, ThemeProvider, Typography } from '@mui/material';
import theme from '../../../theme';

const Checkout = ({ shoppingCart, totalToPay, actualCurrency }) => {
  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" style={{ textAlign: "center" }}>
      <Box style={{ padding: "20px", marginTop: "10vh 0 0 0", color: '#c9c9c9' }}>
      <Typography variant='h3'>Your Cart</Typography>
      <Typography variant='body1'>Total: {actualCurrency} {totalToPay}</Typography>
      <Box>
      
        {shoppingCart.map((product) => (
          <Box key={product.id} sx={{ display: "flex", justifyContent: "space-between", border: '1px solid green', margin: '10px 0', padding: '10px'}}>
            <section>
                <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px" }} />
            </section>
            
            
            <Typography variant='body2'>{product.name}</Typography>
            <Typography variant='body2'>{product.quantity} x {actualCurrency} {product.price}</Typography>
          </Box>
        ))}
        
      </Box>
      </Box>
    </Container>
    </ThemeProvider>
  )
}

export { Checkout }
