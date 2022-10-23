import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    slug: { type: String, require: true },
    image: { type: String, require: true },
    images: [{ type: String }],
    category: { type: String, require: true },
    material: { type: String, require: true },
    price: { type: Number, require: true },
    priceNigeria: { type: Number },
    discount: { type: Number, require: true, default: 0 },
    deliveryTime: { type: Number },
    currency: { type: String, require: true },
    isNigeria: { type: Boolean, require: true },
    countInStock: { type: String, require: true },
    description: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
