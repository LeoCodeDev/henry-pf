import Home from "./Home/Home";
import Login from "./Login/Login";
import ProductDetail from "./Product Detail/ProductDetail";
import ProductList from "./Product List/ProductList";
import Admin from "./Admin/Admin";
// import ProductFormView from "./Product Form/productForm";
// import ProductUpdate from "./Product Update/ProductUpdate";
import OrderPlaced from "./OrderPlaced/OrderPlaced";
import Stripe from "../components/Stripe/Stripe";
// import Reviews from "../components/Comments/Reviews"
import RoutineList from "../components/RoutinesList/RoutinesList";
import {DetailRoutine} from "../components/DetailRoutine/DetailRoutine";
import Calendar from "../components/Calendar/Calendar";
import ProfilePage from "./Profile/ProfileInfo";
const viewsData = [
 {
    path: "home",
    element: <Home />,
    title: "home",
   },
  {
    path: "",
    element: <Login />,
    title: "login",
  },
  {
    path: "product-detail",
    element: <ProductDetail />,
    title: "product-detail",
  },
  {
    // path: "product-list",
    path: "shop",
    element: <ProductList />,
    title: "product-list",
  },
  {
    path: "admin",
    element: <Admin />,
    title: "admin-view",
  },
  // {
  //   path: "product-creation",
  //   element: <ProductFormView />,
  //   title: "product-creation",
  // },
  // {
  //   path: "update",
  //   element: <ProductUpdate />,
  //   title: "product-update",
  // },
  {
    path: "order-placed",
    element: <OrderPlaced />,
    title: "order-placed",
  },
  // {
  //   path: "reviews",
  //   element: <Reviews />,
  //   title: "reviews",
  // },
  {
    path: "payment",
    element: <Stripe />,
    title: "payment",
  },
  {
    path: "routines",
    element: <RoutineList />,
    title: "routines",
  },
  {
    path: "routines/detail/:id_routine",
    element: <DetailRoutine />,
    title: "routineDetail",
  },
  {
    path: "profile/calendar",
    element: <Calendar />,
    title: "calendar",
  },
  {
    path: "profile",
    element: <ProfilePage />,
    title: "profile",
  }
];

export default viewsData;
