import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#B0B0B0' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: '#24262E'
}))

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export const Descriptions = ({product}) => {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 686, maxHeight: 414, minHeight: 400 }}>
      <CardContent>
        <Typography
          style={{ fontFamily: 'Poppins' }}
          variant="h5"
          component="div">
          Description
        </Typography>
        <Typography
          style={{ fontFamily: 'Poppins' }}
          sx={{ mb: 1.5 }}
          color="#B0B0B0">
          {product.description}
        </Typography>
        <Typography
          style={{ fontFamily: 'Poppins' }}
          variant="h6"
          component="div">
          Sizes
        </Typography>

        <Box sx={{ m: 1 }}>
          <Stack direction="row" spacing={1}>
            {sizes.map((size) => (
              <Item key={size}>{size}</Item>
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  )
}