import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminPage.css";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", images: [] });
  const [previewImages, setPreviewImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => setError("Không thể tải bài viết!"));
  }, []);

  // 🖼 Xử lý chọn nhiều ảnh
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Hiển thị ảnh đã chọn
    const preview = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(preview);
  };

  // 📝 Xử lý submit (Thêm/Sửa)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("content", formData.content);
    formData.images.forEach((image) => formDataToSend.append("images", image));

    try {
      let res;
      if (editMode) {
        res = await API.put(`/posts/${selectedPostId}`, formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        setPosts(posts.map((p) => (p._id === selectedPostId ? res.data : p)));
      } else {
        res = await API.post("/posts", formDataToSend, { headers: { "Content-Type": "multipart/form-data" } });
        setPosts([res.data, ...posts]);
      }

      setFormData({ title: "", content: "", images: [] });
      setPreviewImages([]);
      setShowForm(false);
      setEditMode(false);
    } catch (err) {
      setError("Lỗi khi thêm/sửa bài viết!");
    }
  };

  // ✏️ Chỉnh sửa bài viết
  const handleEditClick = (post) => {
    setFormData({ title: post.title, content: post.content, images: [] });
    setPreviewImages(post.images || []);
    setSelectedPostId(post._id);
    setEditMode(true);
    setShowForm(true);
  };

  // 🗑 Xóa bài viết
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa bài viết này?")) return;

    try {
      await API.delete(`/posts/${id}`);
      setPosts(posts.filter((p) => p._id !== id));
    } catch (err) {
      alert("Không thể xóa bài viết!");
    }
  };

  return (
    <div className="admin-page">
      <h2>📝 Quản Lý Bài Viết</h2>
      <button className="add-btn" onClick={() => {
        setShowForm(!showForm);
        setEditMode(false);
        setFormData({ title: "", content: "", images: [] });
        setPreviewImages([]);
      }}>
        ➕
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Tiêu đề"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Nội dung bài viết"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            required
          />
          <input type="file" multiple accept="image/*" onChange={handleFileChange} />
          
          {/* 🖼 Hiển thị ảnh xem trước */}
          <div className="image-preview">
            {previewImages.map((src, index) => (
              <img key={index} src={src} alt={`Ảnh ${index}`} width="100" />
            ))}
          </div>

          <button type="submit">{editMode ? "💾 Lưu Chỉnh Sửa" : "📝 Thêm Bài Viết"}</button>
        </form>
      )}

      {error && <p className="error-message">❌ {error}</p>}

      <table>
        <thead>
          <tr>
            <th>Tiêu đề</th>
            <th>Hình ảnh</th>
            <th>Nội dung</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>
                {post.images?.length > 0 ? (
                  <img src={`http://localhost:5000${post.images[0]}`} alt="Bài viết" width="100" />
                ) : "Không có ảnh"}
              </td>
              <td>{post.content.substring(0, 50)}...</td>
              <td>
                <button onClick={() => handleEditClick(post)}>✏️ Sửa</button>
                <button onClick={() => handleDelete(post._id)}>🗑 Xóa</button>
              </td>
            </tr>
          )) : (
            <tr><td colSpan="4">⚠️ Không có bài viết nào!</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPosts;
