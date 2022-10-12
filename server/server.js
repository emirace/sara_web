import express from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import bookOrderRouter from "./routes/bookOrderRoutes.js";
import catalogueRouter from "./routes/catalogueRoutes.js";
import galleryRouter from "./routes/galleryRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRouter from "./routes/uploadloadRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("the error is " + err.message);
  });

const app = express();

app.use(express.json());

app.use("/api/accounts", accountRouter);
app.use("/api/bookorders", bookOrderRouter);
app.use("/api/catalogues", catalogueRouter);
app.use("/api/galleries", galleryRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/uploads", uploadRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

const port = process.env.PORT || 5000;

const httpServer = http.Server(app);
httpServer.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
