import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminMembers.css";

const AdminMembers = () => {
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false); // 🟢 Trạng thái chỉnh sửa
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [newMember, setNewMember] = useState({ name: "", email: "", phone: "", belt: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/members")
      .then((res) => setMembers(res.data))
      .catch((err) => console.error("🔥 Lỗi khi tải thành viên:", err.response?.data || err));
  }, []);

  // 🟢 Hiển thị form để chỉnh sửa
  const handleEditClick = (member) => {
    setNewMember(member); // 🟢 Đổ dữ liệu thành viên vào form
    setSelectedMemberId(member._id);
    setEditMode(true);
    setShowForm(true);
  };

  // 🟢 Xử lý cập nhật thành viên
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.put(`/members/${selectedMemberId}`, newMember);
      setMembers(members.map((m) => (m._id === selectedMemberId ? res.data : m)));
      setEditMode(false);
      setShowForm(false);
      setNewMember({ name: "", email: "", phone: "", belt: "" });
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật thành viên:", err.response?.data || err);
      setError(err.response?.data?.message || "Lỗi không xác định!");
    }
  };

  // 🟢 Thêm thành viên mới
  const handleAddMember = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/members", newMember);
      setMembers([...members, res.data]);
      setShowForm(false);
      setNewMember({ name: "", email: "", phone: "", belt: "" });
    } catch (err) {
      console.error("❌ Lỗi khi thêm thành viên:", err.response?.data || err);
      setError(err.response?.data?.message || "Lỗi không xác định!");
    }
  };

  // 🟢 Xóa thành viên
  const handleDeleteMember = async (id) => {
    try {
      await API.delete(`/members/${id}`);
      setMembers(members.filter((m) => m._id !== id));
    } catch (err) {
      console.error("❌ Lỗi khi xóa:", err);
    }
  };

  return (
    <div className="admin-page">
      <h2>👥 Quản Lý Thành Viên</h2>
      <button className="add-btn" onClick={() => { setShowForm(!showForm); setEditMode(false); setNewMember({ name: "", email: "", phone: "", belt: "" }); }}>+</button>

      {showForm && (
        <form onSubmit={editMode ? handleSaveEdit : handleAddMember}>
          <input type="text" placeholder="Tên" value={newMember.name} onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} required />
          <input type="text" placeholder="Số điện thoại" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} required />
          <input type="text" placeholder="Cấp đai" value={newMember.belt} onChange={(e) => setNewMember({ ...newMember, belt: e.target.value })} required />
          <button type="submit">{editMode ? "Lưu chỉnh sửa" : "Thêm"}</button>
        </form>
      )}

      {error && <p className="error-message">❌ {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Cấp đai</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.belt}</td>
              <td>
                <button onClick={() => handleDeleteMember(member._id)}>🗑 Xóa</button>
                <button onClick={() => handleEditClick(member)}>✏️ Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMembers;
