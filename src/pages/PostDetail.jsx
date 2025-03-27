import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/PostDetail.css";

const postData = {
  1: { title: "Võ thuật cổ truyền", content: "Nội dung chi tiết về võ thuật cổ truyền...", date: "10/03/2025" },
  2: { title: "Các đòn thế cơ bản", content: "Chi tiết về các đòn thế cơ bản...", date: "15/03/2025" },
  3: { title: "Chế độ dinh dưỡng", content: "Chế độ ăn uống giúp tăng cường thể lực...", date: "20/03/2025" }
};

const PostDetail = () => {
  const { id } = useParams();
  const post = postData[id];

  if (!post) {
    return <h2>Bài viết không tồn tại</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="post-detail-container">
        <h2>{post.title}</h2>
        <p className="date">Ngày đăng: {post.date}</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;
