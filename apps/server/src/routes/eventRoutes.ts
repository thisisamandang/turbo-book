import express from "express";
import {
  deleteEvent,
  getEvents,
  postEvent,
  updateEvent,
} from "../controllers/eventController";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.get("/getEvents", getEvents);
router.post("/addEvent", postEvent);
router.put("/updateEvent/:id", updateEvent);
router.delete("/deleteEvent/:id", deleteEvent);

export default router;
