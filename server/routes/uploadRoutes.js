import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  res.json({
    url: "https://via.placeholder.com/300",
  });
});

export default router; // ✅ MUST EXIST