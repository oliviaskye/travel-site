import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSound from "../../assets/XSound.wav";
import "./Nav.css";

function Nav() {
  const menuRef = useRef();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Apply dark mode globally
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle("active");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSound = () => {
    if (isSoundOn) {
      const sound = new Audio(XSound);
      sound.play();
    }
    setIsSoundOn(!isSoundOn);
  };

  const handleNavigateToRegister = () => {
    navigate("/RegisterLogin");
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="logo">
        <Link to="/">Traveler</Link>
      </div>
      <ul ref={menuRef}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/UserProfile">Profile</Link>
        </li>
        {/* إضافة الأزرار مع روابط */}
        <li>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
        <li>
          <button onClick={toggleSound}>
            {isSoundOn ? "🔊 Sound On" : "🔇 Sound Off"}
          </button>
        </li>
        <li>
          <button className="button" onClick={handleNavigateToRegister}>
            Signin
          </button>
        </li>
      </ul>
      <div className="navbar-actions">
        {/* Menu Toggle */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Nav;
