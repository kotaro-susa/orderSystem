import mongoose, { models } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    orderDate: { type: Date, default: Date.now },
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = models.Order || mongoose.model(`Order`, orderSchema);
export default Order;
