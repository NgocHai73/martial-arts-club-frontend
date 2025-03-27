import React, { useEffect, useState } from "react";
import API from "../services/api";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Lỗi khi tải sự kiện:", err));
  }, []);

  return (
    <div>
      <h2>Sự Kiện</h2>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.name}</h3>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;
