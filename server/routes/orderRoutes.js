import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth, slugify } from "../utils.js";
const orderRouter = express.Router();

// get all order
orderRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find();
    res.send({
      success: true,
      message: "Sucessfully",
      orders,
    });
  })
);

// get a order

orderRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send({
        success: true,
        message: "Sucessfully",
        order,
      });
    } else {
      res.send({
        success: false,
        message: "Order not Found",
      });
    }
  })
);

// upload a order

orderRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const order = new Order({
      cartItems: req.body.cartItems,
      totalPrice: Number(req.body.totalPrice),
      deliveryAddress: req.body.deliveryAddress,
      buyer: req.body.buyer,
      proof: req.body.proof,
    });

    const newOrder = await order.save();
    res.send({
      success: true,
      message: "Order Created Sucessfully",
      order: newOrder,
    });
  })
);

// update a order

orderRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.cartItems = req.body.cartItems || order.cartItems;
      order.deliveryAddress = req.body.deliveryAddress || order.deliveryAddress;
      order.buyer = req.body.buyer || order.buyer;
      order.totalPrice = req.body.totalPrice || order.totalPrice;
      order.proof = req.body.proof || order.proof;

      const newOrder = await order.save();

      res.send({
        success: true,
        message: "Order Updated Sucessfully",
        order: newOrder,
      });
    } else {
      res.send({
        success: false,
        message: "Order not Found",
      });
    }
  })
);

orderRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({
        success: true,
        message: "Order deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "Order not Found",
      });
    }
  })
);

export default orderRouter;
