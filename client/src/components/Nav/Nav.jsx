import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSound from "@assets/XSound.wav";
import { FaMoon, FaSun, FaVolumeUp, FaVolumeMute } from 'react-icons/fa'; // Importing the icons
import "./Nav.css";

export const navItems = [
  { label: "Home", path: "/" },
  { label: "Map", path: "/map" },
  { label: "Profile", path: "/UserProfile" },
  { label: "Dark Mode", action: "toggleDarkMode" },
  { label: "Sound", action: "toggleSound" },
  { label: "Sign In", action: "signIn" },
];

function Nav() {
  const menuRef = useRef();
  const audioRef = useRef(new Audio(XSound));
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isSoundOn, setIsSoundOn] = useState(() => {
    return localStorage.getItem("soundOn") === "true";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", isDarkMode);
    root.classList.toggle("light", !isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);

    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    localStorage.setItem("soundOn", isSoundOn);
  }, [isDarkMode, isSoundOn]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleSound = () => {
    if (isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsSoundOn((prev) => !prev);
  };

  const handleNavigateToRegister = () => navigate("/RegisterLogin");

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="logo">
        <Link to="/">Traveler</Link>
      </div>
      <ul ref={menuRef} className={isMenuOpen ? "active" : ""}>
        {navItems.map((item, index) => (
          <li key={index}>
            {item.path ? (
              <Link to={item.path}>{item.label}</Link>
            ) : (
              <button
                onClick={() => {
                  if (item.action === "toggleDarkMode") toggleDarkMode();
                  if (item.action === "toggleSound") toggleSound();
                  if (item.action === "signIn") handleNavigateToRegister();
                }}
              >
                {item.label === "Dark Mode"
                  ? isDarkMode
                    ? <><FaSun /> Light Mode</>
                    : <><FaMoon /> Dark Mode</>
                  : item.label === "Sound"
                  ? isSoundOn
                    ? <><FaVolumeUp /> Sound On</>
                    : <><FaVolumeMute /> Sound Off</>
                  : item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="navbar-actions">
        <button
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Nav;
