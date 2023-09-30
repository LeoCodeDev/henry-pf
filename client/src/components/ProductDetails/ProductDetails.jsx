import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { NavBar } from '../NavBar/NavBar'


export const ProductDetails = () => {
  return (
    <div>
      <NavBar />
      <div>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ bgcolor: '#transparent', height: '100vh' }} />
      </Container>
    </React.Fragment>
      </div>
    </div>
  )
}
