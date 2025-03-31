import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Card, CardContent } from "../components/ui/card";



const Schedule = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    API.get("/schedules")
      .then((res) => setSchedule(res.data))
      .catch((err) => console.error("Lỗi khi tải lịch tập:", err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">📅 Lịch Tập Luyện</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedule.map((item) => (
          <Card key={item._id} className="p-4 shadow-lg border rounded-lg">
            <CardContent>
              <p className="text-lg font-semibold text-blue-600">{item.date}</p>
              <p className="text-gray-700">{item.activity}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Schedule;