import express from "express";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import DBConnection from "./Database_config/Db.connect.js";
import trendRoutes from "./routes/Trends.Routes.js";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use("/api", trendRoutes);
app.listen(process.env.PORT, async () => {
  console.log("Our App is working on " + process.env.PORT);
  await DBConnection();
});
