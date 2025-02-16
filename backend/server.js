import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors"; // Import CORS
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
app.use(express.json()); // allows us to accept JSON data in the req.body

// Enable CORS for all origins
app.use(cors({ origin: "*" }));

const PORT = process.env.PORT || 5000;
const __dirname = path.dirname(path.resolve());

// routes
app.use("/api/products", productRoutes);
app.get("/hello", (req, res) => res.send("Hello World"));
app.get("/", (req, res) => res.send("Hello World"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
