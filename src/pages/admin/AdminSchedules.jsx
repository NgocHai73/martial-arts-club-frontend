import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminSchedules.css";

const AdminSchedules = () => {
  const [schedules, setSchedules] = useState([]);
  const [formData, setFormData] = useState({ date: "", activity: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false); // 🔹 State để ẩn/hiện form

  // 🔹 Lấy danh sách lịch trình
  const fetchSchedules = async () => {
    try {
      const res = await API.get("/schedules");
      setSchedules(res.data);
    } catch (err) {
      console.error("Lỗi khi tải lịch trình:", err);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Thêm hoặc cập nhật lịch trình
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/schedules/${editingId}`, formData);
      } else {
        await API.post("/schedules", formData);
      }
      setFormData({ date: "", activity: "" });
      setEditingId(null);
      setShowForm(false); // 🔹 Ẩn form sau khi thêm/cập nhật
      fetchSchedules();
    } catch (err) {
      console.error("Lỗi khi thêm/cập nhật lịch trình:", err);
    }
  };

  // 🔹 Chỉnh sửa lịch trình
  const handleEdit = (schedule) => {
    setFormData({ date: schedule.date, activity: schedule.activity });
    setEditingId(schedule._id);
    setShowForm(true); // 🔹 Hiển thị form khi sửa
  };

  // 🔹 Xóa lịch trình
  const handleDelete = async (id) => {
    try {
      await API.delete(`/schedules/${id}`);
      fetchSchedules();
    } catch (err) {
      console.error("Lỗi khi xóa lịch trình:", err);
    }
  };

  return (
    <div className="admin-page">
      <h2>📅 Quản Lý Lịch Trình</h2>

      {/* 🔹 Nút dấu "+" để mở form */}
      <div className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "−" : "+"}
      </div>

      {/* 🔹 Form nhập liệu ẩn/hiện */}
      <form onSubmit={handleSubmit} className={`schedule-form ${showForm ? "active" : ""}`}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="activity"
          placeholder="Hoạt động"
          value={formData.activity}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {editingId ? "Cập nhật" : "Thêm"}
        </button>
      </form>

      {/* 🔹 Bảng danh sách lịch trình */}
      <table>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule._id}>
              <td>{schedule.date}</td>
              <td>{schedule.activity}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(schedule)}>✏️ Sửa</button>
                <button className="delete" onClick={() => handleDelete(schedule._id)}>🗑️ Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminSchedules;
