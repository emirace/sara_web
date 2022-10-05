import express from "express";
import dotenv from "dotenv";
import path from "path";
import http from "http";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

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

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

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
