import { useState } from 'react';
import { TextField, Button, Grid, Container } from '@mui/material';
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
    <Container maxWidth="sm">
        <h1>Add coupons</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
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
            <Button variant="contained" color="primary" type="submit">
              Add Coupon
            </Button>
          </Grid>
        </Grid>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Container>
  );
};

export default AddCouponForm;
