import express from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/userModel.js";
import { generateToken } from "../utils.js";

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

export default userRouter;
