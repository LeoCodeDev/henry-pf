import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import { ModalCart } from './ModalCart/ModalCart'
import { ModalFav } from './ModalFav/ModalFav'
import { favoriteStore } from '../../store/favoriteStore'
import { useCartStore } from '../../store/shoppingCartStore'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../theme'

export const Modal = ({ modalOpen, setModalOpen }) => {
  const { favorites } = favoriteStore()
  const productsCart = useCartStore((state) => state.products)

  let { anchor, open } = modalOpen

  const [state, setState] = React.useState({
    left: false,
    right: false,
  })

  React.useEffect(() => {
    if (anchor.length) {
      setState({ ...state, [anchor]: open })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor])

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
    setModalOpen({ anchor: '', open: false })
  }

  return (
    <div>
    
    <ThemeProvider theme={theme}>
      {['left', 'right'].map((anchor) => (
        <section key={anchor}>
          <Drawer 
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}>
            {anchor === 'right' ? (
              <ModalCart
                products={productsCart}
                toggleDrawer={toggleDrawer(anchor, false)}
              />
            ) : (
              <ModalFav
                products={favorites}
                toggleDrawer={toggleDrawer(anchor, false)}
              />
            )}
          </Drawer>
        </section>
      ))}
    </ThemeProvider>
      
    </div>
  )
}
