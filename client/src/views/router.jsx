import { Route, Routes } from 'react-router-dom';
import viewsData from './viewsData';
import { AdminRoutes } from '../components/AdminView/adminRoutes/AdminRoutes'
import { AdminView } from '../components/AdminView/AdminView';

const Router = () => {

  const pageRoutes = viewsData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  //routes for admin
  const pageAdminRoutes = AdminRoutes.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={<AdminView>{element}</AdminView>} />;
  });

  return (
    <Routes>
      {pageRoutes}
      {pageAdminRoutes}
    </Routes>
  );
};

export default Router;
