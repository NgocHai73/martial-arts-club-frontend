import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/AdminPage.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    members: 0,
    posts: 0,
    schedules: 0,
    events: 0,
    finance: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const members = await API.get("/members");
        const posts = await API.get("/posts");
        const schedules = await API.get("/schedules");
        const events = await API.get("/events");
        const finance = await API.get("/finance");

        setStats({
          members: members.data.length,
          posts: posts.data.length,
          schedules: schedules.data.length,
          events: events.data.length,
          finance: finance.data.reduce((sum, item) => sum + item.amount, 0),
        });
      } catch (error) {
        console.error("Lỗi khi tải thống kê:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>📊 Tổng Quan Admin</h2>
      <div className="dashboard-grid">
        <Link to="/admin/members" className="dashboard-card">👥 Thành viên: {stats.members}</Link>
        <Link to="/admin/posts" className="dashboard-card">📝 Bài viết: {stats.posts}</Link>
        <Link to="/admin/schedules" className="dashboard-card">📅 Lịch tập: {stats.schedules}</Link>
        <Link to="/admin/events" className="dashboard-card">🎉 Sự kiện: {stats.events}</Link>
        <Link to="/admin/finance" className="dashboard-card">💰 Quỹ: {stats.finance.toLocaleString()} VND</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
