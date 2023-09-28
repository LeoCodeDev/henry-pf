import { type routerType } from '../types/router.types'
import Home from './Home/Home'
import Login from './Login/Login'
import ProductDetail from './Product Detail/ProductDetail'
import ProductList from './Product List/ProductList'

const viewsData: routerType[] = [
  {
    path: 'home',
    element: <Home />,
    title: 'home'
  },
  {
    path: '',
    element: <Login />,
    title: 'login'
  },
  {
    path: 'product-detail',
    element: <ProductDetail />,
    title: 'product-detail'
  },
  {
    path: 'product-list',
    element: <ProductList />,
    title: 'product-list'
  }
]

export default viewsData
