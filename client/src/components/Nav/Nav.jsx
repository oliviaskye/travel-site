import React, { useState, useEffect, useRef } from "react";
import navCSS from "./Nav.module.css";
import XSound from "@assets/XSound.wav";

const navItemses = [
  { label: "Home", path: "/" },
  { label: "Map", path: "/map" },
  { label: "Contact", path: "/Contact" },
  { label: "Profile", path: "/UserProfile" },
  { label: "Discover", path: "/Discover" },
  { label: "Sound", action: "toggleSound" },
  { label: "Sign In", path: "/RegisterLogin" },
];

function Nav() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);
  const [isSoundOn, setIsSoundOn] = useState(
    () => localStorage.getItem("soundOn") === "true"
  );

  const audioRef = useRef(new Audio(XSound));

  useEffect(() => {
    if (!isSoundOn) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    } else {
      audioRef.current.play();
    }
    localStorage.setItem("soundOn", isSoundOn.toString());
  }, [isSoundOn]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSound = () => setIsSoundOn((prev) => !prev);

  const handleAction = (action) => {
    if (action === "toggleSound") {
      toggleSound();
    }
  };

  return (
    <nav className={navCSS.nav_wrapper}>
      <div className={navCSS.logo}>
        <a href="/">
        <span>T</span>raveler
        </a>
      </div>

      {!isMobile && (
        <div>
          <ul className={navCSS.navList}>
            {navItemses.map((item, index) => (
              <li key={index}>
                <a
                  href={item.path || "#"}
                  onClick={(e) => {
                    if (item.action) {
                      e.preventDefault();
                      handleAction(item.action);
                    }
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isMobile && (
        <div className={navCSS.Nav_btns}>
          <button
            className="nav-button"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
          >
            <i id={navCSS.bras}>menu</i>
          </button>
        </div>
      )}

      {isMobile && isMenuVisible && (
        <ul className={navCSS.showNav}>
          {navItemses.map((item, index) => (
            <li key={index}>
              <a
                href={item.path || "#"}
                onClick={(e) => {
                  if (item.action) {
                    e.preventDefault();
                    handleAction(item.action);
                  }
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default Nav;
