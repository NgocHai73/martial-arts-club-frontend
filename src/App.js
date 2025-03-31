import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";
import Schedule from "./pages/Schedule";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import AdminMembers from "./pages/admin/AdminMembers";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminFinance from "./pages/admin/AdminFinance";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvent from "./pages/admin/AdminEvents";
import AdminSchedules from "./pages/admin/AdminSchedules";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/admin/members" element={<AdminMembers />} />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/events" element={<AdminEvent />} />
        <Route path="/admin/finance" element={<AdminFinance />} />
        
        <Route path="/admin/schedules" element={<AdminSchedules />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/members" element={<ProtectedRoute role="admin"><AdminMembers /></ProtectedRoute>} />
<Route path="/admin/posts" element={<ProtectedRoute role="admin"><AdminPosts /></ProtectedRoute>} />
<Route path="/admin/finance" element={<ProtectedRoute role="admin"><AdminFinance /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
