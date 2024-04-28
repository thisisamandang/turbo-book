import { Request, Response } from "express";
import Events from "../models/event";
import SocketService from "../services/socket";
const limit = 5;

export const postEvent = async (req: Request, res: Response) => {
  const { title, description, availableSlots, thumbnail } = req.body;
  const socketService = req.socketService;
  Events.create({
    title: title,
    description: description,
    availableSlots: availableSlots,
    thumbnail: thumbnail,
  })
    .then((result: any) => {
      res.json({ message: "Event added", event: result });
      socketService.emit("events", { action: "create", event: result });
    })
    .catch((err: any) =>
      res.status(500).json({ error: "Internal server error" })
    );
};

export const getEvents = async (req: Request, res: Response) => {
  let page = req.query.page || 1;
  page = parseInt(page.toString());
  const offset = (page - 1) * limit;
  try {
    const events = await Events.findAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });
    if (events.length === 0) {
      return res.status(404).json({ error: "No events were found" });
    }
    res.json({ events: events });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const eventData = req.body;
  const socketService = req.socketService;
  try {
    const event = await Events.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.update(eventData);

    res.json({ message: "Event updated successfully", event });
    socketService.emit("events", { action: "update", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  const socketService = req.socketService;
  try {
    const event = await Events.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.destroy();
    res.json({ message: "Event deleted successfully" });
    socketService.emit("events", { action: "delete" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
