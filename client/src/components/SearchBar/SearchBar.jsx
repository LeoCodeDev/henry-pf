import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { useProductsStore } from '../../store/productsStore'
import { useState } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}))

export const SearchBar = () => {
  const setProductsByName = useProductsStore((state) => state.setProductsByName)
  const fetchProducts = useProductsStore((state) => state.fetchProducts)

  const [name, setName] = useState('')

  const handleSearch = async (name) => {
    try {
      if (name === '') {
        await fetchProducts()
      } else {
        await setProductsByName(name)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (event) => {
    setName(event.target.value)
    handleSearch(event.target.value)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Search
          style={{
            right: '100%',
            backgroundBlendMode: 'multiply',
            backgroundColor: '#0008',
            border: 'solid 1px #fff',
            transform: 'translateX(50%)',
            top: '50%',
            zIndex: '1',
            width: '100%'
          }}
          sx={{ ml: 1, width: '100%' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={name}
            onChange={handleChange}
          />
        </Search>
      </Toolbar>
    </Box>
  )
}
