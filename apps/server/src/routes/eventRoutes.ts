import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.send("API Running"));
router.get("/getEvents");
router.post("/addEvent");
router.put("/updateEvent");
router.delete("/deleteEvent");

export default router;
