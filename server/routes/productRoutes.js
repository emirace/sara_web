import express from "express";
import expressAsyncHandler from "express-async-handler";
const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    res.send("hello");
  })
);
export default productRouter;
