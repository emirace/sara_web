import express from "express";
import expressAsyncHandler from "express-async-handler";
const locationRouter = express.Router();

// get all location
locationRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    console.log(req.headers["cloudfront-viewer-country"]);
    const data = req.headers["cloudfront-viewer-country"] || "TEXT";
    res.send(data);
  })
);

export default locationRouter;
