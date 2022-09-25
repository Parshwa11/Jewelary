const express = require("express");
const router  = express.Router();
const {getAllProducts,createProduct,getProductDetails,filterPrice} = require("../Controllers/productController")

router.route("/products").get(getAllProducts)
router.route("/products/new").post(createProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/products/filter/:id").post(filterPrice)




module.exports = router