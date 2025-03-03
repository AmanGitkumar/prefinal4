import React, { useEffect, useState } from "react";
import { addBill, getBills, markBillAsPaid, deleteBill } from "../services/billService";
import "./Bills.css";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({
    title: "",
    amount: "",
    dueDate: "",
    category: "",
  });

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await getBills();
      console.log("Fetched Bills:", response.data);  // ✅ Add this line
      setBills(response.data);
    } catch (error) {
      console.log("Error fetching bills:", error);
    }
  };

  const handleAddBill = async (e) => {
    e.preventDefault();
    if (new Date(newBill.dueDate) < new Date()) {
      alert("Only future dates are allowed!");
      return;
    }

    try {
      await addBill(newBill);
      setNewBill({ title: "", amount: "", dueDate: "", category: "" });
      fetchBills();
    } catch (error) {
      console.log("Error adding bill:", error);
    }
  };

  const handleMarkAsPaid = async (id) => {
    try {
      await markBillAsPaid(id);
      fetchBills();
    } catch (error) {
      console.log("Error marking bill as paid:", error);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      await deleteBill(id);
      fetchBills();
    } catch (error) {
      console.log("Error deleting bill:", error);
    }
  };

  return (
    <div className="bills-container">
      <h1>Bills Management</h1>

      {/* Add Bill Form */}
      <form onSubmit={handleAddBill} className="bill-form">
        <input
          type="text"
          placeholder="Bill Title"
          value={newBill.title}
          onChange={(e) => setNewBill({ ...newBill, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBill.amount}
          onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
          required
        />
        <input
          type="date"
          value={newBill.dueDate}
          onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
          required
        />
        <select
          value={newBill.category}
          onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
          <option value="Rent">Rent</option>
        </select>
        <button type="submit">Add Bill</button>
      </form>

      {/* Bills List */}
      <div className="bills-list">
        <h2>Upcoming Bills</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => {
              const dueDate = new Date(bill.dueDate);
              const today = new Date();
              const diffDays = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

              return (
                <tr
                  key={bill._id}
                  className={
                    bill.status === "Due" && diffDays < 0 ? "due-bill" : diffDays <= 3 ? "warning-bill" : ""
                  }
                >
                  <td>{bill.title}</td>
                  <td>₹{bill.amount}</td>
                  <td>{dueDate.toLocaleDateString()}</td>
                  <td>{bill.category}</td>
                  <td>{bill.status}</td>
                  <td>
                    {bill.status === "Due" && (
                      <button className="btn" onClick={() => handleMarkAsPaid(bill._id)}>Mark as Paid</button>
                    )}
                    <button className="btn" onClick={() => handleDeleteBill(bill._id)}> Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bills;
