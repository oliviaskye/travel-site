import React, { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./Searchtrem.css";

function Searchtrem({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    if (!destination.trim()) {
      alert("Please enter a valid city.");
      return;
    }

    const priceRange = [0, maxPrice];

    console.log("Sending search data to Discover:", {
      destination,
      priceRange,
    });

    if (onSearch) {
      onSearch({ destination, priceRange });
    }
  };

  return (
    <div className="sidebar">
      <h1 className="Filter">
        Filte<span>r</span>
      </h1>
      <p
        onClick={() => setIsModalOpen(!isModalOpen)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        {isModalOpen ? (
          <FaChevronUp size={20} color="black" />
        ) : (
          <FaChevronDown
            size={20}
            color="black"
            style={{ paddingLeft: "200px" }} // إضافة الحشوة هنا
          />
        )}
      </p>
      {isModalOpen && (
        <div className="searchtrem">
          <h2>City</h2>
          <input
            type="text"
            placeholder="City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          <div>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
            />
            <p>{`$0 - $${maxPrice}`}</p>
            <input
              className="input"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value) || 0)}
            />
          </div>
          <button className="nav-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      )}
    </div>
  );
}

export default Searchtrem;
