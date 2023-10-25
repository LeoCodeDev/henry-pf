import { styled, alpha } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import { useSearch } from './SearchBar.logic'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const SearchBar = ({ hide }) => {
  
  const { name, setName, inputRef, searchBarRef, handleSearch } = useSearch(hide)

  const handleChange = (event) => {
    const value = event.target.value;
    setName(value)
    handleSearch(value)
  }

  return (
    <Box ref={searchBarRef} sx={{ flexGrow: 1 }}>
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
            inputRef={inputRef}
          />
        </Search>
      </Toolbar>
    </Box>
  )
}