import { useEffect, useState } from 'react'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import Typography from '@mui/material/Typography'
import {
  InputAdornment,
  Button,
  CssBaseline,
  TextField,
  InputLabel,
  Paper,
  Box,
  Grid,
  Avatar,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
} from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useProductsStore } from '../../store/productsStore'
import {
  validName,
  validDescription,
  validPrice,
  validStock,
  validCategory,
} from './validations'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useNavigate } from 'react-router-dom'
import { DropAndCrop } from './Dropzone'

export default function ProductForm() {
  const navigate = useNavigate()

  const handleHomeClick = () => {
    navigate('/home')
  }

  const theme = useTheme()
  const { categories, addProduct, fetchCategories } = useProductsStore()

  const [productImageURL, setProductImageURL] = useState(null)

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
    rating: 0,
    category: '',
    image: '',
  })

  useEffect(() => {
    setFormData({
      ...formData,
      image: productImageURL,
    })
  }, [productImageURL, formData])

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    price: false,
    stock: false,
    category: false,
    image: false,
  })

  const allErrorsFalsy = (errors) => {
    return Object.values(errors).every((error) => !error)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value,
    })

    switch (name) {
      case 'name':
        setErrors({
          ...errors,
          name: !validName(value),
        })
        break
      case 'description':
        setErrors({
          ...errors,
          description: !validDescription(value),
        })
        break
      case 'price':
        setErrors({
          ...errors,
          price: !validPrice(value),
        })
        break
      case 'stock':
        setErrors({
          ...errors,
          stock: !validStock(value),
        })
        break
      case 'category':
        setErrors({
          ...errors,
          category: !validCategory(value),
        })
        break
      default:
        break
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (allErrorsFalsy(errors)) {
      try {
        await addProduct(formData)
        setFormData({
          name: '',
          description: '',
          price: 0,
          stock: 0,
          rating: 0,
          category: '',
          image: '',
        })
        toast.success('Product added successfully!')
      } catch (error) {
        return toast.error('Please check for eny errors')
      }
    } else {
      return toast.error('Please check for eny errors')
    }
  }
  const isMobile = useMediaQuery("(max-width: 840px)");

  return (
    <div>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', paddingTop: '45px' }}
      >
        <CssBaseline />
        <Grid item xs={false} />
        <Grid
          item
          xs={12}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: theme.palette.background.main,
          }}
        >
          <Box
            sx={{
              my: 5,
              mx: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex' }}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                <AddBusinessIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: 'white',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: theme.typography.h2,
                }}
              >
                Add a Product
              </Typography>
            </div>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              width= {isMobile ? '100%' : '60%'}
              sx={{
                backgroundColor: theme.palette.background_ligth.main,
                padding: 4,
                borderRadius: 6,
                marginTop: 4,
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    error={errors.name}
                    autoComplete="name"
                    name="name"
                    required
                    fullWidth
                    id={errors.name ? 'outlined-error-helper-text' : 'name'}
                    label={errors.name ? 'Error' : 'Name'}
                    value={formData.name}
                    onChange={handleChange}
                    helperText={errors.name ? 'Invalid name' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    error={errors.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    type="number"
                    id={errors.price ? 'outlined-error-helper-text' : 'price'}
                    label={errors.price ? 'Error' : 'Price'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                    name="price"
                    autoComplete="price"
                    helperText={errors.price ? 'Invalid price' : ''}
                    value={formData.price}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    name="stock"
                    label={errors.stock ? 'Error' : 'stock'}
                    id="stock"
                    autoComplete="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    error={errors.stock}
                    helperText={errors.stock ? 'Invalid stock' : ''}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <FormControl fullWidth item>
                    <InputLabel id="categoryInput">Category</InputLabel>
                    <Select
                      required
                      name="category"
                      label={errors.category ? 'Error' : 'category'}
                      id="category"
                      onChange={handleChange}
                      value={formData.category}
                      error={errors.category}
                      helperText={
                        errors.category
                          ? 'Must select at least one category'
                          : ''
                      }
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    id={
                      errors.description
                        ? 'outlined-error-helper-text'
                        : 'description'
                    }
                    label={errors.description ? 'Error' : 'Description'}
                    name="description"
                    autoComplete="family-name"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                    helperText={errors.description ? 'Invalid description' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DropAndCrop
                    endpoint={'/products/postImage'}
                    setProductImageURL={setProductImageURL}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Create product
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Toaster position="top-center" reverseOrder={false} />
        <Box
          onClick={handleHomeClick}
          style={{
            marginLeft: '1rem',
            display: 'flex',
            position: 'absolute',
            marginTop: isMobile ? '1rem': '3rem',
            cursor: 'pointer',
          }}
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            '&:hover': {
              color: 'green',
            },
          }}
        >
          <ArrowBackIosIcon sx={{width: isMobile ? '12px' : '1rem'}} />
          <Typography 
        fontSize={isMobile ? '10px' : '1rem'}
        lineHeight={isMobile ? '2.5' : '1.5'}
          component={'h3'}>Back</Typography>
        </Box>
      </Grid>
    </div>
  )
}
