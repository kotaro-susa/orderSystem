import mongoose, { models } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model(`Product`, productSchema);
export default Product;
