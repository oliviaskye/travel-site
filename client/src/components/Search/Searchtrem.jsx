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

  const handleRangeChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);

    // Dynamically set the gradient background for the slider
    e.target.style.background = `linear-gradient(to right, #cb5c00 ${value}%, #ddd ${value}%)`;
  };

  return (
    <div className="sidebar">
      
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
            style={{ paddingLeft: "200px" }} 
          />
        )}
      </p>
      {isModalOpen && (
        <div className="searchtrem">
          <h2>Hotels Searchs </h2>
          <h2></h2>
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
              onChange={(e) => handleRangeChange(e)}
              style={{
                background: `linear-gradient(to right, #cb5c00 ${maxPrice}%, #ddd ${maxPrice}%)`,
              }}
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
