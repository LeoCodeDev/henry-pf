import Slider from '../../components/ProductList/Slider'
import Top from '../../components/ProductList/Top'
import Bottom from '../../components/ProductList/Bottom'
import Products from '../../components/ProductList/Products'
import { NavBar } from '../../components/NavBar/NavBar'
import { useAuthStore } from '../../store/authStore'
import SignUp from '../../components/LandingPage/SignUp'
import { useEffect, useRef } from 'react'
import slide1 from '../../assets/images/slide1.webp'
import slide2 from '../../assets/images/slide2.webp'
import slide3 from '../../assets/images/slide3.webp'

const ProductList = () => {
  const { showRegisterModal, setShowRegister } = useAuthStore()

  const useRefer = useRef()

  useEffect(() => {
    const closeMenuOnOutsideClick = (e) => {
      if (useRefer.current && !useRefer.current.contains(e.target)) {
        setShowRegister()
      }
    }
    document.addEventListener('mousedown', closeMenuOnOutsideClick)
    return () => {
      document.removeEventListener('mousedown', closeMenuOnOutsideClick)
    }
  }, [])

  const slide = [slide1, slide2, slide3]

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <>
        <NavBar />
        <section style={{ marginTop: '2rem', width: '100%' }}>
          <Slider arrImage={slide} />
        </section>
        <section>
          <Top />
        </section>
        <section>
          <Bottom />
        </section>
        <section
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '90%',
            margin: '0 auto',
          }}
        >
          <Products />
        </section>
      </>
      {showRegisterModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            zIndex: '999',
            margin: 'auto',
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(0,0,0,0.8)',
          }}
        >
          <div ref={useRefer} style={{ width: '60%' }}>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductList
