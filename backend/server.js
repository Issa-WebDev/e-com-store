import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import router from "./routes/product.route.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // Allows us to accept JSON data in the req.body

app.use("/api/products", router);

app.listen(PORT, () => {
  //  console.clear()
  connectDB();
  console.log("Server started at http://localhost:5000");
});

