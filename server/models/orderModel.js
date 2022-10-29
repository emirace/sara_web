import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        type: Object,
        require: true,
      },
    ],
    deliveryAddress: {
      country: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      phone: { type: String, require: true },
    },
    buyer: {
      lastName: { type: String, require: true },
      email: { type: String, require: true },
      firstName: { type: String, require: true },
      phone: { type: String, require: true },
    },
    totalPrice: { type: Number, require: true },
    proof: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
