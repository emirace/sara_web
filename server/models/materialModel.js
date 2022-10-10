import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    images: [{ type: String }],
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);
export default Material;
