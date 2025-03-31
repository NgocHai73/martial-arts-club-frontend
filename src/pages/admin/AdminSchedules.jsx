import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminSchedules.css";

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [newSchedule, setNewSchedule] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/schedules")
      .then((res) => {
        console.log("📌 API response:", res.data);
        setSchedules(res.data);
      })
      .catch((err) => console.error("🔥 Lỗi khi tải lịch tập:", err.response?.data || err));
  }, []);

  const handleEditClick = (schedule) => {
    setNewSchedule(schedule);
    setSelectedScheduleId(schedule._id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", newSchedule.title);
    formData.append("date", newSchedule.date);
    formData.append("time", newSchedule.time);
    formData.append("location", newSchedule.location);
    formData.append("description", newSchedule.description);

    try {
      const res = editMode
        ? await API.put(`/schedules/${selectedScheduleId}`, formData)
        : await API.post("/schedules", formData);

      setSchedules(editMode ? schedules.map((s) => (s._id === selectedScheduleId ? res.data : s)) : [...schedules, res.data]);
      setEditMode(false);
      setShowForm(false);
      setNewSchedule({ title: "", date: "", time: "", location: "", description: "" });
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err);
      setError(err.response?.data?.message || "Lỗi không xác định!");
    }
  };

  const handleDeleteSchedule = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa lịch tập này không?")) return;

    try {
      await API.delete(`/schedules/${id}`);
      setSchedules(schedules.filter((s) => s._id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Không thể xóa lịch tập!");
    }
  };

  return (
    <div className="admin-page">
      <h2>📅 Quản Lý Lịch Tập</h2>
      <button
        className="add-btn"
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false);
          setNewSchedule({ title: "", date: "", time: "", location: "", description: "" });
        }}
      >
        +
      </button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Tiêu đề"
            value={newSchedule.title}
            onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })}
            required
          />
          <input
            type="date"
            value={newSchedule.date}
            onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
            required
          />
          <input
            type="time"
            value={newSchedule.time}
            onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Địa điểm"
            value={newSchedule.location}
            onChange={(e) => setNewSchedule({ ...newSchedule, location: e.target.value })}
            required
          />
          <textarea
            placeholder="Mô tả"
            value={newSchedule.description}
            onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })}
            required
          />
          <button type="submit">{editMode ? "Lưu chỉnh sửa" : "Thêm"}</button>
        </form>
      )}

      {error && <p className="error-message">❌ {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Ngày</th>
            <th>Giờ</th>
            <th>Địa điểm</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.title}</td>
              <td>{new Date(schedule.date).toLocaleDateString()}</td>
              <td>{schedule.time}</td>
              <td>{schedule.location}</td>
              <td>{schedule.description}</td>
              <td>
                <button onClick={() => handleDeleteSchedule(schedule._id)}>🗑 Xóa</button>
                <button onClick={() => handleEditClick(schedule)}>✏️ Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchedules;
