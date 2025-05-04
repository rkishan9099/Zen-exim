const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controller");
const { validateProduct } = require("../middleware/validation");

// Add a new product
router.post("/", validateProduct, productController.createProduct);
router.get("/", productController.getAllProducts);

// Update a product
router.put("/:id", productController.updateProduct);

// Get product by ID
router.get("/:id", productController.getProductById);
// Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
