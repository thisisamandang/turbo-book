import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./utils/database";
import "./models/event";
import "./models/user";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import s3Routes from "./routes/s3Routes";
import bodyParser from "body-parser";
import SocketService from "./services/socket";
dotenv.config();
declare global {
  namespace Express {
    interface Request {
      socketService: SocketService;
    }
  }
}
const app = express();
app.use(cors());
app.use(bodyParser.json());
const socketService = new SocketService();
app.use((req, res, next) => {
  req.socketService = socketService;
  next();
});
app.use("/", userRoutes);
app.use("/", eventRoutes);
app.use("/s3", s3Routes);

const PORT = process.env.PORT || 8080;

sequelize
  .sync()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
    socketService.io.attach(server);
    socketService.initListeners();
  })
  .catch((err: any) => {
    console.log("Error connecting to database", err);
    process.exit(1);
  });
