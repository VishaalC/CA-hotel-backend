import express from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./config/db.config.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware.js";
import adminRouter from "./routes/admin.router.js";
import cors from "cors";
import hotelRouter from "./routes/hotel.router.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

await connectToMongoDB(process.env.MONGO_CONNECTION_URL);

app.use("/admin", adminRouter);
app.use("/", hotelRouter);
app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Application is running");
});
