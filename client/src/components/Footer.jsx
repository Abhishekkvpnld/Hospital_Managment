import React from 'react'
import { Link } from 'react-router-dom';
import "./footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                
                <div className="footer-section about">
                    <h3>About Us</h3>
                    <p>
                        We are committed to providing top-quality healthcare services, ensuring the well-being of our patients with advanced medical care and personalized treatment plans.
                    </p>
                </div>

                <div className="footer-section links">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to={"#"}>Home</Link></li>
                        <li><Link to={"/appointment"}>Appointments</Link></li>
                        <li><Link to={"/"}>Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-section contact">
                    <h3>Contact Us</h3>
                    <p>Email: contact@healthcareapp.com</p>
                    <p>Phone: +91 8234 567 890</p>
                    <p>Address: 123 Health Street, Health City, 12345</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 Healthcare App. All Rights Reserved.</p>
            </div>
        </footer>

    )
}

export default Footer;