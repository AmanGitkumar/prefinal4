import React, { useEffect, useState } from "react";
import { getIncome, getExpenses } from "../services/financeService";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import "./GoalTracker.css";




const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const GoalTracker = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const incomeData = await getIncome();
      const expensesData = await getExpenses();
      setIncome(incomeData.data);
      setExpenses(expensesData.data);
    } catch (error) {
      console.log("Error fetching financial data:", error);
    }
  };

  const calculateMonthlyData = () => {
    const data = months.map((month, index) => {
      const monthIncome = income.filter(item => new Date(item.date).getMonth() === index);
      const monthExpenses = expenses.filter(item => new Date(item.date).getMonth() === index);
      
      const totalIncome = monthIncome.reduce((sum, item) => sum + item.amount, 0);
      const totalExpenses = monthExpenses.reduce((sum, item) => sum + item.amount, 0);
      const netSavings = totalIncome - totalExpenses;

      return { month, totalIncome, totalExpenses, netSavings };
    });
    return data;
  };

  const monthlyData = calculateMonthlyData();

  return (
    <div className="goal-tracker-container">
      <h1>Goal Tracker</h1>
      <div className="goal-cards">
        {monthlyData.map((item, index) => (
          <div key={index} className="goal-card">
            <h3>{item.month}</h3>
            <p><strong>Income:</strong> ₹{item.totalIncome}</p>
            <p><strong>Expenses:</strong> ₹{item.totalExpenses}</p>
            <p><strong>Net Savings:</strong> ₹{item.netSavings}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalTracker;


