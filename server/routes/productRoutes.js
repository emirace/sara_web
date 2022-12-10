import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import { body, validationResult } from "express-validator";
import { isAdmin, isAuth, slugify } from "../utils.js";
const productRouter = express.Router();

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const searchQuery = query.query || "";
    const category = query.category || "";
    const price = query.price || "";
    const order = query.order || "";
    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            $or: [
              {
                name: {
                  $regex: searchQuery,
                  $options: "i",
                },
              },
              {
                category: {
                  $regex: searchQuery,
                  $options: "i",
                },
              },
              {
                material: {
                  $regex: searchQuery,
                  $options: "i",
                },
              },
            ],
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    price && price !== "all"
      ? {
          price: {
            $gte: Number(price.split("-")[0]),
            $lte: Number(price.split("-")[1]),
          },
        }
      : {};

    const sortOrder =
      order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "newest"
        ? { creatAt: -1 }
        : order === "discount"
        ? { updatedAt: -1 }
        : { _id: -1 };
    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    }).sort(sortOrder);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
    });
    res.send({
      success: true,
      message: "Sucessfully",
      products,
      countProducts,
    });
  })
);

// get all product
productRouter.get(
  "/all/:location",
  expressAsyncHandler(async (req, res) => {
    const { location } = req.params;
    const locationFilter =
      location === "NG"
        ? {
            isNigeria: true,
          }
        : {};
    const products = await Product.find({ ...locationFilter }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Sucessfully",
      products,
    });
  })
);

// get a product

productRouter.get(
  "/product/:slug",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product) {
      res.send({
        success: true,
        message: "Sucessfully",
        product,
      });
    } else {
      res.send({
        success: false,
        message: "Product not Found",
      });
    }
  })
);

//get slider product
productRouter.get(
  "/slider/:location",
  expressAsyncHandler(async (req, res) => {
    const { location } = req.params;
    const locationFilter =
      location === "NG"
        ? {
            isNigeria: true,
          }
        : {};
    const products = await Product.find({
      slider: true,
      ...locationFilter,
    }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Sucessfully",
      products,
    });
  })
);

// get all product category
productRouter.get(
  "/:category/:location",
  expressAsyncHandler(async (req, res) => {
    const { category, location } = req.params;
    console.log(category);
    const locationFilter =
      location === "NG"
        ? {
            isNigeria: true,
          }
        : {};
    const products = await Product.find({
      category: {
        $elemMatch: {
          value: {
            $in: [category],
          },
        },
      },
      ...locationFilter,
    }).sort({
      createdAt: -1,
    });
    res.send({
      success: true,
      message: "Sucessfully",
      products,
    });
  })
);

// upload a product

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  body("name").custom((value) => {
    return Product.findOne({ name: value }).then((product) => {
      if (product) {
        console.log(product);
        return Promise.reject("Name already in use");
      }
    });
  }),
  body("name").isLength({
    min: 3,
  }),
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const product = new Product({
      name: req.body.name,
      slug: slugify(req.body.name),
      image: req.body.image,
      images: req.body.images,
      category: req.body.category,
      size: req.body.size,
      material: req.body.material,
      priceNigeria: req.body.priceNigeria,
      price: req.body.price,
      discount: req.body.discount,
      deliveryTime: req.body.deliveryTime,
      currency: req.body.currency,
      isNigeria: req.body.isNigeria,
      countInStock: req.body.countInStock,
      description: req.body.description,
      detail: req.body.detail,
      slider: req.body.slider,
    });

    const newProduct = await product.save();
    res.send({
      success: true,
      message: "Product Created Sucessfully",
      product: newProduct,
    });
  })
);

// update a product

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = req.body.name || product.name;
      product.slug = slugify(req.body.name) || product.slug;
      product.image = req.body.image || product.image;
      product.images = req.body.images || product.images;
      product.category = req.body.category || product.category;
      product.size = req.body.size || product.size;
      product.material = req.body.material || product.material;
      product.price = req.body.price || product.price;
      product.priceNigeria = req.body.priceNigeria || product.priceNigeria;
      product.discount = req.body.discount || product.discount;
      product.deliveryTime = req.body.deliveryTime || product.deliveryTime;
      product.currency = req.body.currency || product.currency;
      product.isNigeria = req.body.isNigeria;
      product.countInStock = req.body.countInStock || product.countInStock;
      product.description = req.body.description || product.description;
      product.detail = req.body.detail || product.detail;
      product.slider = req.body.slider;

      const newProduct = await product.save();

      res.send({
        success: true,
        message: "Product Updated Sucessfully",
        product: newProduct,
      });
    } else {
      res.send({
        success: false,
        message: "Product not Found",
      });
    }
  })
);

//search product

productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({
        success: true,
        message: "Product deleted Sucessfully",
      });
    } else {
      res.send({
        success: false,
        message: "Product not Found",
      });
    }
  })
);

export default productRouter;
