import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Đảm bảo đúng URL
  withCredentials: true, // Nếu dùng cookie để xác thực
});




// Thêm token vào request headers nếu có
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
