import { Modal } from "../../components/Modal/Modal";
import { useState } from "react";
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
    }
  },
    {
      "id_product": 11,
      "name": "sweat pants",
      "image": "https://apparel.goldsgym.com/media/image/ef/0e/46/VorschauXqHgHJZcGoTz4.jpg",
      "description": "comfortable and durable",
      "price": "100.00",
      "stock": 10,
      "rating": 2,
      "active": true,
      "CategoryIdCategory": 1,
      "Category": {
        "id_category": 1,
        "name": "clothes",
        "variants": [
          "XS",
          "S",
          "M",
          "L",
          "XL"
        ]
      }
    },
    {
      "id_product": 8,
      "name": "sweater",
      "image": "https://www.gymxapparel.in/cdn/shop/products/halfsleevh2-700x700.jpg?v=1619768808",
      "description": "warm blue sweater",
      "price": "50.00",
      "stock": 5,
      "rating": 4.6,
      "active": true,
      "CategoryIdCategory": 1,
      "Category": {
        "id_category": 1,
        "name": "clothes",
        "variants": [
          "XS",
          "S",
          "M",
          "L",
          "XL"
        ]
      }
    },
    
   
];
const Admin = () => {
  const [modalOpen, setModalOpen] = useState({ anchor: "", open: false });

  return (
    <div>
      <h1>Admin</h1>
      <button onClick={() => setModalOpen({ anchor: "left", open: true })}>
        Open Modal
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}  /*aca van los productos en un array, sea los fav o los shoppingCart*/products={products}/>
    </div>
  );
};

export default Admin;
