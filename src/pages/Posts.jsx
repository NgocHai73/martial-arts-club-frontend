import React, { useEffect, useState } from "react";
import API from "../services/api";


const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Lỗi khi tải bài viết:", err));
  }, []);

  return (
    <div>
      <h2>Bài Viết</h2>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
