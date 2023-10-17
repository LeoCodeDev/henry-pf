import { Route, Routes } from 'react-router-dom';
import viewsData from './viewsData';
import { AdminRoutes } from '../components/AdminView/adminRoutes/AdminRoutes'
import { AdminView } from '../components/AdminView/AdminView';
import { AuthGuard } from '../Guards/Auth-guard';

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
      <Route element={<AuthGuard/>}>
      {pageAdminRoutes}
      </Route>
    </Routes>
  );
};

export default Router;
