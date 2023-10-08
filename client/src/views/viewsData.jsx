// import Home from "./Home/Home";
import Login from "./Login/Login";
import ProductDetail from "./Product Detail/ProductDetail";
import ProductList from "./Product List/ProductList";
import Admin from "./Admin/Admin";
import ProductFormView from "./Product Form/productForm";
import ProfileMain from "./Profile/Profile";

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
    path: "/profile",
    element: <ProfileMain />,
    title: "profile",
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
  {
    path: "product-creation",
    element: <ProductFormView />,
    title: "product-creation",
  },
];

export default viewsData;
