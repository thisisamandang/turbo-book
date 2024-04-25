import { Request, Response } from "express";
import Events from "../models/event";

export const postEvent = async (req: Request, res: Response) => {
  const { title, description, availableSlots, thumbnail } = req.body;
  Events.create({
    title: title,
    description: description,
    availableSlots: availableSlots,
    thumbnail: thumbnail,
  })
    .then((result: any) => {
      res.json({ message: "Event added", event: result });
    })
    .catch((err: any) =>
      res.status(500).json({ error: "Internal server error" })
    );
};

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await Events.findAll();
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
  try {
    const event = await Events.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.update(eventData);

    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  try {
    const event = await Events.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await event.destroy();
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
