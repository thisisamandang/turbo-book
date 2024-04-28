import express from "express";
import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from "../controllers/eventController";
import { isAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.get("/getEvents", isAuth, getEvents);
router.post("/addEvent", isAuth, postEvent);
router.put("/updateEvent/:id", isAuth, updateEvent);
router.delete("/deleteEvent/:id", isAuth, deleteEvent);

export default router;
