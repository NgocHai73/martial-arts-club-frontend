import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminPage.css";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "" });

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Lỗi khi tải bài viết:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/posts", formData)
      .then((res) => {
        setPosts([...posts, res.data]);
        setShowForm(false);
      })
      .catch((err) => console.error("Lỗi khi thêm bài viết:", err));
  };

  return (
    <div className="admin-page">
      <h2>📝 Quản Lý Bài Viết</h2>
      <button className="add-button" onClick={() => setShowForm(!showForm)}>+</button>

      {showForm && (
        <div className={`form-container ${showForm ? "active" : ""}`}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tiêu đề"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
              placeholder="Nội dung"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <button type="submit">Thêm</button>
            <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Hủy</button>
          </form>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.content.substring(0, 50)}...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
