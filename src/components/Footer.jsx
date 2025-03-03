import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                {/* Logo and About Section */}
                <div className="footer-section">
                    <h3 className="footer-logo">Finance Tracker</h3>
                    <p>
                        Track your income and expenses with ease and achieve your financial goals.
                    </p>
                </div>

                {/* Quick Links Section */}
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/add-income">Add Income</a></li>
                        <li><a href="/add-expense">Add Expense</a></li>
                        <li><a href="/goal-tracker">Goal Tracker</a></li>
                    </ul>
                </div>

                {/* Social Media Section */}
                <div className="footer-section">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
                        <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                        <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
                        <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>

            <p className="footer-credit">
                &copy; {new Date().getFullYear()} Finance Tracker | All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
