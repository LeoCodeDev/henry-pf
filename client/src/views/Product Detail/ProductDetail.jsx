import { ProductDetails } from "../../components/ProductDetails/ProductDetails";
import { ThemeProvider, createTheme } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})

const ProductDetail = () => {
  return (
      
    <div>
      <ThemeProvider theme={darkTheme}>
        <ProductDetails />
        </ThemeProvider>
      </div>
    );
  };
  
  export default ProductDetail;