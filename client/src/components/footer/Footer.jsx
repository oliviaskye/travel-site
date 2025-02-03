import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="p-5 bg-gray-800 text-white flex justify-between items-center">
      <p>&copy; 2025 Traveller.All Rights Reserved.</p>
      <Link to="/contact" className="text-indigo-400 hover:underline">
        Contact Us
      </Link>
    </footer>
  );
};

export default Footer;



