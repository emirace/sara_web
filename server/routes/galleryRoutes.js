import express from "express";
import expressAsyncHandler from "express-async-handler";
import Gallery from "../models/galleryModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const galleryRouter = express.Router();

const pageSize = 10;
// get all gallery
galleryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const page = req.query.page || 1;
    const galleries = await Gallery.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    res.send({
      success: true,
      message: "Sucessfully",
      galleries,
    });
  })
);

// get a gallery

galleryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      res.send({
        success: true,
        message: "Sucessfully",
        gallery,
      });
    } else {
      res.send({
        success: false,
        message: "Gallery not Found",
      });
    }
  })
);

// upload a gallery

galleryRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const gallery = new Gallery({
      name: req.body.name,
      image: req.body.image,
      images: req.body.images,
      description: req.body.description,
    });

    const newCatalogue = await gallery.save();
    res.send({
      success: true,
      message: "Gallery Created Sucessfully",
      gallery: newCatalogue,
    });
  })
);

// update a gallery

galleryRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      gallery.name = req.body.name || gallery.name;
      gallery.image = req.body.image || gallery.image;
      gallery.images = req.body.images || gallery.images;
      gallery.description = req.body.description || gallery.description;

      const newCatalogue = await gallery.save();

      res.send({
        success: true,
        message: "Gallery Updated Sucessfully",
        gallery: newCatalogue,
      });
    } else {
      res.send({
        success: false,
        message: "Gallery not Found",
      });
    }
  })
);

galleryRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      await gallery.remove();
      res.send({
        success: true,
        message: "Gallery deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "Gallery not Found",
      });
    }
  })
);

export default galleryRouter;
