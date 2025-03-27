import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminPage.css";

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editEventId, setEditEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    API.get("/events")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Lỗi khi tải sự kiện:", err));
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editEventId) {
      // Cập nhật sự kiện
      API.put(`/events/${editEventId}`, formData)
        .then(() => {
          fetchEvents();
          resetForm();
        })
        .catch((err) => console.error("Lỗi khi cập nhật sự kiện:", err));
    } else {
      // Thêm mới sự kiện
      API.post("/events", formData)
        .then(() => {
          fetchEvents();
          resetForm();
        })
        .catch((err) => console.error("Lỗi khi thêm sự kiện:", err));
    }
  };

  const handleEdit = (event) => {
    setEditEventId(event._id);
    setFormData({ name: event.name, description: event.description });
    setFormVisible(true);
  };

  const handleDelete = (id) => {
    API.delete(`/events/${id}`)
      .then(() => fetchEvents())
      .catch((err) => console.error("Lỗi khi xóa sự kiện:", err));
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setEditEventId(null);
    setFormVisible(false);
  };

  return (
    <div className="admin-page">
      <h2>🎉 Quản Lý Sự Kiện</h2>

      {/* Nút mở form */}
      <button className="add-button" onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? "✖ Đóng" : "➕ Thêm Sự Kiện"}
      </button>

      {/* Form nhập liệu */}
      {formVisible && (
        <form onSubmit={handleSubmit} className="event-form">
          <input
            type="text"
            name="name"
            placeholder="Tên sự kiện"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Mô tả"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
          <button type="submit">{editEventId ? "Cập Nhật" : "Thêm Mới"}</button>
        </form>
      )}

      {/* Bảng danh sách sự kiện */}
      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(event)}>✏️ Sửa</button>
                <button className="delete-button" onClick={() => handleDelete(event._id)}>🗑️ Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminEvents;
