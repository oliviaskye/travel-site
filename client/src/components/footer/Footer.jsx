import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 Traveller. All Rights Reserved.</p>
      <Link to="/contact" className="contact-link">
        Contact Us
      </Link>
    </footer>
  );
};

export default Footer;

