import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { ModalCart } from "./ModalCart/ModalCart";
import { ModalFav } from "./ModalFav/ModalFav";


/* Productos harcodeados: aca logica de capturacion de datos de ambos estados globales productsFav=[] y productsShoppingCart=[] */
const products = [
  {
    id_product: 48,
    name: "Blue shirt",
    image:
      "http://res.cloudinary.com/healtech/image/upload/v1696385451/healtech/products/nmpe6frrovu0hl9ilah8.jpg",
    description: "Cotton blue shirt",
    price: "10.00",
    stock: 100,
    rating: 0,
    active: true,
    CategoryIdCategory: 1,
    Category: {
      id_category: 1,
      name: "clothes",
      variants: ["XS", "S", "M", "L", "XL"],
    },
  },
  {
    id_product: 11,
    name: "sweat pants",
    image:
      "https://apparel.goldsgym.com/media/image/ef/0e/46/VorschauXqHgHJZcGoTz4.jpg",
    description: "comfortable and durable",
    price: "100.00",
    stock: 10,
    rating: 2,
    active: true,
    CategoryIdCategory: 1,
    Category: {
      id_category: 1,
      name: "clothes",
      variants: ["XS", "S", "M", "L", "XL"],
    },
  },
  {
    id_product: 8,
    name: "sweater",
    image:
      "https://www.gymxapparel.in/cdn/shop/products/halfsleevh2-700x700.jpg?v=1619768808",
    description: "warm blue sweater",
    price: "50.00",
    stock: 5,
    rating: 4.6,
    active: true,
    CategoryIdCategory: 1,
    Category: {
      id_category: 1,
      name: "clothes",
      variants: ["XS", "S", "M", "L", "XL"],
    },
  },
  
  {
    "id_product": 23,
    "name": "Pre Workout",
    "image": "https://m.media-amazon.com/images/I/61CvtPYg2BS._AC_UF894,1000_QL80_.jpg",
    "description": "Give your best in your trainings",
    "price": "50.00",
    "stock": 100,
    "rating": 0,
    "active": true,
    "CategoryIdCategory": 2,
    "Category": {
      "id_category": 2,
      "name": "supplement",
      "variants": [
        "250gr",
        "500gr",
        "1kg",
        "2kg",
        "3kg",
        "5kg"
      ]
    }
  },
  {
    "id_product": 42,
    "name": "Yoga strap",
    "image": "http://res.cloudinary.com/healtech/image/upload/v1696382611/healtech/products/wwh371sqgwhynyefalhh.jpg",
    "description": "Yoga straps for stretching",
    "price": "25.00",
    "stock": 100,
    "rating": 0,
    "active": true,
    "CategoryIdCategory": 3,
    "Category": {
      "id_category": 3,
      "name": "equipment",
      "variants": [
        "static",
        "portable"
      ]
    }
  },
];

export const Modal = ({ modalOpen, setModalOpen }) => {
  let { anchor, open } = modalOpen;

  const [state, setState] = React.useState({
    left: false,
    right: false,
  });

  React.useEffect(() => {
    if (anchor.length) {
      setState({ ...state, [anchor]: open });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
    setModalOpen({ anchor: "", open: false });
  };

  return (
    <div>
      {["left", "right"].map((anchor) => (
        <section key={anchor}>
          <Drawer
            sx={{ width: "30%" }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {anchor === "right" ? (
              <ModalCart products={products} toggleDrawer={toggleDrawer(anchor, false)}/> 
            ) : (
              <ModalFav products={products} toggleDrawer={toggleDrawer(anchor, false)}/>
            )}
          </Drawer>
        </section>
      ))}
    </div>
  );
};
