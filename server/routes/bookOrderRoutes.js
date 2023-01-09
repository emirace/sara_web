import express from "express";
import expressAsyncHandler from "express-async-handler";
import BookOrder from "../models/bookOrderModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const bookOrderRouter = express.Router();

const pageSize = 10;

// get all bookOrder
bookOrderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const page = req.query.page || 1;

    const bookOrders = await BookOrder.find()
      .sort({ createdAt: -1 })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
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
      // proof: req.body.proof,
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
      bookOrder.status = req.body.status;

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
