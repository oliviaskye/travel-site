import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./Searchtrem.css";

function Searchtrem({ onFocus, onBlur }) {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState({
    from: null,
    to: null,
  });
  const [maxPrice, setMaxPrice] = useState(1000);

  const datePickerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target)
      ) {
        setOpenDate(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = () => {
    const priceRange = [0, maxPrice];
    navigate("/HotelFltring", {
      state: { destination, date, priceRange },
    });
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleDatePickerClick = () => {
    setOpenDate(!openDate);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onBlur();
    }
  };

  return (
    <div className="search_wrapper">
      <h1>Find Your Next Hotel</h1>
      <small>Discover Hotels at Exclusive Deals</small>

      <div className="search_box">
        {/* Destination Input */}
        <input
          type="text"
          placeholder="City"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onClick={handleKeyPress}
        />

        {/* Date Picker */}
        <div className="date_picker" onClick={handleDatePickerClick}>
          {date.from && date.to
            ? `${date.from.day}/${date.from.month}/${date.from.year} - ${date.to.day}/${date.to.month}/${date.to.year}`
            : "Select Dates"}
        </div>

        {/* Date Picker Popup */}
        {openDate && (
          <div className="date_popup" ref={datePickerRef}>
            <button className="close-button" onClick={() => setOpenDate(false)}>
              X
            </button>
            <Calendar
              className="nav-button"
              value={date}
              onChange={handleDateChange}
              minimumDate={new Date()}
              range
              locale="en"
            />
            <button className="nav-button" onClick={() => setOpenDate(false)}>
              Apply
            </button>
          </div>
        )}

        {/* Price Range Slider */}
        <div className="price_range">
          <input
            type="range"
            min="0"
            max="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
          <p>{`$0 - $${maxPrice}`}</p>
        </div>

        {/* Search Button */}
        <button className="nav-button" onClick={handleSearch}>
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchtrem;
