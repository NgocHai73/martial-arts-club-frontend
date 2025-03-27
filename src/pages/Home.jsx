import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <header className="hero">
        <h1>Chào mừng đến với CLB Võ Thuật</h1>
        <p>Nơi rèn luyện tinh thần và thể chất</p>
      </header>

      <section className="about">
        <h2>Về Chúng Tôi</h2>
        <p>CLB chuyên đào tạo võ thuật cho mọi lứa tuổi.</p>
      </section>

      <section className="posts">
        <h2>Bài Viết Nổi Bật</h2>
        <div className="post-list">
          <div className="post-card">
            <h3>Võ thuật cổ truyền</h3>
            <p>Bài viết về kỹ thuật và lịch sử võ thuật.</p>
          </div>
          <div className="post-card">
            <h3>Các đòn thế cơ bản</h3>
            <p>Hướng dẫn những kỹ thuật cơ bản.</p>
          </div>
          <div className="post-card">
            <h3>Chế độ dinh dưỡng</h3>
            <p>Ăn uống khoa học để tăng sức mạnh.</p>
          </div>
        </div>
      </section>

      <section className="schedule">
        <h2>Lịch Tập Sắp Tới</h2>
        <ul>
          <li>Thứ Hai - 18h00 - Võ Đường A</li>
          <li>Thứ Tư - 19h00 - Võ Đường B</li>
          <li>Thứ Sáu - 17h30 - Công viên C</li>
        </ul>
      </section>

      <section className="events">
        <h2>Sự Kiện Sắp Diễn Ra</h2>
        <ul>
          <li>Giải đấu tháng 4 - 15/04/2025</li>
          <li>Giao lưu với võ sư - 25/04/2025</li>
        </ul>
      </section>

      <footer>
        <p>Liên hệ: 0123 456 789</p>
      </footer>
    </div>
  );
};

export default Home;
