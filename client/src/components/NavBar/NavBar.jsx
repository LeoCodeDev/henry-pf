import * as React from 'react'
import { SearchBar } from '../SearchBar/SearchBar'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import SearchIcon from '@mui/icons-material/Search'
import MenuItem from '@mui/material/MenuItem'
import { useAuthStore } from '../../store/authStore'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'

const pages = ['HOME', 'SHOP', 'EXERCISE']
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

export const NavBar = () => { 
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const {user} = useAuthStore()
  console.log(user);

  const [ifSearch, setIfSearch] = React.useState(false)
  const handleSearch = () => {
    setIfSearch(!ifSearch)
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl" style={{padding:0}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none'
            }}>
            HealTech
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}>
              <MenuItem
                component="a"
                href="/home"
                key={'HOME'}
                onClick={handleCloseNavMenu}>
                <Typography>{'HOME'}</Typography>
              </MenuItem>
              <MenuItem
                component="a"
                href="/home"
                key={'SHOP'}
                onClick={handleCloseNavMenu}>
                <Typography>{'SHOP'}</Typography>
              </MenuItem>
              <MenuItem
                component="a"
                href="/home"
                key={'EXERCISE'}
                onClick={handleCloseNavMenu}>
                <Typography>{'EXERCISE'}</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            position={'absolute'}
            left={'3rem'}
            variant="h5"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              fontFamily: 'monospace',
              fontWeight: 500,
              color: 'inherit',
              textDecoration: 'none'
            }}>
            HealTech
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'center',
              gap: '3rem',
              display: { xs: 'none', md: 'flex' }
            }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  fontWeight: 700,
                  color: 'white',
                  display: 'block'
                }}>
                {page}
              </Button>
            ))}
          </Box>

          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit">
            <SearchIcon onClick={handleSearch} />
          </IconButton>
          {ifSearch && (
            <div style={{ position: 'absolute', top: '100%', left: '13%' }}><SearchBar/>
            </div>
          )}

          {/* Icono de favoritos */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit">
            {/* Abajo de esta línea poner el estado de favoritos */}
            <Badge badgeContent={17} color="error">
              <FavoriteBorderOutlinedIcon />
            </Badge>
          </IconButton>

          {/* Icono de carrito */}
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit">
            {/* Abajo de esta línea poner el estado (.length) de carrito */}
            <Badge badgeContent={17} color="error">
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          <Box
            sx={{ flexGrow: 0, paddingRight: '.8rem', paddingLeft: '.7rem' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.username} src={user.avatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}