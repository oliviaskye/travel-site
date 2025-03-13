import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import headerCSS from "./Header.module.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function Header() {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [tempDate, setTempDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [maxPrice, setMaxPrice] = useState(1000);

  const datePickerRef = useRef(null);
  const navigate = useNavigate();

  // Close date picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
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

  const handleDateChange = (item) => {
    setTempDate([item.selection]);
  };

  const handleDateApply = () => {
    setDate(tempDate);
    setOpenDate(false);
  };

  return (
    <div className={`${headerCSS.HeaderWrapper} section`} id="home">
      <div className={headerCSS.Container}>
        <h1>Find Next Place To Trip</h1>
        <small>Discover New Places at Exclusive Deals</small>

        <div className={headerCSS.inputContainer}>
          <div className={headerCSS.inputWrapper}>
            <input
              type="text"
              placeholder="Enter city"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>

          <div className={headerCSS.datePickerWrapper} ref={datePickerRef}>
            <span
              onClick={() => setOpenDate(!openDate)}
              className={headerCSS.dateToggle}
            >
              {`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                date[0].endDate,
                "MM/dd/yyyy"
              )}`}
            </span>
            {openDate && (
              <div className={headerCSS.dateDropdown}>
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={tempDate}
                  className="date"
                  minDate={new Date()}
                />
                <button 
                  className={headerCSS.applyBtn} 
                  onClick={handleDateApply}
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          <div className={headerCSS.priceRangeWrapper}>
            <div className={headerCSS.priceRange}>
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              />
              <p>{`$0 - $${maxPrice}`}</p>
            </div>
          </div>

          <div className={headerCSS.searchButtonWrapper}>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;