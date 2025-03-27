import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/EventDetail.css";

const eventData = {
  1: { title: "Giải đấu võ thuật mùa xuân", date: "10/04/2025", location: "Nhà thi đấu A", content: "Chi tiết về giải đấu, thể thức thi đấu và danh sách vận động viên." },
  2: { title: "Giao lưu võ thuật", date: "20/04/2025", location: "Công viên C", content: "Sự kiện giao lưu võ thuật với nhiều khách mời nổi tiếng." }
};

const EventDetail = () => {
  const { id } = useParams();
  const event = eventData[id];

  if (!event) {
    return <h2>Sự kiện không tồn tại</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="event-detail-container">
        <h2>{event.title}</h2>
        <p><strong>Ngày:</strong> {event.date}</p>
        <p><strong>Địa điểm:</strong> {event.location}</p>
        <p>{event.content}</p>
        <button className="register-btn">Đăng ký tham gia</button>
      </div>
    </div>
  );
};

export default EventDetail;
