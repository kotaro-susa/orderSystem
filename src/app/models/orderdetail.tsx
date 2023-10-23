import mongoose, { models } from "mongoose";

const orderDetailSchema = new mongoose.Schema(
  {
    quantity: { type: Number, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

const OrderDetail =
  models.OrderDetail || mongoose.model(`OrderDetail`, orderDetailSchema);
export default OrderDetail;
