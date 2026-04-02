import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log("POST HIT:", req.body);

  res.json({
    success: true,
    data: req.body,
  });
});

router.get("/", (req, res) => {
  res.json([]);
});

export default router;