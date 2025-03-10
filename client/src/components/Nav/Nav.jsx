import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import XSound from "../../assets/XSound.wav";
import "./Nav.css";

function Nav() {
  const menuRef = useRef();
  const audioRef = useRef(new Audio(XSound));
  const navigate = useNavigate();

  // Загружаем состояние из localStorage (если есть)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const [isSoundOn, setIsSoundOn] = useState(() => {
    return localStorage.getItem("soundOn") === "true";
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Эффект для применения темы и работы со звуком
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }

    // Сохраняем в localStorage
    localStorage.setItem("darkMode", isDarkMode);

    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    localStorage.setItem("soundOn", isSoundOn);
  }, [isDarkMode, isSoundOn]);

  // Переключение меню
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Переключение тёмной темы
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Включение/выключение звука
  const toggleSound = () => {
    if (isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    setIsSoundOn((prev) => !prev);
  };

  // Навигация на страницу логина
  const handleNavigateToRegister = () => {
    navigate("/RegisterLogin");
  };

  return (
    <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
      <div className="logo">
        <Link to="/">Traveler</Link>
      </div>
      <ul ref={menuRef} className={isMenuOpen ? "active" : ""}>
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
            Sign In
          </button>
        </li>
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
