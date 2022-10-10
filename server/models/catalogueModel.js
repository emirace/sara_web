import mongoose from "mongoose";

const catalogueSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    images: [{ type: String, require: true }],
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Catalogue = mongoose.model("Catalogue", catalogueSchema);
export default Catalogue;
