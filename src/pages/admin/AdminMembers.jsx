import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminMembers.css";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", belt: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    API.get("/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("Lỗi khi tải thành viên:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/members/${editingId}`, formData);
      } else {
        await API.post("/members", formData);
      }
      setFormData({ name: "", email: "", belt: "" });
      setEditingId(null);
      setShowForm(false);
      API.get("/members").then((res) => setMembers(res.data));
    } catch (err) {
      console.error("Lỗi khi thêm/cập nhật thành viên:", err);
    }
  };

  const handleEdit = (member) => {
    setFormData({ name: member.name, email: member.email, belt: member.belt });
    setEditingId(member._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await API.delete(`/members/${id}`);
    API.get("/members").then((res) => setMembers(res.data));
  };

  return (
    <div className="admin-page">
      <h2>👥 Quản Lý Thành Viên</h2>

      <div className="add-button" onClick={() => setShowForm(!showForm)}>
        {showForm ? "−" : "+"}
      </div>

      <form onSubmit={handleSubmit} className={`schedule-form ${showForm ? "active" : ""}`}>
        <input type="text" name="name" placeholder="Tên" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="belt" placeholder="Cấp đai" value={formData.belt} onChange={handleChange} required />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm"}</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Cấp đai</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.belt}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(member)}>✏️ Sửa</button>
                <button className="delete" onClick={() => handleDelete(member._id)}>🗑️ Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMembers;
