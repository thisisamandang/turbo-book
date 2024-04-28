"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import { io } from "socket.io-client";

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

export default function Page(): JSX.Element {
  const [booking, setBooking] = useState<{ events: any[] }>({ events: [] });

  useEffect(() => {
    fetchEvents();
    const _socket = io("http://localhost:8000");
    _socket.on("events", (data) => {
      if (data.action === "create") {
        console.log("New event added");
        addSocketEvent(data.event);
      } else if (data.action === "update") {
        updatedSocketEvent(data.event);
      } else if (data.action === "delete") {
        fetchEvents();
      }
    });
    return () => {
      _socket.off("posts");
      _socket.disconnect();
    };
  }, []);
  const addSocketEvent = (data: any) => {
    setBooking((prevState) => {
      const updatedPosts = [...prevState.events];
      updatedPosts.unshift(data);

      return {
        events: updatedPosts,
      };
    });
  };
  const updatedSocketEvent = (data: any) => {
    setBooking((prevState) => {
      const updatedPosts = [...prevState.events];
      const updatedPostIndex = updatedPosts.findIndex((p) => p.id === data.id);
      if (updatedPostIndex > -1) {
        updatedPosts[updatedPostIndex] = data;
      }
      return {
        events: updatedPosts,
      };
    });
  };

  const fetchEvents = () => {
    axios
      .get("http://localhost:8000/getEvents")
      .then((res) => {
        setBooking(res.data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  };

  const createEvent = () => {
    const newEvent = {
      title: "New Event",
      description: "Description of the new event",
      availableSlots: 10,
      thumbnail: "https://via.placeholder.com/150",
    };

    axios
      .post("http://localhost:8000/addEvent", newEvent)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error adding event:", error);
      });
  };

  const updateEvent = (eventId: string) => {
    const updatedEvent = {
      title: "Updated Title",
      description: "Updated Description",
      availableSlots: 5,
    };

    axios
      .put(`http://localhost:8000/updateEvent/${eventId}`, updatedEvent)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error updating event:", error);
      });
  };

  const deleteEvent = (eventId: string) => {
    setBooking((prevBooking) => ({
      events: prevBooking.events.filter((event) => event.id !== eventId),
    }));

    axios
      .delete(`http://localhost:8000/deleteEvent/${eventId}`)
      .then(() => {
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Gradient className={styles.backgroundGradient} conic />
      </div>
      <button onClick={createEvent}>Add Event</button>
      <ul>
        {booking.events.map((event, index) => (
          <li key={index}>
            <div>
              <p>ID: {event.id}</p>
              <p>Title: {event.title}</p>
              <p>Description: {event.description}</p>
              <p>Available Slots: {event.availableSlots}</p>
              <p>Thumbnail: {event.thumbnail}</p>
              <button onClick={() => updateEvent(event.id)}>Update</button>
              <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
