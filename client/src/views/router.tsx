import { Route, Routes } from 'react-router-dom'
import { type routerType } from '../types/router.types'
import viewsData from './viewsData'

const Router: React.FC = () => {
  const pageRoutes = viewsData.map(({ path, title, element }: routerType) => {
    return <Route key={title} path={`/${path}`} element={element} />
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router
