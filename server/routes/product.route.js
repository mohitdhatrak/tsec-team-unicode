const express = require("express");
const router = new express.Router();
const {
    newProduct,
    updateProd,
    deleteProd,
    myProducts,
    products,
    searchedProduct,
    particularProduct,
} = require("../controllers/product");
const authenticate = require("../middlewares/auth.middleware");
router.post("/newProduct", authenticate, newProduct);
router.patch("/:id", authenticate, updateProd);
router.delete("/:id", authenticate, deleteProd);
router.get("/myProducts", authenticate, myProducts);
router.get("/", authenticate, products);
router.post("/search", authenticate, searchedProduct);
router.get("/:id", authenticate, particularProduct);
module.exports = router;
