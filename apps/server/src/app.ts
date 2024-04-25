import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./utils/database";
import "./models/event";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use("/", userRoutes);
app.use("/", eventRoutes);

const PORT = process.env.PORT || 8000;

sequelize
  .sync()
  .then((result: any) => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err: any) => {
    console.log(err);
  });
