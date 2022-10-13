import express from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      const isMatched = await user.compareToken(password);
      if (isMatched) {
        res.send({
          token: generateToken(user),
          email: user.email,
          username: user.username,
          isAdmin: user.isAdmin,
          success: true,
          message: "Login successful",
        });
      } else {
        res.send({
          success: false,
          message: "Invalid Email or Password",
        });
      }
    } else {
      res.send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  })
);

userRouter.post(
  "/signup",
  body("email").isEmail().normalizeEmail(),
  body("password").isLength({
    min: 6,
  }),
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password, username } = req.body;

    const newUser = new User({
      username,
      email,
      password,
    });

    const user = await newUser.save();

    res.send({
      username: user.username,
      email: user.email,
      token: generateToken(user),
      success: true,
      message: "Account Create successful",
    });
  })
);

userRouter.get(
  "/account",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ isAdmin: true });
    if (user) {
      res.send({
        account: {
          accountName: user.accountName,
          bankName: user.bankName,
          accountNumber: user.accountNumber,
        },
        success: true,
        message: "Success",
      });
    } else {
      res.send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  })
);
userRouter.put(
  "/updateaccount",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ isAdmin: true });
    if (user) {
      user.accountName = req.body.accountName;
      user.accountNumber = req.body.accountNumber;
      user.bankName = req.body.bankName;

      const newUser = await user.save();
      res.send({
        account: {
          accountName: newUser.accountName,
          bankName: newUser.bankName,
          accountNumber: newUser.accountNumber,
        },
        success: true,
        message: "Success",
      });
    } else {
      res.send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
  })
);

export default userRouter;
