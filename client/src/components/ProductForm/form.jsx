import { useEffect, useState } from 'react'
import {
  InputAdornment,
  Button,
  TextField,
  InputLabel,
  Box,
  Grid,
  FormControl,
  MenuItem,
  Select,
  useMediaQuery,
  ThemeProvider
} from '@mui/material'
import toast, { Toaster } from 'react-hot-toast'
import theme from '../../../theme'
import { useProductsStore } from '../../store/productsStore'
import {
  validName,
  validDescription,
  validPrice,
  validStock,
  validCategory,
} from './validations';
import { DropAndCrop } from './Dropzone'

export default function ProductForm() {
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
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={12}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              width= {isMobile ? '80%' : '70%'}
              sx={{
                backgroundColor: theme.palette.background.paper,
                padding: 3,
                borderRadius: 6,
                marginTop: 2,
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
                    endpoint={'/postImage'}
                    setProductImageURL={setProductImageURL}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ mb: 1 }}
                  >
                    Create product
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Toaster position="top-center" reverseOrder={false} />
      </ThemeProvider>
        
      
    </div>
  )
}
