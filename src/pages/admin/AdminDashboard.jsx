import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";
import "../../styles/AdminDb.css";

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
        const membersRes = await API.get("/members");
        setStats((prev) => ({
          ...prev,
          members: membersRes.data.length, // ✅ Lấy số lượng thành viên
        }));
      } catch (error) {
        console.error("🔥 Lỗi khi tải thống kê thành viên:", error);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const eventsRes = await API.get("/events");
        setStats((prev) => ({
          ...prev,
          events: eventsRes.data.length, // ✅ Lấy số lượng thành viên
        }));
      } catch (error) {
        console.error("🔥 Lỗi khi tải thống kê thành viên:", error);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postsRes = await API.get("/posts");
        setStats((prev) => ({
          ...prev,
          posts: postsRes.data.length, // ✅ 
        }));
      } catch (error) {
        console.error("🔥 Lỗi khi tải thống kê bài viết:", error);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const schedulesRes = await API.get("/schedules");
        setStats((prev) => ({
          ...prev,
          schedules: schedulesRes.data.length, // ✅ 
        }));
      } catch (error) {
        console.error("🔥 Lỗi khi tải thống kê bài viết:", error);
      }
    };

    fetchStats();
  }, []);
  return (
    <div className="admin-dashboard">
      <h2>📊 Tổng Quan Admin</h2>
      <div className="dashboard-grid">
        <Link to="/admin/members" className="dashboard-card">
          👥 Thành viên: {stats.members} người
        </Link>
        <Link to="/admin/posts" className="dashboard-card">
          📝 Bài viết: {stats.posts} bài
          </Link>
        <Link to="/admin/schedules" className="dashboard-card">
          📅 Lịch tập: {stats.schedules} lịch
          </Link>
        <Link to="/admin/events" className="dashboard-card">
        🎉 Sự kiện: {stats.events} sự kiện
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
