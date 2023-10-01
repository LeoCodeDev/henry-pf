import { Route, Routes } from 'react-router-dom';
import viewsData from './viewsData';
import { useAuthStore } from "../store/authStore";
import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Error404 from '../components/Error404/Error404'
import Signup from '../components/LandingPage/SignUp'

const Router = () => {
  const { isLogged } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged && window.location.pathname !== "/signup") {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const pageRoutes = viewsData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return (
    <Routes>
      {pageRoutes}
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Error404 />} />
    </Routes>
  );
};

export default Router;
