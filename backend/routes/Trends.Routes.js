// routes/trendRoutes.js
import express from "express";
import { runScraper } from "../controllers/Trends.controller.js";

const router = express.Router();
router.get("/run-scraper", runScraper);
export default router;
