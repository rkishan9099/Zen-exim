const ProductMasterModel = require("../model/product_master");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductMasterModel.find().sort({ _id: -1 });
    res.json({
      status: "success",
      data: products,
      message: "Products retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await ProductMasterModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: newProduct,
      message: "Product created successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductMasterModel.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({
      status: "success",
      data: product,
      message: "Product retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductMasterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({
      status: "success",
      data: product,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductMasterModel.findByIdAndDelete(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }

    res.json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
