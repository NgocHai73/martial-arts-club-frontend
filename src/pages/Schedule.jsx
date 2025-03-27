import React, { useEffect, useState } from "react";
import API from "../services/api";

const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    API.get("/schedules")
      .then((res) => setSchedule(res.data))
      .catch((err) => console.error("Lỗi khi tải lịch tập:", err));
  }, []);

  return (
    <div>
      <h2>Lịch Tập Luyện</h2>
      <ul>
        {schedule.map((item) => (
          <li key={item._id}>
            <strong>{item.date}</strong> - {item.activity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
