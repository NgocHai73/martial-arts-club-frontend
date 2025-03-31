import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminEvents.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", location: "", description: "", image: null });
  const [error, setError] = useState("");
  const placeholderImage = "https://placehold.co/100x100";

  useEffect(() => {
    API.get("/admin/events")
      .then((res) => {
        console.log("📌 API response:", res.data); // Kiểm tra dữ liệu trả về
        setEvents(res.data);
      })
      .catch((err) => console.error("🔥 Lỗi khi tải sự kiện:", err.response?.data || err));
  }, []);


  const handleFileChange = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  const handleEditClick = (event) => {
    setNewEvent(event);
    setSelectedEventId(event._id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("date", newEvent.date);
    formData.append("location", newEvent.location);
    formData.append("description", newEvent.description);
    if (newEvent.image) {
      formData.append("image", newEvent.image);
    }
  
    try {
      const res = editMode
        ? await API.put(`/admin/events/${selectedEventId}`, formData, { headers: { "Content-Type": "multipart/form-data" } })
        : await API.post("/admin/events", formData, { headers: { "Content-Type": "multipart/form-data" } });
  
      setEvents(editMode ? events.map((e) => (e._id === selectedEventId ? res.data : e)) : [...events, res.data]);
      setEditMode(false);
      setShowForm(false);
      setNewEvent({ title: "", date: "", location: "", description: "", image: null });
    } catch (err) {
      console.error("❌ Lỗi:", err.response?.data || err);
      setError(err.response?.data?.message || "Lỗi không xác định!");
    }
  };
  
  

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?")) return;
  
    try {
      await API.delete(`/admin/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
      alert("Không thể xóa sự kiện!");
    }
  };
  
  return (
    <div className="admin-page">
      <h2>📅 Quản Lý Sự Kiện</h2>
      <button className="add-btn" onClick={() => { setShowForm(!showForm); setEditMode(false); setNewEvent({ title: "", date: "", location: "", description: "", image: null }); }}>+</button>

      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input type="text" placeholder="Tiêu đề" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} required />
          <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} required />
          <input type="text" placeholder="Địa điểm" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} required />
          <textarea placeholder="Mô tả sự kiện" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} required />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">{editMode ? "Lưu chỉnh sửa" : "Thêm"}</button>
        </form>
      )}

      {error && <p className="error-message">❌ {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Hình ảnh</th>
            <th>Tiêu đề</th>
            <th>Ngày</th>
            <th>Địa điểm</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>
                {event.image ? (
                  <img
                    src={`http://localhost:5000${event.image}`}  // Đảm bảo đường dẫn đúng
                    alt="Sự kiện"
                    width="100"
                    onError={(e) => (e.target.src = placeholderImage)}
                  />
                ) : (
                  "Không có ảnh"
                )}
              </td>


              <td>{event.name}</td>
              <td>{new Date(event.date).toLocaleDateString()}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>
                <button onClick={() => handleDeleteEvent(event._id)}>🗑 Xóa</button>
                <button onClick={() => handleEditClick(event)}>✏️ Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvents;
