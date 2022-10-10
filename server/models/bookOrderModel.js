import mongoose from "mongoose";

const bookOrderSchema = new mongoose.Schema(
  {
    galleryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gallery",
    },
    catalogueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Catalogue",
    },
    style: { type: String },
    styleType: { type: String, require: true },
    fabricChioce: { type: String, require: true },
    userCountry: { type: String, require: true },
    deliveryAddress: {
      country: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      phone: { type: String, require: true },
    },
    unit: { type: String, require: true },
    buyer: {
      lastName: { type: String, require: true },
      email: { type: String, require: true },
      firstName: { type: String, require: true },
      lastName: { type: String, require: true },
    },
    gender: { type: String, require: true },
    measurement: { type: String, require: true },
    proof: { type: String, require: true },
  },
  {
    timestamps: true,
  }
);

const BookOrder = mongoose.model("BookOrder", bookOrderSchema);
export default BookOrder;
