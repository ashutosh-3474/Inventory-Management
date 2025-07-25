const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ product_id: product._id });
  } catch {
    res.status(400).json({ message: "Failed to add product" });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const updated = await Product.findByIdAndUpdate(req.params.id, { quantity }, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json(updated);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};
