import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    belt: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Đăng ký thất bại!");
    }
  };

  return (
    <div className="auth-container">
      <h2>Đăng Ký</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister}>
        <input type="text" name="name" placeholder="Họ và Tên" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} required />
        <select name="belt" onChange={handleChange} required>
          <option value="">-- Chọn cấp đai --</option>
          <option value="Nhập Môn">Nhập Môn</option>
          <option value="Lam Đai 1">Lam Đai 1</option>
          <option value="Lam Đai 2">Lam Đai 2</option>
          <option value="Lam Đai 3">Lam Đai 3</option>
          <option value="Hoàng Đai ">Hoàng Đai </option>
          <option value="Hoàng Đai 1 Cấp">Hoàng Đai 1 Cấp</option>
          <option value="Hoàng Đai 2 Cấp">Hoàng Đai 2 Cấp</option>
          <option value="Hoàng Đai 3 Cấp">Hoàng Đai 3 Cấp</option>
          <option value="Chuẩn Hồng Đai">Chuẩn Hồng Đai</option>
          <option value="Hồng Đai Nhị Cấp">Hồng Đai 1 Cấp</option>
          <option value="Hồng Đai Nhị Cấp">Hồng Đai 2 Cấp</option>
        </select>
        <button type="submit">Đăng Ký</button>
      </form>
      <p>Đã có tài khoản? <a href="/login">Đăng nhập</a></p>
    </div>
  );
};

export default Register;
