import express from "express";
import cors from "cors";

import postRoutes from "./routes/postRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Server working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});