import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role"); // Giả sử backend trả về role (admin hoặc user)

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo"><Link to="/">CLB Võ Thuật</Link></div>
      <ul className="nav-links">
        <li><Link to="/">Trang Chủ</Link></li>
        <li><Link to="/posts">Bài Viết</Link></li>
        <li><Link to="/schedule">Lịch Tập</Link></li>
        <li><Link to="/events">Sự Kiện</Link></li>

        {token && userRole === "admin" && (
          <li><Link to="/admin">Quản Lý</Link></li>
        )}

        {!token ? (
          <>
            <li><Link to="/login">Đăng Nhập</Link></li>
            <li><Link to="/register">Đăng Ký</Link></li>
          </>
        ) : (
          <li><button className="logout-btn" onClick={handleLogout}>Đăng Xuất</button></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
