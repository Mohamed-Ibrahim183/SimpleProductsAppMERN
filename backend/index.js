import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; // Import CORS
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import Product from "../models/product.model.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins
app.use(cors());
app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});

const __dirname = path.dirname(path.resolve());

// routes
app.use("/api/products", productRoutes);
app.get("/hello", (req, res) => res.send("Hello World"));
app.get("/", (req, res) => res.send("Hello World"));
// import mongoose from "mongoose";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
app.get("/products", getProducts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
