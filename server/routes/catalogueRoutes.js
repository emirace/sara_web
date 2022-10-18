import express from "express";
import expressAsyncHandler from "express-async-handler";
import Catalogue from "../models/catalogueModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const catalogueRouter = express.Router();

// get all catalogue
catalogueRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const catalogues = await Catalogue.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Sucessfully",
      catalogues,
    });
  })
);

// get a catalogue

catalogueRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const catalogue = await Catalogue.findById(req.params.id);
    if (catalogue) {
      res.send({
        success: true,
        message: "Sucessfully",
        catalogue,
      });
    } else {
      res.send({
        success: false,
        message: "Catalogue not Found",
      });
    }
  })
);

// upload a catalogue

catalogueRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const catalogue = new Catalogue({
      name: req.body.name,
      image: req.body.image,
      images: req.body.images,
      description: req.body.description,
    });

    const newCatalogue = await catalogue.save();
    res.send({
      success: true,
      message: "Catalogue Created Sucessfully",
      catalogue: newCatalogue,
    });
  })
);

// update a catalogue

catalogueRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const catalogue = await Catalogue.findById(req.params.id);
    if (catalogue) {
      catalogue.name = req.body.name || catalogue.name;
      catalogue.image = req.body.image || catalogue.image;
      catalogue.images = req.body.images || catalogue.images;
      catalogue.description = req.body.description || catalogue.description;

      const newCatalogue = await catalogue.save();

      res.send({
        success: true,
        message: "Catalogue Updated Sucessfully",
        catalogue: newCatalogue,
      });
    } else {
      res.send({
        success: false,
        message: "Catalogue not Found",
      });
    }
  })
);

catalogueRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const catalogue = await Catalogue.findById(req.params.id);
    if (catalogue) {
      await catalogue.remove();
      res.send({
        success: true,
        message: "Catalogue deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "Catalogue not Found",
      });
    }
  })
);

export default catalogueRouter;
