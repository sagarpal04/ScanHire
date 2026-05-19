// routes/aiRoutes.js
import express from "express";
import { generateAI } from "../controllers/aiController.js";

const router = express.Router();

router.post("/ai", generateAI);

export default router;
