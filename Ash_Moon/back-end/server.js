import express from "express";
import cors from "cors";
const PORT = process.env.PORT;
import products from "./routes/products.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", products);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
