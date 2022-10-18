import express from "express";
import expressAsyncHandler from "express-async-handler";
import BookOrder from "../models/bookOrderModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const bookOrderRouter = express.Router();

// get all bookOrder
bookOrderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bookOrders = await BookOrder.find().sort({ createdAt: -1 });
    res.send({
      success: true,
      message: "Sucessfully",
      bookOrders,
    });
  })
);

// get a bookOrder

bookOrderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const bookOrder = await BookOrder.findById(req.params.id);
    if (bookOrder) {
      res.send({
        success: true,
        message: "Sucessfully",
        bookOrder,
      });
    } else {
      res.send({
        success: false,
        message: "BookOrder not Found",
      });
    }
  })
);

// upload a bookOrder

bookOrderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const bookOrder = new BookOrder({
      galleryId: req.body.galleryId,
      catalogueId: req.body.catalogueId,
      style: req.body.style,
      styleType: req.body.styleType,
      fabricChioce: req.body.fabricChioce,
      deliveryAddress: req.body.deliveryAddress,
      unit: req.body.unit,
      buyer: req.body.buyer,
      gender: req.body.gender,
      measurement: req.body.measurement,
      proof: req.body.proof,
    });

    const newBookOrder = await bookOrder.save();
    res.send({
      success: true,
      message: "BookOrder Created Sucessfully",
      bookOrder: newBookOrder,
    });
  })
);

// update a bookOrder

bookOrderRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bookOrder = await BookOrder.findById(req.params.id);
    if (bookOrder) {
      bookOrder.galleryId = req.body.galleryId || bookOrder.galleryId;
      bookOrder.catalogueId = req.body.catalogueId || bookOrder.catalogueId;
      bookOrder.style = req.body.style || bookOrder.style;
      bookOrder.styleType = req.body.styleType || bookOrder.styleType;
      bookOrder.fabricChioce = req.body.fabricChioce || bookOrder.fabricChioce;
      bookOrder.deliveryAddress =
        req.body.deliveryAddress || bookOrder.deliveryAddress;
      bookOrder.unit = req.body.unit || bookOrder.unit;
      bookOrder.buyer = req.body.buyer || bookOrder.buyer;
      bookOrder.gender = req.body.gender || bookOrder.gender;
      bookOrder.measurement = req.body.measurement || bookOrder.measurement;
      bookOrder.proof = req.body.proof || bookOrder.proof;

      const newBookOrder = await bookOrder.save();

      res.send({
        success: true,
        message: "BookOrder Updated Sucessfully",
        bookOrder: newBookOrder,
      });
    } else {
      res.send({
        success: false,
        message: "BookOrder not Found",
      });
    }
  })
);

bookOrderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const bookOrder = await BookOrder.findById(req.params.id);
    if (bookOrder) {
      await bookOrder.remove();
      res.send({
        success: true,
        message: "BookOrder deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "BookOrder not Found",
      });
    }
  })
);

export default bookOrderRouter;
