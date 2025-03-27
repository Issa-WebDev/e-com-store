import mongoose from "mongoose";
import Products from "../models/product.model.js";

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("Error in fectching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const createProduct = async (req, res) => {
  const product = req.body; // User will send that data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, massage: "Please provide all fields" });
  }
  const newProducts = new Products(product);

  try {
    await newProducts.save();
    res.status(201).json({ success: true, data: newProducts });
  } catch (error) {
    console.log("Error in create product:", error.message);
    // Internal Server Error 500
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product id" });
  }

  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, product, {
      new: true,
    });
    // await updatedProduct.save();
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.log("Error in updating product: ", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await Products.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Products deleted" });
  } catch (error) {
    console.log("Error in deleting product: ", error.message);
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
};

export {getProducts, createProduct, updateProduct, deleteProduct};