import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSound from "../../assets/XSound.wav";
import "./Nav.css";

function Nav() {
  const menuRef = useRef();
  const audioRef = useRef(new Audio(XSound));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [isDarkMode, isSoundOn]);

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
      // sound off
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      // sound on
      audioRef.current.play();
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
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Nav;
