import Home from "./Home/Home";
import Login from "./Login/Login";
import ProductDetail from "./Product Detail/ProductDetail";
import ProductList from "./Product List/ProductList";
import Admin from "./Admin/Admin";
import SignUp from "../components/LandingPage/SignUp";

const viewsData = [
  // {
  //   path: "home",
  //   element: <Home />,
  //   title: "home",
  // },
  {
    path: "",
    element: <Login />,
    title: "login",
  },
  {
    path: "/signup",
    element: <SignUp />,
    title: "signup",
  },
  {
    path: "product-detail",
    element: <ProductDetail />,
    title: "product-detail",
  },
  {
    // path: "product-list",
    path: "/home",
    element: <ProductList />,
    title: "product-list",
  },
  {
    path: "admin",
    element: <Admin />,
    title: "admin-view",
  },
];

export default viewsData;
