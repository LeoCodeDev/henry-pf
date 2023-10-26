import { useState } from 'react';
import { TextField, Button, Grid, Container, ThemeProvider, createTheme, Typography } from '@mui/material';
import axios from 'axios';
import  toast,{ Toaster } from "react-hot-toast";

const AddCouponForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    expiration: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#228d07', 
      },
      text: {
        primary: '#fff', 
      },
      secondary: {
        main: '#228d07', 
      },
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('/dashboard/addCoupon',formData);
        toast.success("Coupon added successfully");
        setFormData({
          code: '',
          discount: '',
          expiration: ''
        });       
    } catch (error) {
        toast.error('Something went wrong');
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="sm">
        <Typography sx={{color: '#fff', fontSize: '1.8rem', padding: '0.3rem'}}>Add coupons</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              sx={{ label: { color: '#fff'}, fieldset: { borderColor: '#fff' }}}
              fullWidth
              label="Code"
              variant="outlined"
              name="code"
              value={formData.code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            sx={{ label: { color: '#fff' }, fieldset: { borderColor: '#fff' } }}
              fullWidth
              label="Discount"
              variant="outlined"
              name="discount"
              type="number"
              value={formData.discount}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
            sx={{ label: { color: '#fff' },  fieldset: { borderColor: '#fff' } }}
              fullWidth
              label="Expiration"
              variant="outlined"
              name="expiration"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.expiration}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
            variant="contained"
            sx={{ margin: '1rem', size: 'large', backgroundColor: '#228d07' }}
            type="submit">
              Add Coupon
            </Button>
          </Grid>
        </Grid>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
    </ThemeProvider>
  );
};

export default AddCouponForm;
