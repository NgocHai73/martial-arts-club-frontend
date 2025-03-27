import React, { useEffect, useState } from "react";
import API from "../../services/api";
import "../../styles/AdminFinance.css";

const AdminFinance = () => {
  const [tuitionFees, setTuitionFees] = useState([]);
  const [fundRecords, setFundRecords] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [newTuition, setNewTuition] = useState({ memberId: "", amount: "" });
  const [newFund, setNewFund] = useState({ description: "", amount: "" });

  // 📌 Fetch dữ liệu
  const fetchData = () => {
    API.get(`/finance/tuition?month=${month}&year=${year}`).then((res) => setTuitionFees(res.data));
    API.get(`/finance/fund?month=${month}&year=${year}`).then((res) => setFundRecords(res.data));
  };

  useEffect(fetchData, [month, year]);

  // 📌 Tạo học phí
  const handleAddTuition = () => {
    API.post("/finance/tuition", newTuition).then(() => {
      setNewTuition({ memberId: "", amount: "" });
      fetchData();
    });
  };

  // 📌 Tạo quỹ hoạt động
  const handleAddFund = () => {
    API.post("/finance/fund", newFund).then(() => {
      setNewFund({ description: "", amount: "" });
      fetchData();
    });
  };

  // 📌 Xóa bản ghi
  const handleDelete = (id) => {
    API.delete(`/finance/${id}`).then(() => fetchData());
  };

  return (
    <div className="admin-page">
      <h2>💰 Quản Lý Quỹ & Học Phí</h2>

      {/* Bộ lọc tháng */}
      <div className="filter-container">
        <label>Chọn tháng:</label>
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <label>Chọn năm:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />
      </div>

      {/* Bảng học phí */}
      <h3>📚 Học Phí</h3>
      <input type="text" placeholder="Mã Thành viên" value={newTuition.memberId} onChange={(e) => setNewTuition({ ...newTuition, memberId: e.target.value })} />
      <input type="number" placeholder="Số tiền" value={newTuition.amount} onChange={(e) => setNewTuition({ ...newTuition, amount: e.target.value })} />
      <button onClick={handleAddTuition}>➕ Thêm Học Phí</button>
      <table>
        <thead>
          <tr><th>Thành viên</th><th>Cấp đai</th><th>Số tiền</th><th>Hành động</th></tr>
        </thead>
        <tbody>
          {tuitionFees.map(item => (
            <tr key={item._id}>
              <td>{item.member?.name}</td>
              <td>{item.member?.belt}</td>
              <td>{item.amount} VND</td>
              <td><button onClick={() => handleDelete(item._id)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bảng quỹ */}
      <h3>🏦 Quỹ Hoạt Động</h3>
      <input type="text" placeholder="Mô tả" value={newFund.description} onChange={(e) => setNewFund({ ...newFund, description: e.target.value })} />
      <input type="number" placeholder="Số tiền" value={newFund.amount} onChange={(e) => setNewFund({ ...newFund, amount: e.target.value })} />
      <button onClick={handleAddFund}>➕ Thêm Quỹ</button>
    </div>
  );
};

export default AdminFinance;
