import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
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

const Gallery = mongoose.model("Gallery", gallerySchema);
export default Gallery;
