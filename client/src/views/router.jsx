import { Route, Routes } from 'react-router-dom';
import viewsData from './viewsData';

const Router = () => {

  const pageRoutes = viewsData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      {pageRoutes}
    </Routes>
  );
};

export default Router;
