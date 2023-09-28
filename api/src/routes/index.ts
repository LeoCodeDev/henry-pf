const {Router } = require ("express");
const  getProducts  = require("../controllers/getProducts");
const  getCategories  = require("../controllers/getCategories");

const router = Router();

//ruta para obtener los productons con sus categorias asociadas
router.get("/products", getProducts);

router.get("/categories",getCategories );


module.exports = router;